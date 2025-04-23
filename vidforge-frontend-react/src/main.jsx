import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import VideoUploader from './VideoUploader.jsx'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import setupMockApi from './services/MockService.js'
import Dashboard from './components/Dashboard.jsx'
import VideoGallery from './components/VideoGallery.jsx'

// Setup mock API for development/testing
// if (process.env.NODE_ENV === 'development') {
//   setupMockApi();
// }
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
    <Routes>
      {/* Public route */}
      <Route path="/" element={<VideoUploader />} />
      {/* Admin route */}
      <Route element={<App />}>
          <Route index element={<Navigate to="/dashboard" replace />} /> 
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="video-gallery" element={<VideoGallery />} />
        </Route>
    </Routes>
  </BrowserRouter>
</StrictMode>,
)
