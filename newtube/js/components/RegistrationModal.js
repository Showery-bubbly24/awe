class RegistrationModal extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.addEventListeners();
    }

    render() {
        this.innerHTML = `
            <div class="modal-overlay" id="registrationOverlay">
                <div class="modal-content">
                    <button class="modal-close">&times;</button>
                    <h2><i class="fas fa-user-plus"></i> Регистрация</h2>
                    
                    <form id="registrationForm" class="registration-form">
                        <div class="form-group">
                            <label for="username"><i class="fas fa-user"></i> Имя пользователя</label>
                            <input type="text" id="username" name="username" required placeholder="Придумайте логин">
                        </div>
                        
                        <div class="form-group">
                            <label for="email"><i class="fas fa-envelope"></i> Электронная почта</label>
                            <input type="email" id="email" name="email" required placeholder="example@mail.com">
                        </div>
                        
                        <div class="form-group">
                            <label for="password"><i class="fas fa-lock"></i> Пароль</label>
                            <input type="password" id="password" name="password" required placeholder="Не менее 6 символов">
                        </div>
                        
                        <div class="form-group">
                            <label for="confirmPassword"><i class="fas fa-lock"></i> Подтвердите пароль</label>
                            <input type="password" id="confirmPassword" name="confirmPassword" required placeholder="Повторите пароль">
                        </div>
                        
                        <button type="submit" class="btn-submit">
                            <i class="fas fa-check"></i> Зарегистрироваться
                        </button>
                        
                        <div class="login-link">
                            Уже есть аккаунт? <a href="#" class="switch-to-login">Войти</a>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }

    addEventListeners() {
        // Закрытие модального окна
        this.querySelector('.modal-close').addEventListener('click', () => this.closeModal());
        this.querySelector('.modal-overlay').addEventListener('click', (e) => {
            if (e.target.id === 'registrationOverlay') {
                this.closeModal();
            }
        });
        
        // Отправка формы
        const form = this.querySelector('#registrationForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit();
            });
        }
        
        // Переход ко входу
        const switchLink = this.querySelector('.switch-to-login');
        if (switchLink) {
            switchLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchToLogin();
            });
        }
    }

    handleFormSubmit() {
        const form = this.querySelector('#registrationForm');
        if (!form) return;
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        console.log('Данные формы регистрации:', data);
        
        // Валидация
        if (!this.validateForm(data)) {
            return;
        }
        
        console.log('Валидация пройдена, отправка данных...');
        
        // Закрываем модальное окно
        this.closeModal();
        
        // Вызываем глобальную функцию для обработки регистрации
        if (window.app && window.app.handleRegistrationSuccess) {
            window.app.handleRegistrationSuccess(data);
        } else if (window.handleRegistrationSuccess) {
            window.handleRegistrationSuccess(data);
        } else {
            console.error('Невозможно обработать регистрацию: обработчик не найден');
        }
    }
    
    validateForm(data) {
        // Проверяем имя пользователя
        if (data.username.length < 3) {
            alert('Имя пользователя должно содержать минимум 3 символа');
            return false;
        }
        
        if (!/^[a-zA-Z0-9_]+$/.test(data.username)) {
            alert('Имя пользователя может содержать только буквы, цифры и подчеркивание');
            return false;
        }
        
        // Проверяем email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Введите корректный email адрес');
            return false;
        }
        
        // Проверяем пароль
        if (data.password.length < 6) {
            alert('Пароль должен содержать минимум 6 символов');
            return false;
        }
        
        if (data.password !== data.confirmPassword) {
            alert('Пароли не совпадают');
            return false;
        }
        
        return true;
    }

    switchToLogin() {
        this.closeModal();
        
        // Открываем окно входа
        if (window.app && window.app.openLoginModal) {
            window.app.openLoginModal();
        }
    }

    closeModal() {
        this.remove();
        document.body.style.overflow = '';
    }
}

customElements.define('registration-modal', RegistrationModal);
export default RegistrationModal;