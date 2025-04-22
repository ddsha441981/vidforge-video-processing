import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import VideoUploader from './VideoUploader.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<VideoUploader />} />

        {/* Admin route - loads full layout */}
        <Route path="/admin/*" element={<App />} />
      </Routes>
    </BrowserRouter>
    {/* <App /> */}
  </StrictMode>,
)
