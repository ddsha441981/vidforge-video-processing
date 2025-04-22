import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <p>&copy; {currentYear} App Project. All rights reserved.</p>
    </footer>
  );
};

export default Footer;