import React, { Fragment, useContext, useState } from 'react';
import Context from '../util/Context';

import APIConnector from "../util/APIConnector";
import { Link, useNavigate } from 'react-router-dom';

import { UserType } from '../enums/UserType';

const Header = () => {

    const context = useContext(Context.Context);
    const authUser = context.authenticatedUser;

    let navigate = useNavigate();

    // const [mealNameQuery, setMealNameQuery] = useState('');

    // const onChange = (event) => {
    //     const name = event.target.name;
    //     const value = event.target.value;
    
    //     if (name === 'mealNameQuery') {
    //         setMealNameQuery(value);
    //     }
    // }

    const logOut = (event) => {
        event.preventDefault();
        console.log("Logging out");
        context.actions.signOut();
        navigate('/');
    };
  
    return (
        <header id="header">
        <h1><Link to="/" >The Dancing Pony</Link></h1>
        <nav className="links">
            <ul>
                {authUser ?
                <Fragment>    
                    <li>
                        <p>Welcome, {authUser.username} !</p>
                    </li>
                    {authUser.userType > UserType.Guest ?
                    <Fragment>
                        <li>
                            <h3><Link to="/RegisterUser">Register user</Link></h3>
                        </li>
                        <li>
                            <h3><Link to="/CreateMeal">Create meal</Link></h3>
                        </li>
                    </Fragment>
                    : null
                    }
                <li>
                    <h3 onClick={logOut}><a href="">Sign out</a></h3>
                </li>
                </Fragment>
                    :
                <li>
                    <h3><Link to="/signin">Sign In</Link></h3>
                </li>
                }

            </ul>
        </nav>
        <nav className="main">
            <ul>

                {authUser ?
                    <Fragment>    
                        {authUser.userType > UserType.Guest ?
                            <li className="search">
                                <a className="fa-search" href="#search">Search</a>
                                <form id="search" method="get" action="#">
                                    <input type="text" name="query" placeholder="Search meals" />
                                </form>
                            </li>
                        : null
                        }

                    </Fragment>
                    :
                    null
                }
                {/* <li className="menu">
                    <a className="fa-bars" href="#menu">Menu</a>
                </li> */}
            </ul>
        </nav>
    </header>
    );
}

export default Header;