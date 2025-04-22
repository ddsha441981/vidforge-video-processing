import React from 'react';

const MainContent = () => {
  return (
    <div className="main-content-container">
      <div className="welcome-section">
        <h1 className="main-title">Welcome to App Project</h1>
        <p className="main-description">This is the main content area of your application. It will display the primary content based on the selected navigation item.</p>
      </div>
      
      <div className="card-grid">
        <div className="card">
          <div className="card-content">
            <h2 className="card-title">Getting Started</h2>
            <p className="card-text">To customize this page, edit the MainContent.jsx component.</p>
            <p className="card-text">You can add different sections and components based on your project requirements.</p>
          </div>
        </div>
        
        <div className="stats-grid">
          <div className="stat-card">
            <h3 className="stat-title">Projects</h3>
            <div className="stat-value">12</div>
          </div>
          
          <div className="stat-card">
            <h3 className="stat-title">Tasks</h3>
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

export default MainContent;