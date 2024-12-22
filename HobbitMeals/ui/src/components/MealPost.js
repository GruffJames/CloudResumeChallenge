import React from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';

const MealPost = ({ _id, name, description, price, rating }) => {

    return (
        <article className="post">
            <header>
                <div className="title">
                    <h2>
                        <Link to={`/meals/${_id}`}>{name}</Link>
                    </h2>
                    <p>{description}</p>
                </div>
                <div className="meta">
                    <time className="published" dateTime="2015-11-01">
                        November 1, 2015
                    </time>
                    <a href="#" className="author">
                        {/* <span className="name">Jane Doe</span> */}
                        <img src="images/avatar.jpg" alt="" />
                    </a>
                </div>
            </header>
            <footer>
                <ul className="actions">
                    <li>
                        <Link className="button large" to={`/meals/${_id}`}>Continue Reading</Link>
                    </li>
                </ul>
                <ul className="stats">
                    <li><a href="#">£{price}</a></li>
                    <li><a href="#" className="icon solid fa-star">{rating.averageRating}</a></li>
                    <li><a href="#" className="icon solid fa-comment">128</a></li>
                </ul>
            </footer>
        </article>
    );
};

export default MealPost;
