import React, { useState } from 'react';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

export default function WelcomeScreen({ onEnterVideos, onEnterPosts }) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  return (
    <div className="welcome">
      <header className="welcome__header">
        <div className="brand">
          <span className="brand__dot"></span>
          <span className="brand__name">OurMirrowForYourVideo</span>
        </div>
        <div className="welcome__auth-buttons">
          <button 
            className="btn btn--small" 
            onClick={() => setShowLoginModal(true)}
          >
            Войти
          </button>
          <button 
            className="btn btn--small btn--primary" 
            onClick={() => setShowRegisterModal(true)}
          >
            Регистрация
          </button>
        </div>
      </header>

      <div className="welcome__content">
        <h1 className="welcome__title">Добро пожаловать</h1>
        <p className="welcome__subtitle">
          Простой сайт для простых вещей. Тыкай и смотри свои видосы или посты
        </p>
        
        <div className="welcome__actions">
          <button className="btn" onClick={onEnterPosts}>
            Читать посты
          </button>
          <button className="btn btn--primary" onClick={onEnterVideos}>
            Смотреть видео
          </button>
        </div>
      </div>

      <div className="welcome__footer">
        <span>Прототип интерфейса</span>
      </div>

      {/* Модальные окна */}
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
      
      {showRegisterModal && (
        <RegisterModal onClose={() => setShowRegisterModal(false)} />
      )}
    </div>
  );
}
