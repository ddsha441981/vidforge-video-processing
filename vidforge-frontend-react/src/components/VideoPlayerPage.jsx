import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './VideoPlayerPage.css';
import { getVideoById } from '../services/VideoService';

const VideoPlayerPage = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [controlsTimeout, setControlsTimeout] = useState(null);

  useEffect(() => {
    fetchVideo();
  }, [videoId]);

  const fetchVideo = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await getVideoById(videoId);
      setVideo(response.data);
    } catch (err) {
      setError("Failed to load video. Please try again later.");
      console.error("Error fetching video:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePlayPause = () => {
    const videoElement = document.getElementById('video-player');
    if (videoElement) {
      if (isPlaying) {
        videoElement.pause();
      } else {
        videoElement.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = (e) => {
    setCurrentTime(e.target.currentTime);
  };

  const handleLoadedMetadata = (e) => {
    setDuration(e.target.duration);
  };

  const handleVolumeChange = (e) => {
    const volumeValue = parseInt(e.target.value);
    setVolume(volumeValue);
    
    const videoElement = document.getElementById('video-player');
    if (videoElement) {
      videoElement.volume = volumeValue / 100;
      setIsMuted(volumeValue === 0);
    }
  };

  const handleMuteToggle = () => {
    const videoElement = document.getElementById('video-player');
    if (videoElement) {
      if (isMuted) {
        videoElement.volume = volume / 100;
        setIsMuted(false);
      } else {
        videoElement.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    
    const videoElement = document.getElementById('video-player');
    if (videoElement) {
      videoElement.currentTime = seekTime;
    }
  };

  const handleFullscreenToggle = () => {
    const videoContainer = document.querySelector('.video-container');
    
    if (!isFullscreen) {
      if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen();
      } else if (videoContainer.webkitRequestFullscreen) {
        videoContainer.webkitRequestFullscreen();
      } else if (videoContainer.msRequestFullscreen) {
        videoContainer.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    
    setIsFullscreen(!isFullscreen);
  };

  const handleMouseMove = () => {
    setShowControls(true);
    
    if (controlsTimeout) {
      clearTimeout(controlsTimeout);
    }
    
    const timeout = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
    
    setControlsTimeout(timeout);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="video-player-loading">
        <div className="spinner"></div>
        <p>Loading video...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="video-player-error">
        <svg viewBox="0 0 24 24" width="48" height="48">
          <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
        <p>{error}</p>
        <button className="back-button" onClick={handleBackClick}>
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
          Back to Gallery
        </button>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="video-player-error">
        <p>Video not found</p>
        <button className="back-button" onClick={handleBackClick}>
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
          Back to Gallery
        </button>
      </div>
    );
  }

  return (
    <div className="video-player-page">
      <div className="back-nav">
        <button className="back-button" onClick={handleBackClick}>
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
          Back to Gallery
        </button>
      </div>
      
      <div className="video-container" onMouseMove={handleMouseMove}>
        <video
          id="video-player"
          src={video.videoUrl}
          poster={video.thumbnailUrl || "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
          onClick={handlePlayPause}
        />
        
        {!isPlaying && (
          <div className="play-button-large" onClick={handlePlayPause}>
            <svg viewBox="0 0 24 24" fill="white" width="64" height="64">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        )}
        
        <div className={`video-controls ${showControls ? 'show' : 'hide'}`}>
          <div className="progress-bar">
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="progress-slider"
            />
          </div>
          
          <div className="controls-row">
            <div className="controls-left">
              <button className="control-button" onClick={handlePlayPause}>
                {isPlaying ? (
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path fill="currentColor" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path fill="currentColor" d="M8 5v14l11-7z"/>
                  </svg>
                )}
              </button>
              
              <div className="volume-control">
                <button className="control-button" onClick={handleMuteToggle}>
                  {isMuted ? (
                    <svg viewBox="0 0 24 24" width="24" height="24">
                      <path fill="currentColor" d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" width="24" height="24">
                      <path fill="currentColor" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                    </svg>
                  )}
                </button>
                
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="volume-slider"
                />
              </div>
              
              <div className="time-display">
                <span>{formatTime(currentTime)}</span>
                <span> / </span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
            
            <div className="controls-right">
              <button className="control-button" onClick={handleFullscreenToggle}>
                {isFullscreen ? (
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path fill="currentColor" d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path fill="currentColor" d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="video-details">
        <h1 className="video-title">{video.originalFilename}</h1>
        
        <div className="video-metadata">
          <div className="video-stats">
            <div className="stat-item">
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path fill="currentColor" d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z"/>
              </svg>
              <span>{video.formattedUploadTime}</span>
            </div>
            
            <div className="stat-item">
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path fill="currentColor" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
              </svg>
              <span>{video.formattedDuration || "0:00"}</span>
            </div>
            
            <div className="stat-item">
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path fill="currentColor" d="M21 3H3C2 3 1 4 1 5v14c0 1.1.9 2 2 2h18c1 0 2-1 2-2V5c0-1-1-2-2-2zm0 16H3V5h18v14zM9 8h2v8H9zm4 0h2v8h-2z"/>
              </svg>
              <span>{video.resolution}</span>
            </div>
            
            <div className={`status-badge status-${video.status.toLowerCase()}`}>
              {video.status}
            </div>
          </div>
        </div>
        
        <div className="action-buttons">
          <button className="action-button download-button">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="currentColor" d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
            </svg>
            Download
          </button>
          
          <button className="action-button share-button">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="currentColor" d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
            </svg>
            Share
          </button>
          
          <button className="action-button add-button">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
            Save
          </button>
        </div>
        
        <div className="video-description">
          <h3>Description</h3>
          <p>{video.description || "No description available."}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerPage;