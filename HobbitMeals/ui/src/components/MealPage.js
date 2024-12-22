import React, { useState, useEffect, Fragment, useContext } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import APIConnector from '../util/APIConnector';
import Context from '../util/Context';
import { UserType } from '../enums/UserType';

const MealPage = () => {

    const context = useContext(Context.Context);
    const authUser = context.authenticatedUser;

    const { id } = useParams(); // Extract URL parameter
    const [meals, setMeals] = useState([]);
    const [error, setError] = useState(null);

    const APIConn = new APIConnector();
    let navigate = useNavigate();
    let location = useLocation();

    const [mealScore, setMealScore] = useState('');

    const [errors, setErrors] = useState([]);

    const onChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
    
        if (name === 'mealScore') {
            
            if (value !== '') {
                APIConn.SubmitScore(id, parseInt(value), authUser._id)
                    .then((response) => {
                    if (response.status === 200) {
                        console.log("review submitted");
                    } else {
                        setErrors(response.message);
                    }
                    })
                    .catch((error) => {
                        console.error(error);
                        navigate('/error');
                    });
            }
            else{
                APIConn.ResetScore(id, authUser._id)
                .then((response) => {
                if (response !== null) {
                    console.log("review submitted");
                } else {
                    console.log("na in");
                    setErrors(response.message);
                }
              })
                .catch((error) => {
                console.error(error);
                navigate('/error');
                });
            }
            setMealScore(value);
        }
      }

    useEffect(() => {
        const APIConn = new APIConnector();

        // Fetch data only once after component is mounted
        APIConn.GetMeal(id)
            .then(response => {
                setMeals(response.data); // Update state

                if (authUser){
                    APIConn.AuthUser(authUser.username, authUser.password)
                    .then(userResponse => {
                        console.log(userResponse);
                        const mealRating = userResponse.data.reviews.find((review) => review.mealId == response.data._id);
                        if (mealRating) {
                            setMealScore(mealRating.mealScore);
                        };
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                        setError('Failed to fetch meal data.');
                    });
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError('Failed to fetch meal data.');
            });
    }, [id]); // Dependency array ensures effect runs only when id changes


    const deleteMeal = (event) => {
        event.preventDefault();
        // Navigate to where the user visited the Sign In page "from", if applicable

        APIConn.DeleteMeal(id, authUser._id)
            .then((response) => {
            if (response !== null) {
                navigate('/meals');
            } else {

                setErrors(response.message);
            }
            })
            .catch((error) => {
                console.error(error);
                navigate('/error');
            });
    }

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
                            {meals.name || 'Meal Name'}
                        </h2>
                        <p>{meals.description || 'Meal Description'}</p>
                    </div>
                    {/* <div className="meta">
                        <div className='published'>Recipe published by</div>
                        <a href="#" className="author"><span className="name">Jane Doe</span><img src="images/avatar.jpg" alt="" /></a>
                    </div> */}
                </header>
                <a href="single.html" className="image featured"><img src="images/pic01.jpg" alt="" /></a>

                <footer>
                    <ul className="stats">
                        <li><a href="#" className="icon solid fa-star">
                            { 
                                meals.rating ?
                                    meals.rating.averageRating
                                :
                                null
                            }
                        </a></li>
                        <li><a href="#" className="icon solid fa-comment">128</a></li>
                    </ul>
                </footer>

            </article>

            {authUser ?
                <section className='user-reviews'>
                <form method="post" action="#">
                    <div className="row gtr-uniform">
                        <div className="col-12">
                            <select name="mealScore" id="mealScore" value={mealScore} onChange={onChange} > 
                                <option value="">- Score out of 5 -</option>
                                <option value="1">Very bad</option>
                                <option value="2">Bad</option>
                                <option value="3">Average</option>
                                <option value="4">Good</option>
                                <option value="5">Very good</option>
                            </select>
                        </div>
                    </div>  
                </form>
                {/* <form method="post" action="#">
                    <div className="col-12">
                        <textarea name="demo-message" id="demo-message" placeholder="Enter your review" rows="6"></textarea>
                    </div>
                    <div className="col-12">
                    <br/>
                        <ul className="actions">
                            <li><input type="submit" value="Send Message" /></li>
                            <li><input type="reset" value="Reset" /></li>
                        </ul>
                    </div>
                </form> */}
                {authUser.userType > UserType.Guest ?
                    <form method="post" action="#">
                        <div className="row gtr-uniform">
                            <div className="col-12">
                                <ul className="actions">
                                    <li onClick={deleteMeal}><input type="submit" value="delete Meal"/></li>
                                </ul>
                            </div>
                        </div>  
                    </form>
                : null
                }
            </section>
            : 
                null
            }

        </Fragment>
    );
};

export default MealPage;
