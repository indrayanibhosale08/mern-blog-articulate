import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 mt-auto">
      <div className="container mx-auto px-4 py-4 text-center text-gray-400">
        <p>Copyright &copy; {new Date().getFullYear()} InkFlow. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;