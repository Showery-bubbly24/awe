import React, { useState } from 'react';

export default function RegisterModal({ onClose, onRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('reader');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    // Преобразуем роль в формат, понятный бэкенду
    const roleId = role === 'author' ? 2 : 1;
    
    const result = await onRegister({ 
      username, 
      password, 
      typeUserId: roleId 
    });
    
    if (result.success) {
      setSuccess(result.message || 'Регистрация прошла успешно');
      setTimeout(() => {
        onClose();
      }, 2000);
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h3>Регистрация</h3>
          <button className="modal__close" onClick={onClose}>×</button>
        </div>
        <form className="modal__form" onSubmit={handleSubmit}>
          {error && <div className="form-error">{error}</div>}
          {success && <div className="form-success">{success}</div>}
          <div className="form-group">
            <label htmlFor="reg-username">Имя пользователя</label>
            <input
              type="text"
              id="reg-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
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
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Уровень доступа</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              disabled={loading}
            >
              <option value="reader">Пользователь</option>
              <option value="author">Редактор</option>
            </select>
          </div>
          <button 
            type="submit" 
            className="btn btn--primary"
            disabled={loading}
          >
            {loading ? 'Регистрация...' : 'Зарегистрироваться'}
          </button>
        </form>
      </div>
    </div>
  );
}
