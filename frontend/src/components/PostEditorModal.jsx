import React, { useState } from 'react';

export default function PostEditorModal({ onClose, onCreatePost }) {
  const [title, setTitle] = useState('');
  const [postText, setPostText] = useState('');
  const [images, setImages] = useState([]);
  const [showImageInput, setShowImageInput] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const handleAddImage = () => {
    if (imageUrl.trim() && images.length < 5) {
      setImages([...images, imageUrl]);
      setImageUrl('');
      setShowImageInput(false);
    }
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleCreatePost = () => {
    if (title.trim() || postText.trim() || images.length > 0) {
      onCreatePost({
        title: title.trim(),
        text: postText.trim(),
        images: images
      });
      setTitle('');
      setPostText('');
      setImages([]);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal--large" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h3>Создание поста</h3>
          <button className="modal__close" onClick={onClose}>×</button>
        </div>
        
        <div className="post-editor">
          <div className="post-editor__content">
            <div className="form-group">
              <label htmlFor="post-title">Заголовок поста</label>
              <input
                type="text"
                id="post-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Введите заголовок"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="post-text">Текст поста</label>
              <textarea
                id="post-text"
                className="post-editor__text"
                placeholder="Что у вас нового?"
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                rows="5"
              />
            </div>
            
            {images.length > 0 && (
              <div className="post-editor__preview">
                {images.map((img, index) => (
                  <div key={index} className="post-editor__preview-item">
                    <img src={img} alt={`Изображение ${index + 1}`} />
                    <button 
                      className="post-editor__remove-image"
                      onClick={() => handleRemoveImage(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="post-editor__actions">
            <button 
              className="btn btn--small"
              onClick={() => setShowImageInput(!showImageInput)}
              disabled={images.length >= 5}
            >
              Добавить изображение ({images.length}/5)
            </button>
            
            {showImageInput && (
              <div className="post-editor__image-input">
                <input
                  type="text"
                  placeholder="Вставьте ссылку на изображение"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
                <button 
                  className="btn btn--small btn--primary"
                  onClick={handleAddImage}
                >
                  Добавить
                </button>
              </div>
            )}
            
            <div className="post-editor__submit">
              <button 
                className="btn"
                onClick={onClose}
              >
                Отмена
              </button>
              <button 
                className="btn btn--primary"
                onClick={handleCreatePost}
                disabled={!title.trim() && !postText.trim() && images.length === 0}
              >
                Опубликовать
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
