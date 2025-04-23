import { useState } from 'react';
import './App.css';
import Header from './shared/Header';
import Navbar from './shared/Navbar';
import Sidebar from './shared/Sidebar';
import Footer from './shared/Footer';
import { Outlet } from 'react-router-dom';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="app-container">
      <Header />
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="main-wrapper">
        {sidebarOpen && <Sidebar />}
        <div className={`main-content ${!sidebarOpen ? 'full-width' : ''}`}>
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
