import axios from 'axios';

const API_BASE_URL = 'https://localhost:7262/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const videoAPI = {
  getAllVideos: () => api.get('/GetName/GetVidName'),
  getVideo: (name) => api.get(`/GetControllerLink/GetVid?getVidName=${encodeURIComponent(name)}`),
  addVideo: (link) => api.post('/PostVid/PostVid', null, {
    params: { getVidLink: link }
  }),
  deleteVideo: (id) => api.delete(`/Delete/Id?GetDeleteId=${id}`)
};