import React, { useState, useEffect } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import VideoScreen from './components/VideoScreen';
import PostsScreen from './components/PostsScreen';
import { videoAPI } from './services/api';
import './styles/main.css';

function App() {
  const [currentView, setCurrentView] = useState('welcome');
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

  // Загружаем видео при переходе на экран видео
  useEffect(() => {
    if (currentView === 'videos') {
      loadVideos();
    }
  }, [currentView]);

  const handleEnterVideos = () => {
    setCurrentView('videos');
  };

  const handleEnterPosts = () => {
    setCurrentView('posts');
  };

  const handleBackToWelcome = () => {
    setCurrentView('welcome');
    setActiveVideo(null);
  };

  return (
    <div className="app">
      {currentView === 'welcome' && (
        <WelcomeScreen 
          onEnterVideos={handleEnterVideos}
          onEnterPosts={handleEnterPosts}
        />
      )}
      
      {currentView === 'videos' && (
        <VideoScreen
          videos={videos}
          activeVideo={activeVideo}
          onVideoSelect={handleSelectVideo}
          onAddVideo={handleAddVideo}
          onDeleteVideo={handleDeleteVideo}
          onBack={handleBackToWelcome}
          loading={loading}
        />
      )}
      
      {currentView === 'posts' && (
        <PostsScreen onBack={handleBackToWelcome} />
      )}
    </div>
  );
}

export default App;
