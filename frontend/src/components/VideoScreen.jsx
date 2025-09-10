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
  loading
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
        <div></div>
      </header>

      <nav className="app__nav">
        <TabsNav
          tabs={videos}
          activeId={activeVideo ? activeVideo.videoid : null}
          onChange={onVideoSelect}
          onAddVideo={onAddVideo}
          onDeleteVideo={onDeleteVideo}
          loading={loading}
        />
      </nav>

      <main className="app__main">
        <VideoPlayer video={activeVideo} />
      </main>
    </div>
  );
}