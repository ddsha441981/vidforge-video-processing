import React, { useState, useEffect } from 'react';
import './VideoGallery.css';
import { getPaginatedVideos, getPaginatedVideosByStatus } from '../services/VideoService';

const VideoCard = ({ video }) => {
  return (
    <div className="video-card">
      <div className="thumbnail-container">
      <img 
    src={video.thumbnailUrl || "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"}
    alt={video.title || "Video thumbnail"} 
    className="thumbnail"
  />



        <span className="duration">{video.duration || "0:00"}</span>
      </div>
      <div className="video-info">
        <h3 className="video-title">{video.originalFilename}</h3>
        <p className="resolution">{video.resolution}</p>
        <div className="format">
          {/* <span>{video.format} Format</span> */}
          <span>•</span>
          <span>{video.uploadTime}</span>
        </div>
        <span className="status-badge">{video.status}</span>
      </div>
    </div>
  );
};

const VideoGallery = () => {
  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("ALL");
  
  const pageSize = 10; // Exactly 2 rows of 5 videos each (5 videos per row)
  
  const statuses = ["ALL", "PENDING", "APPROVED", "REJECTED"];

  useEffect(() => {
    fetchVideos();
  }, [currentPage, statusFilter]);

  const fetchVideos = async () => {
    setLoading(true);
    setError(null);
    
    try {
      let response;
      
      if (statusFilter === "ALL") {
        response = await getPaginatedVideos(currentPage, pageSize);
      } else {
        response = await getPaginatedVideosByStatus(statusFilter, currentPage, pageSize);
      } 
      
      setVideos(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError("Failed to fetch videos. Please try again later.");
      console.error("Error fetching videos:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
    setCurrentPage(0); 
  };

  return (
    <div className="video-gallery-container">
      <div className="filter-controls">
        <h2>Video Gallery</h2>
        <div className="status-filter">
          <label htmlFor="status-select">Filter by status:</label>
          <select 
            id="status-select" 
            value={statusFilter} 
            onChange={handleStatusChange}
          >
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      {loading && <div className="loading-spinner">Loading...</div>}
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="video-grid">
        {videos.map((video, index) => (
          <VideoCard key={video.id || index} video={video} />
        ))}
      </div>
      
      {!loading && videos.length === 0 && (
        <div className="no-videos">No videos found</div>
      )}
      
      <div className="pagination">
        <button 
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0 || loading}
        >
          Previous
        </button>
        
        <div className="page-numbers">
          {[...Array(totalPages).keys()].map(number => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={currentPage === number ? "active" : ""}
              disabled={loading}
            >
              {number + 1}
            </button>
          ))}
        </div>
        
        <button 
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1 || loading}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default VideoGallery;