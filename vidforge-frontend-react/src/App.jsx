import { useState } from 'react';
import './App.css';
import Header from './shared/Header';
import Navbar from './shared/Navbar';
import Sidebar from './shared/Sidebar';
import MainContent from './components/MainContent';
import Footer from './shared/Footer';

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
          <MainContent />
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default App;

// import { useState } from 'react'
// import './App.css'
// import Header from './shared/Header';
// import Navbar from './shared/Navbar';
// import Sidebar from './shared/Sidebar';
// import MainContent from './components/MainContent';
// import Footer from './shared/Footer';


// function App() {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
  
//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   return (
//     <div className="app-container">
//       <Header />
//       <Navbar toggleSidebar={toggleSidebar} />
//       <div className="main-wrapper">
//         {sidebarOpen && <Sidebar />}
//         <MainContent />
//       </div>
//       <Footer />
//     </div>
//   )
// }

// export default App