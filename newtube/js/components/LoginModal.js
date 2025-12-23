class LoginModal extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.addEventListeners();
    }

    render() {
        this.innerHTML = `
            <div class="modal-overlay" id="loginOverlay">
                <div class="modal-content">
                    <button class="modal-close">&times;</button>
                    <h2><i class="fas fa-sign-in-alt"></i> Вход</h2>
                    
                    <form id="loginForm" class="login-form">
                        <div class="form-group">
                            <label for="login-username"><i class="fas fa-user"></i> Имя пользователя или Email</label>
                            <input type="text" id="login-username" name="username" required placeholder="Введите логин или email">
                        </div>
                        
                        <div class="form-group">
                            <label for="login-password"><i class="fas fa-lock"></i> Пароль</label>
                            <input type="password" id="login-password" name="password" required placeholder="Введите пароль">
                        </div>
                        
                        <button type="submit" class="btn-submit login-submit">
                            <i class="fas fa-sign-in-alt"></i> Войти
                        </button>
                        
                        <div class="register-link">
                            Нет аккаунта? <a href="#" class="switch-to-register">Зарегистрироваться</a>
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
            if (e.target.id === 'loginOverlay') {
                this.closeModal();
            }
        });
        
        // Отправка формы входа
        const form = this.querySelector('#loginForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLoginSubmit();
            });
        }
        
        // Переход к регистрации
        const switchLink = this.querySelector('.switch-to-register');
        if (switchLink) {
            switchLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchToRegistration();
            });
        }
    }

    handleLoginSubmit() {
        const form = this.querySelector('#loginForm');
        if (!form) return;
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        console.log('Данные формы входа:', data);
        
        // Базовая валидация
        if (!data.username || !data.password) {
            alert('Заполните все поля');
            return;
        }
        
        // Закрываем модальное окно
        this.closeModal();
        
        // Вызываем глобальную функцию для обработки входа
        if (window.app && window.app.handleLoginSuccess) {
            window.app.handleLoginSuccess(data);
        } else if (window.handleLoginSuccess) {
            window.handleLoginSuccess(data);
        } else {
            console.error('Невозможно обработать вход: обработчик не найден');
        }
    }

    switchToRegistration() {
        this.closeModal();
        
        // Открываем окно регистрации
        if (window.app && window.app.openRegistrationModal) {
            window.app.openRegistrationModal();
        }
    }

    closeModal() {
        this.remove();
        document.body.style.overflow = '';
    }
}

customElements.define('login-modal', LoginModal);
export default LoginModal;