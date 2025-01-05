import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import APIConnector from '../util/APIConnector';

const MealPage = () => {

    const { id } = useParams(); // Extract URL parameter
    const [meals, setMeals] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const APIConn = new APIConnector();

        // Fetch data only once after component is mounted
        APIConn.GetMeal(id)
            .then(response => {
                setMeals(response.data); // Update state
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError('Failed to fetch meal data.');
            });
    }, [id]); // Dependency array ensures effect runs only when id changes

    // Error handling
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Fragment>
            <article className="post">
                <header>
                    <div className="title">
                        <h2>
                            {meals.name || ''}
                        </h2>
                        <p>{meals.description || ''}</p>
                    </div>
                </header>

                <footer>
                    <ul className="stats">
                        <li><a href="/meals" className="icon solid fa-star">
                        </a></li>
                        <li><a href="/meals" className="icon solid fa-comment">128</a></li>
                    </ul>
                </footer>

            </article>
        </Fragment>
    );
};

export default MealPage;
