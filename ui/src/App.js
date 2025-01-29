import React, { Fragment, useEffect } from 'react';

import './assets/css/base.css';
import './assets/css/vendor.css';
import './assets/css/main.css';

import Preloader from './components/util/Preloader';
import Header from './components/Header';
import IntroSection from './components/IntroSection';
import InfoSection from './components/InfoSection';

const App = () => {

  useEffect(() => {
    // You can add any additional script logic here as well
    const addScript = (src, defer = true) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.defer = defer;
        script.async = false;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Script load error: ${src}`));
        document.body.appendChild(script);
      });
    };

    const loadScripts = async () => {
      try {
        await addScript('/assets/js/jquery-3.2.1.min.js');
        await addScript('/assets/js/plugins.js');
        await addScript('/assets/js/main.js');
        await addScript('/assets/js/modernizr.js');
        await addScript('/assets/js/fontawesome/all.min.js');
      } catch (error) {
        console.error('Error loading scripts:', error);
      }
    };

    loadScripts();

  }, []); // Empty dependency array ensures this runs only once

  return (
    <Fragment>
      <Preloader />  {/* This will trigger ssPreloader() */}
      <Header/>
      <IntroSection/>
      <InfoSection/>
    </Fragment>
  );
}

export default App;
