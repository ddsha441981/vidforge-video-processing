import React from 'react';
import logo from '../assets/logo_with_transparent.png';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
     <div className="header-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
     <Link to={"/dashboard"}>
        <img src={logo} alt="VidForge Logo" style={{ height: '80px' }} />
     </Link>
    </div>
      <div className="header-actions">
        {/* User profile, notifications, etc could go here */}
      </div>
    </header>
  );
};

export default Header;