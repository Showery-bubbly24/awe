import React from 'react';

export default function VideoPlayer({ video }) {
  if (!video) {
    return (
      <div className="player player--empty">
        <div className="player__frame player__frame--empty">
          <div className="player__placeholder">
            <div className="player__placeholder-inner">
              Выберите вкладку выше, чтобы начать просмотр
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Функция для преобразования обычной ссылки в embed-ссылку для Rutube
const convertToEmbedUrl = (url) => {
    try {
        const urlObj = new URL(url);
        
        // Проверяем, что это rutube.ru
        if (urlObj.hostname.includes('rutube.ru')) {
            // Разбиваем путь на части и фильтруем пустые элементы
            const pathParts = urlObj.pathname.split('/').filter(part => part !== '');
            
            // Ищем позицию "video" в пути
            const videoIndex = pathParts.indexOf('video');
            
            // Если нашли "video" и после него есть ещё элементы
            if (videoIndex !== -1 && videoIndex + 1 < pathParts.length) {
                // Берем следующий элемент после "video" - это ID видео
                const videoId = pathParts[videoIndex + 1];
                console.log(`https://rutube.ru/play/embed/${videoId}`);
                return `https://rutube.ru/play/embed/${videoId}`;
            }
        }
        
        // Если не удалось извлечь ID, возвращаем исходную ссылку
        return url;
    } catch (e) {
        console.error("Ошибка при преобразовании ссылки:", e);
        return url;
    }
};

  const embedUrl = convertToEmbedUrl(video.linkvid);

  return (
    <div className="player">
      <div className="player__frame">
        <iframe
          key={embedUrl}
          className="player__iframe"
          src={embedUrl}
          title={video.namevid || 'Встроенное видео'}
          loading="lazy"
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      <div className="player__meta">
        <h2 className="player__title">{video.namevid}</h2>
        {video.description ? (
          <p className="player__desc">{video.description}</p>
        ) : null}
      </div>
    </div>
  );
}