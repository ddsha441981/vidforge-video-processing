import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1/admin';

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
