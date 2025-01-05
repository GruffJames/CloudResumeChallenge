import React from 'react';

import { Link } from 'react-router-dom';


const Header = () => {
  
    return (
        <header id="header">
        <h1><Link to="/" >The Dancing Pony</Link></h1>
        <nav className="links">
        </nav>
    </header>
    );
}

export default Header;