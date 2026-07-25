import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Attach token automatically for admin requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const login = (username, password) =>
  api.post('/auth/login', { username, password });

// Projects
export const getProjects = () => api.get('/projects');
export const createProject = (data) => api.post('/projects', data);
export const updateProject = (id, data) => api.put(`/projects/${id}`, data);
export const deleteProject = (id) => api.delete(`/projects/${id}`);

// Skills
export const getSkills = () => api.get('/skills');
export const createSkill = (data) => api.post('/skills', data);
export const updateSkill = (id, data) => api.put(`/skills/${id}`, data);
export const deleteSkill = (id) => api.delete(`/skills/${id}`);

// Messages
export const sendMessage = (data) => api.post('/messages', data);
export const getMessages = () => api.get('/messages');
export const markMessageRead = (id) => api.put(`/messages/${id}/read`);
export const deleteMessage = (id) => api.delete(`/messages/${id}`);

export default api;