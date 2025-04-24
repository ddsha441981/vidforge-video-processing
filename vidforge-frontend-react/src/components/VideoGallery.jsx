import React, { useState, useEffect } from 'react';
import './VideoGallery.css';
import { getPaginatedVideos, getPaginatedVideosByStatus } from '../services/VideoService';
import { useNavigate } from 'react-router-dom';
import { FILTER_BY_STATUS, VIDEO_LIBRARY } from '../shared/Constant';

const VideoCard = ({ video, onClick }) => {
  return (
    <div className="video-card" onClick={() => onClick(video)}>
      <div className="thumbnail-container">
        <img 
          src={video.thumbnailUrl || "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"}
          alt={video.title || "Video thumbnail"} 
          className="thumbnail"
        />
        <div className="video-overlay">
          <div className="play-button">
            <svg viewBox="0 0 24 24" fill="white" width="48" height="48">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        <span className="resolution">{video.resolution}</span>
        <span className="duration">{video.formattedDuration || "0:00"}</span>
      </div>
      <div className="video-info">
        <h3 className="video-title">{video.originalFilename}</h3>
        <div className="video-meta">
          <span className="upload-date"><p><strong>Upload:</strong></p> {video.formattedUploadTime}</span>
          <span className="upload-date"><p><strong>Processed:</strong></p> {video.formattedProcessedTime}</span>
          {/* <StatusBadge status={video.status} /> */}
        </div>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const getStatusClass = () => {
    switch(status) {
      case 'APPROVED': return 'status-approved';
      case 'REJECTED': return 'status-rejected';
      case 'PENDING': return 'status-pending';
      default: return '';
    }
  };
  
  return (
    <span className={`status-badge ${getStatusClass()}`}>
      {status}
    </span>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange, loading }) => {
  // Calculate which page numbers to show (show up to 5 pages)
  const getPageNumbers = () => {
    const pageNumbers = [];
    const totalPagesToShow = Math.min(5, totalPages);
    
    let startPage = Math.max(0, currentPage - Math.floor(totalPagesToShow / 2));
    let endPage = Math.min(totalPages - 1, startPage + totalPagesToShow - 1);
    
    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < totalPagesToShow) {
      startPage = Math.max(0, endPage - totalPagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    return pageNumbers;
  };
  
  return (
    <div className="pagination">
      <button 
        className="pagination-button"
        onClick={() => onPageChange(0)}
        disabled={currentPage === 0 || loading}
        aria-label="First page"
      >
        <span className="pagination-icon">«</span>
      </button>
      
      <button 
        className="pagination-button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0 || loading}
        aria-label="Previous page"
      >
        <span className="pagination-icon">‹</span>
      </button>
      
      <div className="page-numbers">
        {getPageNumbers().map(number => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`pagination-number ${currentPage === number ? "active" : ""}`}
            disabled={loading}
            aria-label={`Page ${number + 1}`}
            aria-current={currentPage === number ? "page" : undefined}
          >
            {number + 1}
          </button>
        ))}
      </div>
      
      <button 
        className="pagination-button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1 || loading}
        aria-label="Next page"
      >
        <span className="pagination-icon">›</span>
      </button>
      
      <button 
        className="pagination-button"
        onClick={() => onPageChange(totalPages - 1)}
        disabled={currentPage === totalPages - 1 || loading}
        aria-label="Last page"
      >
        <span className="pagination-icon">»</span>
      </button>
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
  const [selectedVideo, setSelectedVideo] = useState(null);
  const navigate = useNavigate();

  
  const pageSize = 10; // 10 videos per page
  
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
    // Scroll to top of gallery when page changes
    document.querySelector('.video-gallery-container')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
    setCurrentPage(0); 
  };
  

  const handleVideoClick = (video) => {
    navigate(`/videos/${video.videoId}`);
  };
  
  
  const closeModal = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="video-gallery-container">
      <div className="gallery-header">
        <h2 className="gallery-title">{VIDEO_LIBRARY}</h2>
        <div className="filter-controls">
          <div className="status-filter">
            <label htmlFor="status-select">{FILTER_BY_STATUS}</label>
            <select 
              id="status-select" 
              value={statusFilter} 
              onChange={handleStatusChange}
              className="status-select"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading && (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading videos...</p>
        </div>
      )}
      
      {error && (
        <div className="error-message">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
          <p>{error}</p>
        </div>
      )}
      
      {!loading && videos.length === 0 && !error && (
        <div className="no-videos">
          <svg viewBox="0 0 24 24" width="48" height="48">
            <path fill="currentColor" d="M12 5c1.66 0 3 1.34 3 3 0 1.31-1.16 2.43-2.47 2.87v.03C14.08 11.29 16 13.12 16 15.5c0 1.93-1.57 3.5-3.5 3.5H8.5C6.57 19 5 17.43 5 15.5c0-2.38 1.92-4.21 4.47-4.6v-.03C8.16 10.43 7 9.31 7 8c0-1.66 1.34-3 3-3m0-2C9.24 3 7 5.24 7 8c0 1.29.58 2.44 1.5 3.21v.29c-2.5.89-4.5 3.27-4.5 6c0 3.31 2.69 6 6 6h4c3.31 0 6-2.69 6-6c0-2.73-2-5.11-4.5-6v-.29C16.42 10.44 17 9.29 17 8c0-2.76-2.24-5-5-5z"/>
          </svg>
          <p>No videos found matching your filter criteria</p>
          {statusFilter !== "ALL" && (
            <button className="reset-filter" onClick={() => setStatusFilter("ALL")}>
              Show all videos
            </button>
          )}
        </div>
      )}
      
      <div className={`video-grid ${loading ? 'loading' : ''}`}>
        {videos.map((video, index) => (
          <VideoCard 
            key={video.videoId || index} 
            video={video} 
            onClick={handleVideoClick}
          />

        ))}
      </div>
      
      {totalPages > 1 && (
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          loading={loading}
        />
      )}
      
      {selectedVideo && (
        <div className="video-modal-overlay" onClick={closeModal}>
          <div className="video-modal" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={closeModal}>×</button>
            <div className="modal-content">
              <div className="video-player">
                <img 
                  src={selectedVideo.thumbnailUrl || "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"}
                  alt={selectedVideo.title || "Video thumbnail"} 
                  className="modal-thumbnail"
                />
                <div className="play-button-large">
                  <svg viewBox="0 0 24 24" fill="white" width="64" height="64">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <div className="modal-video-info">
                <h2>{selectedVideo.originalFilename}</h2>
                <div className="modal-video-meta">
                  <div className="modal-video-details">
                    <p><strong>Resolution:</strong> {selectedVideo.resolution}</p>
                    <p><strong>Duration:</strong> {selectedVideo.formattedDuration || "0:00"}</p>
                    <p><strong>Upload Date:</strong> {selectedVideo.formattedUploadTime}</p>
                    {selectedVideo.formattedProcessedTime && (
                      <p><strong>Processed Date:</strong> {selectedVideo.formattedProcessedTime}</p>
                    )}
                  </div>
                  <StatusBadge status={selectedVideo.status} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoGallery;