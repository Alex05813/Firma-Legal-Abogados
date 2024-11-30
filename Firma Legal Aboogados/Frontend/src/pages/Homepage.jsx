import React from 'react';
import Header from '../components/Header.jsx';
import Main from '../components/Main.jsx';
import Footer from '../components/Footer.jsx';
import '../style/homepage.css';

function Homepage() {
  return (
    <div className="homepage-container">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default Homepage;
