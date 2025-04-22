import axios from 'axios';

const API_BASE_URL = '/api/v1/videos';

export const VideoService = {
  /**
   * Upload a video file to the server
   * @param {File} file - The video file to upload
   * @param {Function} onProgressUpdate - Callback for upload progress updates
   * @returns {Promise} - Promise that resolves with the upload response
   */
  uploadVideo: async (file, onProgressUpdate) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          if (onProgressUpdate) {
            onProgressUpdate(progress);
          }
        }
      });
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { 
        status: 'error', 
        message: 'Upload failed. Please try again.' 
      };
    }
  },
  
  /**
   * Get video status by ID
   * @param {string} videoId - The ID of the video
   * @returns {Promise} - Promise that resolves with the video status
   */
  getVideoStatus: async (videoId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${videoId}/status`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { 
        status: 'error', 
        message: 'Failed to get video status' 
      };
    }
  }
};

export default VideoService;