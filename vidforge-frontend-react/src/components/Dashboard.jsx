import React from 'react';
const Dashboard = ()=> {
    return(

        <div className="main-content-container">
      <div className="welcome-section">
        <h1 className="main-title">Welcome to VidForge Video Processing </h1>
        <p className="main-description">VidForge: Simplifying video processing with seamless uploads, advanced format conversions, and powerful metadata extraction for your media.</p>
      </div>
      
      <div className="card-grid">
        <div className="card">
          <div className="card-content">
            <h2 className="card-title">Getting Started</h2>
            <p className="card-text">VidForge is an innovative video processing solution built to streamline video file management.</p>
            <p className="card-text">With VidForge, you can upload, process, and store videos effortlessly. </p>
            <p className='card-text'>It supports various video operations such as format conversion, metadata extraction, and thumbnail generation, making it the perfect choice for developers and content creators alike.</p>
          </div>
        </div>
        
        <div className="stats-grid">
          <div className="stat-card">
            <h3 className="stat-title">Uploaded Videos</h3>
            <div className="stat-value">12</div>
          </div>
          
          <div className="stat-card">
            <h3 className="stat-title">Archived Videos</h3>
            <div className="stat-value">48</div>
          </div>
          
          <div className="stat-card">
            <h3 className="stat-title">Team Members</h3>
            <div className="stat-value">8</div>
          </div>
          
          <div className="stat-card">
            <h3 className="stat-title">Completed</h3>
            <div className="stat-value">32</div>
          </div>
        </div>
      </div>
    </div>
    );
};
export default Dashboard;