import axios from 'axios';

const API_BASE_URL = 'https://localhost:7262/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Добавляем интерцептор для включения токена в заголовки
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const videoAPI = {
  // Методы для видео
  getAllVideos: () => api.get('/GetName/GetVidName'),
  getVideo: (name) => api.get(`/GetControllerLink/GetLink?getVidName=${encodeURIComponent(name)}`),
  addVideo: (link) => api.post('/PostVid/PostVid', null, {
    params: { getVidLink: link }
  }),
  deleteVideo: (id) => api.delete(`/Delete/Id?GetDeleteId=${id}`),
  getYandexVideos: () => api.get('/YandexGetVidName/YandexGetVidName'),
  getYandexVideoLink: (name) => api.get(`/YandexGetLink/YandexGetLink?getYanVidName=${encodeURIComponent(name)}`),
  
  // Методы для аутентификации
  login: (credentials) => api.post('/Auth/login', credentials),
  register: (userData) => api.post('/Register/register', userData),
  
  // Новые методы для работы с постами
    getPosts: () => api.get('/GetPost/GetPost'),
  createPost: (postData) => {
    const formData = new FormData();
    formData.append('Title', postData.Title || '');
    formData.append('Textpost', postData.Textpost || '');
    formData.append('ImgUrl', postData.ImgUrl || '');
    formData.append('Authorid', postData.Authorid || 0);
    formData.append('Postdate', postData.Postdate || '');

    console.log("POST /Post/Post payload (raw):", postData);
    console.log("POST /Post/Post FormData entries:");
    for (let pair of formData.entries()) {
      console.log(pair[0] + ':', pair[1]);
    }

    return api.post('/Post/Post', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  deletePost: (id) => {
    console.log("DELETE /DeletePost/DeletePost params:", { GetDeleteId: id });
    return api.delete(`/DeletePost/DeletePost`, { params: { GetDeleteId: id } });
  }
};
