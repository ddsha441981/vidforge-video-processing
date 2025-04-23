// MockService.js
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Sample video data
const generateMockVideos = (count, status = null) => {
  const statuses = ['PENDING', 'APPROVED', 'REJECTED'];
  const channels = ['Tech Channel', 'Music Videos', 'Travel Vlogs', 'Cooking Tutorials', 'Gaming Zone'];
  
  return Array(count).fill().map((_, index) => ({
    id: `video-${index}`,
    title: `Video Title ${index + 1} - This is a slightly longer title to test truncation`,
    channelName: channels[Math.floor(Math.random() * channels.length)],
    thumbnailUrl: `/api/placeholder/320/180`,
    views: `${Math.floor(Math.random() * 1000)}K`,
    uploadDate: `${Math.floor(Math.random() * 11) + 1} months ago`,
    duration: `${Math.floor(Math.random() * 10) + 1}:${Math.floor(Math.random() * 59).toString().padStart(2, '0')}`,
    status: status || statuses[Math.floor(Math.random() * statuses.length)]
  }));
};

// Create a mock for axios
const setupMockApi = () => {
  const mock = new MockAdapter(axios);
  
  // Mock the paginated endpoint
  mock.onGet(/\/api\/admin\/paginated(?!\/)/).reply((config) => {
    const params = new URLSearchParams(config.url.split('?')[1]);
    const page = parseInt(params.get('page')) || 0;
    const size = parseInt(params.get('size')) || 10;
    
    const allVideos = generateMockVideos(50); // Total of 50 mock videos
    const paginatedVideos = allVideos.slice(page * size, (page + 1) * size);
    
    return [200, {
      content: paginatedVideos,
      pageable: {
        pageNumber: page,
        pageSize: size
      },
      totalElements: allVideos.length,
      totalPages: Math.ceil(allVideos.length / size),
      last: (page + 1) * size >= allVideos.length,
      first: page === 0,
      numberOfElements: paginatedVideos.length
    }];
  });
  
  // Mock the paginated by status endpoint
  mock.onGet(/\/api\/admin\/paginated\/status/).reply((config) => {
    const params = new URLSearchParams(config.url.split('?')[1]);
    const status = params.get('status');
    const page = parseInt(params.get('page')) || 0;
    const size = parseInt(params.get('size')) || 10;
    
    const statusVideos = generateMockVideos(20, status); // 20 videos per status
    const paginatedVideos = statusVideos.slice(page * size, (page + 1) * size);
    
    return [200, {
      content: paginatedVideos,
      pageable: {
        pageNumber: page,
        pageSize: size
      },
      totalElements: statusVideos.length,
      totalPages: Math.ceil(statusVideos.length / size),
      last: (page + 1) * size >= statusVideos.length,
      first: page === 0,
      numberOfElements: paginatedVideos.length
    }];
  });
  
  return mock;
};

export default setupMockApi;