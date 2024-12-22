import './assets/css/main.css';
import Context from './util/Context';

import React, { useEffect, useContext, Fragment } from 'react';
import { Route, Routes, Navigate, useLocation, matchPath } from 'react-router-dom';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Menu from './components/Menu';
import Main from './components/Main';
import MealPage from './components/MealPage';
import UserSignIn from './components/SignInPage';
import RegisterUser from './components/RegisterUser';

import { UserType } from './enums/UserType';  
import CreateMeal from './components/CreateMeal';

const App = () => {

  const context = useContext(Context.Context);
  const authUser = context.authenticatedUser;

  const location = useLocation(); // Get the location

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
  const isMealPage = matchPath('/meals/:id', location.pathname);

  return (
    <div className="is-preload">
      <div id="wrapper">
        <Header />
        <div id="main">
          <Routes>
            <Route path="/" element={<Navigate replace to="/meals" />} />
            <Route path="/meals" element={<Main/>} />
            <Route path="/meals/:id" element={<MealPage />} />
            <Route path="/meals?query=params#" element={<RegisterUser />} />


            <Route path="/signin" element={<UserSignIn />} />

            {
              authUser ?
              <Fragment>
                {authUser.userType > UserType.Guest ?
                  <Fragment>
                    <Route path="/RegisterUser" 
                      element={authUser && authUser.userType > UserType.Guest ? <RegisterUser/> : <Navigate to="/signin" />} />
                    <Route path='/CreateMeal' 
                      element={authUser && authUser.userType > UserType.Guest ? <CreateMeal/> : <Navigate to="/signin" />} />
                  </Fragment>
                  : null
                } 
              </Fragment>
              : null
            }

            <Route path="/error" element={<div>Error</div>} />
            <Route path="*" element={<Navigate replace to="/meals" />} />
          </Routes>
        </div>
        {/* <Sidebar /> */}
        {/* {!isMealPage && <Sidebar />} */}
        <Menu />
      </div>
    </div>
  );
};

export default App;
