import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h3>Navigation</h3>
      <ul className="sidebar-menu">
        <li className="sidebar-menu-item">
          <Link to={"/dashboard"} className='side-menu-link'> <span>Dashboard</span></Link>
        </li>
        <li className="sidebar-menu-item">
          <a href="#analytics" className="sidebar-menu-link">
            <span>Analytics</span>
          </a>
        </li>
        <li className="sidebar-menu-item">
          <Link to={"/video-gallery"} className="sidebar-menu-link"> <span>Video Gallery</span></Link>
        </li>
        <li className="sidebar-menu-item">
          <a href="#tasks" className="sidebar-menu-link">
            <span>Tasks</span>
          </a>
        </li>
        <li className="sidebar-menu-item">
          <a href="#team" className="sidebar-menu-link">
            <span>Team</span>
          </a>
        </li>
        <li className="sidebar-menu-item">
          <a href="#messages" className="sidebar-menu-link">
            <span>Messages</span>
          </a>
        </li>
        <li className="sidebar-menu-item">
          <a href="#settings" className="sidebar-menu-link">
            <span>Settings</span>
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;