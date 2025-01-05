import './assets/css/main.css';

import React, { useEffect} from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Header from './components/Header';
import Main from './components/Main';
import MealPage from './components/MealPage';

const App = () => {

  // Function to dynamically add a script
  const addScript = (src) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = false;
    document.body.appendChild(script);
  };

  useEffect(() => {
    // Adding scripts dynamically when component mounts
    addScript("/assets/js/jquery.min.js");
    addScript("/assets/js/browser.min.js");
    addScript("/assets/js/breakpoints.min.js");
    addScript("/assets/js/util.js");
    addScript("/assets/js/main.js");
    addScript("/assets/js/custom/custom.js");

    // Cleanup function to remove scripts when component unmounts
    return () => {
      const scripts = document.querySelectorAll('script');
      scripts.forEach(script => {
        if (script.src.includes('/assets/js/')) {
          document.body.removeChild(script);
        }
      });
    };
  }, []);

  // Use matchPath to check if the current route matches '/meals/:id'

  return (
    <div className="is-preload">
      <div id="wrapper">
        <Header />
        <div id="main">
          <Routes>
            <Route path="/" element={<Navigate replace to="/meals" />} />
            <Route path="/meals" element={<Main/>} />
            <Route path="/meals/:id" element={<MealPage />} />

            <Route path="/error" element={<div>Error</div>} />
            <Route path="*" element={<Navigate replace to="/meals" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
