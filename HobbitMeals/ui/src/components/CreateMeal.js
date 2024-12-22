


import React, { useState, useContext } from 'react';
import Context from '../util/Context';
import { useNavigate, useLocation } from 'react-router-dom';
import APIConnector from '../util/APIConnector';

const CreateMeal = () => {

  const context = useContext(Context.Context);
  const authUser = context.authenticatedUser;

  const [mealName, setMealName] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const APIConn = new APIConnector();

  const [errors, setErrors] = useState([]);

  let navigate = useNavigate();
  let location = useLocation();

  const onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === 'mealName') {
        setMealName(value);
    }

    if (name === 'image') {
        setImage(value);
    }
    if (name === 'price') {
        setPrice(value);
    }

    if (name === 'description') {
        setDescription(value);
    }
  }

  const submit = (event) => {
    event.preventDefault();
    // Navigate to where the user visited the Sign In page "from", if applicable
    const { from } = location.state || { from: { pathmealName: '/' } };

    APIConn.CreateMeal(mealName, image, price, description, authUser._id)
      .then((response) => {
        if (response !== null) {
          navigate(`/meals/${response.data.newMeal._id}`);
        } else {
          setErrors(response.message);
        }
      })
      .catch((error) => {
        console.error(error);
        navigate('/error');
      });
  }

  return (
    <article className="post">
        <header>
            <div className="title">
                <h2>
                    Create a new meal
                </h2>
            </div>
        </header>
        <section>
        {errors ?
            <div>
              {errors.length ?
                <div>
                <h3>Meal creation unsuccessful</h3>
                <p>Please try again</p>
                </div>
                : null
              }
            </div>             
              : null
          }   
            <form method="post" action="#">
                <div className="row gtr-uniform">
                    <div className="col-6 col-12-xsmall">
                        <p>Meal Name</p>
                        <input type="text" name="mealName" id="mealName" value={mealName} placeholder="Meal name" onChange={onChange}/>
                    </div>
                    <div className="col-6 col-12-xsmall">
                        <p>Image</p>
                        <input type="text" name="image" id="emailAddress" value={image} placeholder="image" onChange={onChange}/>
                    </div>
                    <div className="col-6 col-12-xsmall">
                      <p>Price (£)</p>
                        <input type="price" name="price" id="price" value={price} placeholder="Price" onChange={onChange}/>
                    </div>
                    <div className="col-6 col-12-xsmall">
                      <p>Description</p>
                        {/* <input type="tel" name="description" id="description" value={description} placeholder="Description" onChange={onChange}/> */}
                        <div className="col-12">
                            <textarea name="description" id="description" placeholder="Enter your description" rows="6" value={description} onChange={onChange}></textarea>
                        </div>
                    </div>
                    <div className="col-12">
                        <ul className="actions">
                            <li onClick={submit}><input type="submit" value="Create" /></li>
                            {/* <li onClick={cancel}><input type="reset" value="Reset" /></li> */}
                        </ul>
                    </div>
                </div>
            </form>
        </section>
    </article>
  );
}

export default CreateMeal;
