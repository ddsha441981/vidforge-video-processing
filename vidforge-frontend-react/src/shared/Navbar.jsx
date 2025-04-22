import React from 'react';

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="navbar">
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>
      <ul className="navbar-menu">
        <li><a href="#dashboard">Dashboard</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#tasks">Tasks</a></li>
        <li><a href="#reports">Reports</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;