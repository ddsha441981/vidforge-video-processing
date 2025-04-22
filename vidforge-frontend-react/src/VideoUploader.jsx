import React, { useState, useRef } from 'react';
import './VideoUploader.css';
import VideoService from './services/VideoService';

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

  return (

    <div className="upload-page-wrapper">
    <div className="upload-container">
      <h2>Upload Video</h2>

      <div className="upload-area" onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
        <div className="upload-icon">
          {/* SVG icon omitted for brevity */}
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
        </div>
      </div>

      {fileName && (
        <div className="file-info">
          <span>{fileName}</span>
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
          <p>{uploadResponse.message}</p>
          <p>File ID: {uploadResponse.fileId}</p>
          <p>Status: {uploadResponse.status}</p>
        </div>
      )}

      <div className="button-group">
        {file && !isUploading && !uploadResponse && (
          <>
            <button className="cancel-button" onClick={handleCancel}>Cancel</button>
            <button className="upload-button" onClick={handleUpload}>Upload Video</button>
          </>
        )}
        {uploadResponse && (
          <button className="new-upload-button" onClick={() => setUploadResponse(null)}>Upload Another Video</button>
        )}
      </div>
    </div>
    </div>


  );
};

export default VideoUploader;
