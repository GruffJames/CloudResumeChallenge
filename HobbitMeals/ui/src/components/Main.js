import React, { useState, useEffect } from 'react';
import MealPost from "./MealPost";
import APIConnector from '../util/APIConnector';
import { useSearchParams } from 'react-router-dom';

// Initialize API connector
const APIConn = new APIConnector();

const Main = () => {

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query'); // Get value of 'query'

  // State for meals and error handling
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null);


  // Fetch meals on component mount
  useEffect(() => {

    const filter = query ? { name: query } : null; // Filter by query if present
    APIConn.GetAllMeals(filter)
      .then(response => {
        setMeals(response.data); // Update state with meals
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Failed to fetch meal data.'); // Handle error
      });
  }, [query]); // Empty dependency array ensures it runs only once when mounted

  return (
    <div>
      {/* Display error if any */}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      {/* Map through meals and render MealPost component */}
      {meals.map(meal => (
        <MealPost 
          key={meal._id} 
          _id={meal._id} 
          name={meal.name} 
          description={meal.description} 
          price={meal.price}
          rating={meal.rating}
        />
      ))}
      {/* <MainFooter /> */}
    </div>
  );
};

export default Main;
