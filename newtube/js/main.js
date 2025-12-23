// Сначала импортируем компоненты
import './components/VideoTab.js';
import './components/PostsTab.js';
import './components/RegistrationModal.js';
import './components/LoginModal.js';

// Глобальный обработчик событий от модальных окон
window.handleModalEvent = function(eventName, detail) {
    console.log(`Глобальный обработчик: ${eventName}`, detail);
    
    // Ищем экземпляр приложения
    if (window.app && window.app[eventName]) {
        window.app[eventName](detail);
    } else {
        // Если приложение еще не загружено, сохраняем событие
        if (!window.pendingEvents) window.pendingEvents = [];
        window.pendingEvents.push({ eventName, detail });
    }
};

// Хранилище пользователей
let userDatabase = [];

class AppController {
    constructor() {
        this.state = {
            currentTab: 'videos',
            searchQuery: '',
            isAuthenticated: false,
            user: null
        };
        
        this.components = {};
    }
    
    init() {
        // Загружаем данные из localStorage при инициализации
        this.loadFromLocalStorage();
        this.loadComponents();
        this.setupEventListeners();
        this.setupTheme();
        this.setupSearch();
        this.setupAuth();
        this.setupTabSwitching();
        
        console.log('🎬 NeWTube инициализирован');
        console.log('Текущие пользователи в базе:', userDatabase);
        
        // Обрабатываем отложенные события
        this.processPendingEvents();
    }
    
    processPendingEvents() {
        if (window.pendingEvents && window.pendingEvents.length > 0) {
            console.log('Обработка отложенных событий:', window.pendingEvents);
            window.pendingEvents.forEach(event => {
                if (this[event.eventName]) {
                    this[event.eventName](event.detail);
                }
            });
            window.pendingEvents = [];
        }
    }
    
    loadFromLocalStorage() {
        try {
            // Загружаем данные аутентификации
            const savedAuth = localStorage.getItem('newtube_auth');
            if (savedAuth) {
                const authData = JSON.parse(savedAuth);
                console.log('Загружены данные аутентификации:', authData);
                
                if (authData.isAuthenticated && authData.user) {
                    this.state.isAuthenticated = authData.isAuthenticated;
                    this.state.user = authData.user;
                }
            }
            
            // Загружаем пользователей
            const savedUsers = localStorage.getItem('newtube_users');
            if (savedUsers) {
                const users = JSON.parse(savedUsers);
                userDatabase = users;
                console.log(`Загружено ${userDatabase.length} пользователей из localStorage`);
            }
        } catch (error) {
            console.error('Ошибка загрузки из localStorage:', error);
        }
    }
    
    saveToLocalStorage() {
        try {
            // Сохраняем данные аутентификации
            const authData = {
                isAuthenticated: this.state.isAuthenticated,
                user: this.state.user
            };
            localStorage.setItem('newtube_auth', JSON.stringify(authData));
            
            // Сохраняем пользователей
            localStorage.setItem('newtube_users', JSON.stringify(userDatabase));
            
            console.log('Данные сохранены в localStorage');
        } catch (error) {
            console.error('Ошибка сохранения в localStorage:', error);
        }
    }
    
    // Проверка существования пользователя
    userExists(username, email) {
        return userDatabase.some(user => 
            user.username === username || user.email === email
        );
    }
    
    // Поиск пользователя для входа
    findUser(login, password) {
        const foundUser = userDatabase.find(user => {
            const usernameMatch = user.username === login;
            const emailMatch = user.email === login;
            const passwordMatch = user.password === password;
            
            return (usernameMatch || emailMatch) && passwordMatch;
        });
        
        return foundUser;
    }
    
    // Регистрация нового пользователя
    registerUser(userData) {
        console.log('Начало регистрации:', userData);
        
        // Проверяем, нет ли уже такого пользователя
        if (this.userExists(userData.username, userData.email)) {
            console.log('Пользователь уже существует');
            return { success: false, message: 'Пользователь уже существует' };
        }
        
        // Проверяем валидность email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userData.email)) {
            console.log('Неверный формат email');
            return { success: false, message: 'Неверный формат email' };
        }
        
        // Проверяем длину пароля
        if (userData.password.length < 6) {
            console.log('Пароль слишком короткий');
            return { success: false, message: 'Пароль должен содержать минимум 6 символов' };
        }
        
        // Добавляем пользователя в базу
        const newUser = {
            username: userData.username,
            email: userData.email,
            password: userData.password,
            id: Date.now().toString(),
            createdAt: new Date().toISOString()
        };
        
        userDatabase.push(newUser);
        console.log('Пользователь добавлен в базу:', newUser);
        console.log('Теперь в базе пользователей:', userDatabase);
        
        this.saveToLocalStorage();
        
        return { 
            success: true, 
            user: {
                username: newUser.username,
                email: newUser.email,
                id: newUser.id
            }
        };
    }
    
    // Вход пользователя
    loginUser(login, password) {
        console.log('Попытка входа:', { login, password });
        
        const user = this.findUser(login, password);
        
        if (!user) {
            console.log('Пользователь не найден');
            return { 
                success: false, 
                message: 'Неверный логин/email или пароль' 
            };
        }
        
        console.log('Пользователь найден:', user);
        return { 
            success: true, 
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        };
    }
    
    loadComponents() {
        const container = document.getElementById('tab-container');
        container.innerHTML = '';
        
        const videoTab = document.createElement('video-tab');
        const postsTab = document.createElement('posts-tab');
        
        container.appendChild(videoTab);
        container.appendChild(postsTab);
        
        this.components.videoTab = videoTab;
        this.components.postsTab = postsTab;
        
        this.showActiveTab();
    }
    
    setupEventListeners() {
        const homeLink = document.getElementById('home-link');
        if (homeLink) {
            homeLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchTab('videos');
            });
        }
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
        
        // Глобальные обработчики для модальных окон
        window.handleRegistrationSuccess = (userData) => {
            console.log('Глобальный обработчик: handleRegistrationSuccess', userData);
            this.handleRegistrationSuccess(userData);
        };
        
        window.handleLoginSuccess = (userData) => {
            console.log('Глобальный обработчик: handleLoginSuccess', userData);
            this.handleLoginSuccess(userData);
        };
    }
    
    setupTheme() {
        this.updateTheme(this.state.currentTab);
    }
    
    setupSearch() {
        const searchInput = document.querySelector('.search-input');
        const searchBtn = document.querySelector('.search-btn');
        
        if (!searchInput || !searchBtn) return;
        
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performSearch();
            }
        });
        
        searchBtn.addEventListener('click', () => this.performSearch());
        
        searchInput.addEventListener('input', (e) => {
            this.state.searchQuery = e.target.value.trim();
        });
    }
    
    setupAuth() {
        // Сначала обновляем UI
        this.updateAuthUI();
    }
    
    setupTabSwitching() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const tab = button.dataset.tab;
                this.switchTab(tab);
            });
        });
    }
    
    switchTab(tabName) {
        if (this.state.currentTab === tabName) return;
        
        this.state.currentTab = tabName;
        this.updateTheme(tabName);
        this.updateTabButtons(tabName);
        this.showActiveTab();
    }
    
    updateTheme(tabName) {
        const isPostsTheme = tabName === 'posts';
        document.body.classList.toggle('posts-theme', isPostsTheme);
    }
    
    updateTabButtons(tabName) {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabName);
        });
    }
    
    showActiveTab() {
        document.querySelectorAll('video-tab, posts-tab').forEach(tab => {
            tab.style.display = 'none';
        });
        
        if (this.state.currentTab === 'videos' && this.components.videoTab) {
            this.components.videoTab.style.display = 'block';
        } else if (this.state.currentTab === 'posts' && this.components.postsTab) {
            this.components.postsTab.style.display = 'block';
        }
    }
    
    performSearch() {
        const searchInput = document.querySelector('.search-input');
        if (!searchInput) return;
        
        const query = searchInput.value.trim();
        
        if (!query) {
            this.showNotification('Введите поисковый запрос');
            return;
        }
        
        this.state.searchQuery = query;
        this.showNotification(`Поиск по запросу: "${query}"`);
        console.log(`Поиск: "${query}" на вкладке ${this.state.currentTab}`);
        searchInput.value = '';
    }
    
    openLoginModal() {
        if (document.querySelector('#loginModal')) return;
        
        const modal = document.createElement('login-modal');
        modal.id = 'loginModal';
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
    }
    
    openRegistrationModal() {
        if (document.querySelector('#registrationModal')) return;
        
        const modal = document.createElement('registration-modal');
        modal.id = 'registrationModal';
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
    }
    
    closeAllModals() {
        const loginModal = document.querySelector('#loginModal');
        const registrationModal = document.querySelector('#registrationModal');
        
        if (loginModal) loginModal.remove();
        if (registrationModal) registrationModal.remove();
        
        document.body.style.overflow = '';
    }
    
    // Эти методы теперь вызываются напрямую из модальных окон
    handleRegistrationSuccess(userData) {
        console.log('AppController: handleRegistrationSuccess', userData);
        const result = this.registerUser(userData);
        
        if (!result.success) {
            this.showNotification(result.message);
            return;
        }
        
        console.log('Регистрация успешна:', result.user);
        this.state.isAuthenticated = true;
        this.state.user = result.user;
        this.saveToLocalStorage();
        this.showNotification(`Аккаунт ${result.user.username} создан!`);
        this.updateAuthUI();
    }
    
    handleLoginSuccess(userData) {
        console.log('AppController: handleLoginSuccess', userData);
        const result = this.loginUser(userData.username, userData.password);
        
        if (!result.success) {
            this.showNotification(result.message);
            return;
        }
        
        console.log('Вход успешен:', result.user);
        this.state.isAuthenticated = true;
        this.state.user = result.user;
        this.saveToLocalStorage();
        this.showNotification(`Добро пожаловать, ${result.user.username}!`);
        this.updateAuthUI();
    }
    
    updateAuthUI() {
        const authButtons = document.querySelector('.auth-buttons');
        if (!authButtons) return;
        
        console.log('Обновление UI авторизации:', { 
            isAuthenticated: this.state.isAuthenticated, 
            user: this.state.user 
        });
        
        if (this.state.isAuthenticated && this.state.user) {
            // Если пользователь авторизован, показываем кнопку "Создать" и аватар
            authButtons.innerHTML = `
                <div class="user-menu">
                    <button class="create-btn" id="create-btn">
                        <i class="fas fa-plus"></i> Создать
                    </button>
                    <button class="user-avatar" title="${this.state.user.username}">
                        ${this.state.user.username.charAt(0).toUpperCase()}
                    </button>
                </div>
            `;
            
            // Добавляем обработчики для новых кнопок
            const createBtn = authButtons.querySelector('#create-btn');
            if (createBtn) {
                createBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.handleCreateClick();
                });
            }
            
            const userAvatar = authButtons.querySelector('.user-avatar');
            if (userAvatar) {
                userAvatar.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.showUserMenu();
                });
            }
        } else {
            // Если пользователь не авторизован, показываем стандартные кнопки
            authButtons.innerHTML = `
                <button class="auth-btn login-btn">
                    <i class="fas fa-sign-in-alt"></i>
                    <span class="btn-text">Войти</span>
                </button>
                <button class="auth-btn register-btn">
                    <i class="fas fa-user-plus"></i>
                    <span class="btn-text">Регистрация</span>
                </button>
            `;
            
            // Переназначаем обработчики для кнопок входа и регистрации
            const loginBtn = authButtons.querySelector('.login-btn');
            const registerBtn = authButtons.querySelector('.register-btn');
            
            if (loginBtn) {
                loginBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.openLoginModal();
                });
            }
            
            if (registerBtn) {
                registerBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.openRegistrationModal();
                });
            }
        }
    }
    
    // Обработчик кнопки "Создать"
    handleCreateClick() {
        if (this.state.currentTab === 'videos') {
            this.showNotification('Создание видео (функционал в разработке)');
        } else if (this.state.currentTab === 'posts') {
            this.showNotification('Создание поста (функционал в разработке)');
        }
    }
    
    showUserMenu() {
        // Удаляем существующее меню, если есть
        const existingMenu = document.querySelector('.user-dropdown');
        if (existingMenu) {
            existingMenu.remove();
            return;
        }
        
        const menu = document.createElement('div');
        menu.className = 'user-dropdown';
        menu.innerHTML = `
            <div class="dropdown-content">
                <div class="user-info">
                    <div class="user-avatar-large">${this.state.user.username.charAt(0).toUpperCase()}</div>
                    <div class="user-details">
                        <strong>${this.state.user.username}</strong>
                        <small>${this.state.user.email || ''}</small>
                    </div>
                </div>
                <div class="dropdown-divider"></div>
                <button class="dropdown-item logout-btn"><i class="fas fa-sign-out-alt"></i> Выйти</button>
            </div>
        `;
        
        const authButtons = document.querySelector('.auth-buttons');
        const rect = authButtons.getBoundingClientRect();
        menu.style.position = 'fixed';
        menu.style.top = `${rect.bottom + 5}px`;
        menu.style.right = `${window.innerWidth - rect.right}px`;
        menu.style.zIndex = '1000';
        
        document.body.appendChild(menu);
        
        // Обработчик выхода
        menu.querySelector('.logout-btn').addEventListener('click', () => {
            this.handleLogout();
            menu.remove();
        });
        
        // Закрытие меню при клике вне его
        const closeMenu = (e) => {
            if (!menu.contains(e.target) && !authButtons.contains(e.target)) {
                menu.remove();
                document.removeEventListener('click', closeMenu);
            }
        };
        
        setTimeout(() => {
            document.addEventListener('click', closeMenu);
        }, 0);
    }
    
    handleLogout() {
        this.state.isAuthenticated = false;
        this.state.user = null;
        this.saveToLocalStorage();
        this.updateAuthUI();
        this.showNotification('Вы вышли из системы');
    }
    
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-text">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    const app = new AppController();
    app.init();
    
    // Делаем глобально доступными для отладки
    window.app = app;
    window.userDatabase = userDatabase;
    window.switchTab = (tab) => app.switchTab(tab);
    
    console.log('🎬 NeWTube готов к работе!');
    console.log('Для отладки доступно:');
    console.log('- window.app - экземпляр AppController');
    console.log('- window.userDatabase - база пользователей');
    console.log('- window.switchTab(tab) - переключение вкладок');
});