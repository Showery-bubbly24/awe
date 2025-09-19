import React, { useState } from 'react';

export default function Post({ post, currentUser, onDelete }) {
  const [expandedImage, setExpandedImage] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Проверяем, может ли текущий пользователь удалить пост
  // Только редакторы (администраторы) могут удалять посты
  const canDelete = onDelete && currentUser && currentUser.role === 'admin';

  const handleImageClick = (image, index) => {
    setExpandedImage({ image, index });
  };

  const handleCloseExpandedImage = () => {
    setExpandedImage(null);
  };

  const handleNavigateImage = (direction) => {
    if (expandedImage && post.images && post.images.length > 0) {
      const newIndex = (expandedImage.index + direction + post.images.length) % post.images.length;
      setExpandedImage({
        image: post.images[newIndex],
        index: newIndex
      });
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    onDelete(post.id);
    setShowDeleteConfirm(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <>
      <div className="post">
        <div className="post__header">
          <div className="post__author-info">
            <span className="post__author">{post.author}</span>
            <span className="post__date">{post.date}</span>
          </div>
          {canDelete && (
            <button 
              className="post__delete-btn"
              onClick={handleDeleteClick}
              title="Удалить пост"
            >
              ×
            </button>
          )}
        </div>
        {post.title && (
          <h3 className="post__title">{post.title}</h3>
        )}
        {post.text && (
          <div className="post__text">{post.text}</div>
        )}
        {post.images && post.images.length > 0 && post.images[0] !== '' && (
          <div className={`post__images post__images--count-${Math.min(post.images.length, 4)}`}>
            {post.images.slice(0, 4).map((image, index) => (
              <div 
                key={index} 
                className="post__image"
                onClick={() => handleImageClick(image, index)}
              >
                <img src={image} alt={`Изображение ${index + 1}`} />
                {post.images.length > 4 && index === 3 && (
                  <div className="post__image-more">+{post.images.length - 4}</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {expandedImage && (
        <div className="image-overlay" onClick={handleCloseExpandedImage}>
          <div className="image-expanded" onClick={(e) => e.stopPropagation()}>
            <button className="image-expanded__close" onClick={handleCloseExpandedImage}>×</button>
            {post.images && post.images.length > 1 && (
              <>
                <button 
                  className="image-expanded__nav image-expanded__nav--prev"
                  onClick={(e) => { e.stopPropagation(); handleNavigateImage(-1); }}
                >‹</button>
                <button 
                  className="image-expanded__nav image-expanded__nav--next"
                  onClick={(e) => { e.stopPropagation(); handleNavigateImage(1); }}
                >›</button>
                <div className="image-expanded__counter">
                  {expandedImage.index + 1} / {post.images.length}
                </div>
              </>
            )}
            <img src={expandedImage.image} alt="Увеличенное изображение" />
          </div>
        </div>
      )}
      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={handleCancelDelete}>
          <div className="modal modal--small" onClick={(e) => e.stopPropagation()}>
            <div className="modal__header">
              <h3>Удаление поста</h3>
              <button className="modal__close" onClick={handleCancelDelete}>×</button>
            </div>
            <div className="modal__body">
              <p>Вы уверены, что хотите удалить этот пост?</p>
            </div>
            <div className="modal__footer">
              <button className="btn" onClick={handleCancelDelete}>Отмена</button>
              <button className="btn btn--danger" onClick={handleConfirmDelete}>Удалить</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
