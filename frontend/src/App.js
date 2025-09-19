import React, { useState, useEffect } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import VideoScreen from './components/VideoScreen';
import PostsScreen from './components/PostsScreen';
import { videoAPI } from './services/api';
import './styles/main.css';

function App() {
  const [currentView, setCurrentView] = useState('welcome');
  const [videos, setVideos] = useState([]);
  const [yandexVideos, setYandexVideos] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [videoType, setVideoType] = useState('rutube');
  const [user, setUser] = useState(null);

  // Проверяем авторизацию при загрузке приложения
  useEffect(() => {
    const userData = localStorage.getItem('userData');
    
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Загрузка списка видео с Rutube
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

  // Загрузка списка видео с Яндекс.Диска
  const loadYandexVideos = async () => {
    try {
      setLoading(true);
      const response = await videoAPI.getYandexVideos();
      setYandexVideos(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке видео с Яндекс.Диска:', error);
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

  // Загрузка ссылки на видео с Яндекс.Диска
  const loadYandexVideoLink = async (videoName) => {
    try {
      const response = await videoAPI.getYandexVideoLink(videoName);
      return response.data;
    } catch (error) {
      console.error('Ошибка при загрузке ссылки на видео с Яндекс.Диска:', error);
      throw error;
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
  const handleSelectVideo = async (video, type) => {
    setVideoType(type);
    
    if (type === 'rutube') {
      await loadVideoDetails(video.namevid);
    } else if (type === 'yandex') {
      try {
        const link = await loadYandexVideoLink(video);
        setActiveVideo({
          videoid: video,
          namevid: video,
          linkvid: link,
          type: 'yandex'
        });
      } catch (error) {
        console.error('Ошибка при загрузке видео с Яндекс.Диска:', error);
      }
    }
  };

  // Обработка входа
  const handleLogin = async (credentials) => {
    try {
      const response = await videoAPI.login(credentials);
      
      if (response.data.success) {
        // Сохраняем токен и данные пользователя
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('userData', JSON.stringify({
          userId: response.data.userId,
          username: response.data.login,
          role: response.data.role === 2 ? 'admin' : 'user'
        }));
        
        setUser({
          userId: response.data.userId,
          username: response.data.login,
          role: response.data.role === 2 ? 'admin' : 'user'
        });
        
        return { success: true };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      console.error('Ошибка при входе:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Ошибка при входе' 
      };
    }
  };

  // Обработка регистрации
  const handleRegister = async (userData) => {
    try {
      const response = await videoAPI.register(userData);
      
      if (response.data.success) {
        return { success: true, message: response.data.message };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Ошибка при регистрации' 
      };
    }
  };

  // Выход из системы
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
  };

  // Загружаем видео при переходе на экран видео
  useEffect(() => {
    if (currentView === 'videos') {
      if (videoType === 'rutube') {
        loadVideos();
      } else {
        loadYandexVideos();
      }
    }
  }, [currentView, videoType]);

  const handleEnterVideos = () => {
    setCurrentView('videos');
    setVideoType('rutube');
  };

  const handleEnterPosts = () => {
    setCurrentView('posts');
  };

  const handleBackToWelcome = () => {
    setCurrentView('welcome');
    setActiveVideo(null);
  };

  // Переключение между Rutube и Яндекс.Диском
  const switchVideoSource = (source) => {
    setVideoType(source);
    setActiveVideo(null);
    if (source === 'rutube') {
      loadVideos();
    } else {
      loadYandexVideos();
    }
  };

  return (
    <div className="app">
      {currentView === 'welcome' && (
        <WelcomeScreen 
          onEnterVideos={handleEnterVideos}
          onEnterPosts={handleEnterPosts}
          onLogin={handleLogin}
          onRegister={handleRegister}
          onLogout={handleLogout}
          user={user}
        />
      )}
      
      {currentView === 'videos' && (
        <VideoScreen
          videos={videoType === 'rutube' ? videos : yandexVideos}
          activeVideo={activeVideo}
          onVideoSelect={handleSelectVideo}
          onAddVideo={handleAddVideo}
          onDeleteVideo={handleDeleteVideo}
          onBack={handleBackToWelcome}
          loading={loading}
          videoType={videoType}
          onSwitchSource={switchVideoSource}
          user={user}
        />
      )}
      
      {currentView === 'posts' && (
        <PostsScreen onBack={handleBackToWelcome} user={user} />
      )}
    </div>
  );
}

export default App;
