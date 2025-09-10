import React from 'react';

export default function PostsScreen({ onBack }) {
  return (
    <div className="app">
      <header className="app__header">
        <button className="btn btn--small" onClick={onBack}>
          На главную
        </button>
        <div className="brand">
          <span className="brand__dot"></span>
          <span className="brand__name">OurMirrowForYourVideo</span>
        </div>
        <div></div>
      </header>

      <div className="app__main">
        <div className="posts-container">
          <h2>Чтение постов</h2>
          <p>Здесь будут отображаться посты</p>
          {/* В будущем здесь будет реализован функционал постов */}
        </div>
      </div>
    </div>
  );
}