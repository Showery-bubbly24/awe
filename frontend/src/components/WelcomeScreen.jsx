// src/components/WelcomeScreen.jsx
import React from 'react';

export default function WelcomeScreen({ onEnter }) {
  return (
    <div className="welcome">
      <div className="welcome__content">
        <h1 className="welcome__title">Добро пожаловать</h1>
        <p className="welcome__subtitle">
          Простой сайт для простых вещей. Тыкай и смотри свои видосы
        </p>
        <button className="btn btn--primary" onClick={onEnter}>
          Перейти к видео
        </button>
      </div>
      <div className="welcome__footer">
        <span>Прототип интерфейса</span>
      </div>
    </div>
  );
}