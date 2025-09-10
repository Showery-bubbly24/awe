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

const convertToEmbedUrl = (url) => {
    try {
        const urlObj = new URL(url);
        
        if (urlObj.hostname.includes('rutube.ru')) {
            const pathParts = urlObj.pathname.split('/').filter(part => part !== '');
            const videoIndex = pathParts.indexOf('video');
            
            if (videoIndex !== -1 && videoIndex + 1 < pathParts.length) {
                const videoId = pathParts[videoIndex + 1];
                console.log(`https://rutube.ru/play/embed/${videoId}`);
                return `https://rutube.ru/play/embed/${videoId}`;
            }
        }
        
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