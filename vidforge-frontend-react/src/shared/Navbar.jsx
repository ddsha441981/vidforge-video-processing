import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="navbar">
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>
      <ul className="navbar-menu">
        <li><Link to={"/dashboard"}>Dashboard</Link></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#tasks">Tasks</a></li>
        <li><a href="#reports">Reports</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;