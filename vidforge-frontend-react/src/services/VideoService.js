import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1/admin';
// http://localhost:8080/api/v1/admin/videos/4743a952-7c27-472e-93f9-27faeaf1ef53

export const getPaginatedVideos = (page, size) => {
  return axios.get(`${API_BASE_URL}/paginated`, {
    params: { page, size },
  });
};

export const getPaginatedVideosByStatus = (status, page, size) => {
  return axios.get(`${API_BASE_URL}/paginated/status`, {
    params: { status, page, size },
  });  
};

export const getVideoById = (videoId) => {
  return axios.get(`${API_BASE_URL}/videos/${videoId}`);
};
