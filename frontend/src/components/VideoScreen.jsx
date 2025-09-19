import React from 'react';
import TabsNav from './TabsNav';
import VideoPlayer from './VideoPlayer';

export default function VideoScreen({
  videos,
  activeVideo,
  onVideoSelect,
  onAddVideo,
  onDeleteVideo,
  onBack,
  loading,
  videoType,
  onSwitchSource,
  user
}) {
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
        <div className="video-source-switcher">
          <button 
            className={`btn btn--small ${videoType === 'rutube' ? 'btn--primary' : ''}`}
            onClick={() => onSwitchSource('rutube')}
          >
            Rutube
          </button>
          <button 
            className={`btn btn--small ${videoType === 'yandex' ? 'btn--primary' : ''}`}
            onClick={() => onSwitchSource('yandex')}
          >
            Яндекс.Диск
          </button>
        </div>
      </header>

      <nav className="app__nav">
        <TabsNav
          tabs={videos}
          activeId={activeVideo ? activeVideo.videoid : null}
          onChange={(video) => onVideoSelect(video, videoType)}
          onAddVideo={onAddVideo}
          onDeleteVideo={onDeleteVideo}
          loading={loading}
          videoType={videoType}
          user={user}
        />
      </nav>

      <main className="app__main">
        <VideoPlayer video={activeVideo} videoType={videoType} />
      </main>
    </div>
  );
}
