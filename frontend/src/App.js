import React, { useState, useEffect } from 'react';
import TabsNav from './components/TabsNav';
import VideoPlayer from './components/VideoPlayer';
import WelcomeScreen from './components/WelcomeScreen';
import { videoAPI } from './services/api';
import './App.css';

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [videos, setVideos] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  // Загрузка списка видео
  const loadVideos = async () => {
    try {
      setLoading(true);
      const response = await videoAPI.getAllVideos();
      setVideos(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке видео:', error);
    } finally {
      setLoading(false);
    }
  };

  // Загрузка информации о конкретном видео
  const loadVideoDetails = async (videoName) => {
    try {
      const response = await videoAPI.getVideo(videoName);
      if (response.data && response.data.length > 0) {
        setActiveVideo({
          ...response.data[0],
          namevid: videoName
        });
      }
    } catch (error) {
      console.error('Ошибка при загрузке информации о видео:', error);
    }
  };

  // Добавление нового видео
  const handleAddVideo = async (link) => {
    try {
      await videoAPI.addVideo(link);
      await loadVideos(); // Перезагружаем список видео
    } catch (error) {
      console.error('Ошибка при добавлении видео:', error);
      throw error;
    }
  };

  // Удаление видео
  const handleDeleteVideo = async (id) => {
    try {
      await videoAPI.deleteVideo(id);
      await loadVideos(); // Перезагружаем список видео
      setActiveVideo(null); // Сбрасываем выбранное видео
    } catch (error) {
      console.error('Ошибка при удалении видео:', error);
    }
  };

  // Выбор видео
  const handleSelectVideo = async (video) => {
    await loadVideoDetails(video.namevid);
  };

  // Загружаем видео при инициализации
  useEffect(() => {
    if (!showWelcome) {
      loadVideos();
    }
  }, [showWelcome]);

  if (showWelcome) {
    return <WelcomeScreen onEnter={() => setShowWelcome(false)} />;
  }

  return (
    <div className="app">
      <header className="app__header">
        <div className="brand">
          <span className="brand__dot" />
          <span className="brand__name">OurMirrowForYourVideo</span>
        </div>
      </header>

      <nav className="app__nav">
        <TabsNav
          tabs={videos}
          activeId={activeVideo ? activeVideo.videoid : null}
          onChange={handleSelectVideo}
          onAddVideo={handleAddVideo}
          onDeleteVideo={handleDeleteVideo}
        />
      </nav>

      <main className="app__main">
        <VideoPlayer video={activeVideo} />
      </main>
    </div>
  );
}

export default App;
