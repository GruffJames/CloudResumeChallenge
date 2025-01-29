import React, { useEffect } from 'react';

const Preloader = () => {
  useEffect(() => {
    const preloader = document.getElementById('preloader');
    const loader = document.getElementById('loader');
    const html = document.documentElement;

    if (preloader && loader) {
      // Hide the loader and preloader after the page has loaded or after a delay
      setTimeout(() => {
        loader.style.display = 'none'; // Hide the loader
        preloader.style.display = 'none'; // Hide the preloader
        html.classList.remove('ss-preload'); // Remove preload class
        html.classList.add('ss-loaded'); // Add loaded class
      }, 0); // You can also set a longer timeout if needed
    }

    return () => {
      // Optional cleanup: clear any timeout or event listeners if necessary
    };
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div id="preloader">
      <div id="loader" className="dots-fade">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Preloader;
