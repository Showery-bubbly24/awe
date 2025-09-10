import React, { useState } from 'react';

export default function RegisterModal({ onClose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('reader');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Данные регистрации:', { username, password, role });
    // Здесь будет логика регистрации
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h3>Регистрация</h3>
          <button className="modal__close" onClick={onClose}>×</button>
        </div>
        <form className="modal__form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="reg-username">Имя пользователя</label>
            <input
              type="text"
              id="reg-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="reg-password">Пароль</label>
            <input
              type="password"
              id="reg-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Уровень доступа</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="reader">Читатель</option>
              <option value="author">Автор</option>
            </select>
          </div>
          <button type="submit" className="btn btn--primary">
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  );
}