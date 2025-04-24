import React, { useState, useRef } from 'react';
import './VideoUploader.css';
import VideoService from '../services/UploadVideoService';
import { UPLOAD_VIDEO } from '../shared/Constant';

const VideoUploader = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadResponse, setUploadResponse] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('video/')) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setError(null);
    } else {
      setError('Please select a valid video file');
      resetInput();
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('video/')) {
      setFile(droppedFile);
      setFileName(droppedFile.name);
      setError(null);
    } else {
      setError('Please drop a valid video file');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setError(null);
    setUploadResponse(null);

    try {
      const response = await VideoService.uploadVideo(file, setUploadProgress);
      setUploadResponse(response);
      resetInput();
    } catch (err) {
      setError(err.message || 'Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const resetInput = () => {
    setFile(null);
    setFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCancel = () => {
    resetInput();
    setError(null);
  };

  // Format file size for display
  const formatFileSize = (bytes) => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Add an icon for the upload area
  const UploadIcon = () => (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#3498db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="17 8 12 3 7 8"></polyline>
      <line x1="12" y1="3" x2="12" y2="15"></line>
    </svg>
  );

  return (
    <div className="upload-page-wrapper">
      <div className="upload-container">
        <h2 className='upload-text'>{UPLOAD_VIDEO}</h2>

        <div 
          className="upload-area" 
          onDragOver={(e) => e.preventDefault()} 
          onDrop={handleDrop}
        >
          <div className="upload-icon">
            <UploadIcon />
          </div>
          <div className="upload-text">
            <p>Drag and drop your video file here</p>
            <p className="upload-text-sub">or</p>
            <label className="file-select-button">
              Browse Files
              <input
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                style={{ display: 'none' }}
              />
            </label>
            {!file && (
              <p className="upload-text-sub">
                Supports: MP4, MOV, AVI, MKV (Max 500MB)
              </p>
            )}
          </div>
        </div>

        {fileName && (
          <div className="file-info">
            <span>{fileName}</span>
            {file && (
              <span className="file-size">
                ({formatFileSize(file.size)})
              </span>
            )}
          </div>
        )}

        {error && <div className="error-message">{error}</div>}

        {isUploading && (
          <div className="progress-container">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${uploadProgress}%` }}></div>
            </div>
            <div className="progress-text">{uploadProgress}%</div>
          </div>
        )}

        {uploadResponse && (
          <div className="success-message">
            <p>Upload Successful!</p>
            <p>File: {uploadResponse.fileId}</p>
            <p>Status: {uploadResponse.status}</p>
            <p>{uploadResponse.message}</p>
          </div>
        )}

        <div className="button-group">
          {file && !isUploading && !uploadResponse && (
            <>
              <button className="cancel-button" onClick={handleCancel}>Cancel</button>
              <button className="upload-button" onClick={handleUpload}>{UPLOAD_VIDEO}</button>
            </>
          )}
          {uploadResponse && (
            <button className="new-upload-button" onClick={() => setUploadResponse(null)}>
              Upload Another Video
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoUploader;