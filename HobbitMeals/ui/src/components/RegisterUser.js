
import React, { useState, useContext } from 'react';
import Context from '../util/Context';
import { useNavigate, useLocation } from 'react-router-dom';
import APIConnector from '../util/APIConnector';

const RegisterUser = () => {

  const context = useContext(Context.Context);
  const authUser = context.authenticatedUser;

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const [username, setUsername] = useState('');
  const [telephone, setTelephone] = useState('');
  const [userType, setUserType] = useState('');

  const APIConn = new APIConnector();

  const [errors, setErrors] = useState([]);

  let navigate = useNavigate();
  let location = useLocation();

  const onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === 'emailAddress') {
      setEmailAddress(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
    if (name === 'username') {
      setUsername(value);
    }
    if (name === 'telephone') {
      setTelephone(value);
    }
    if (name === 'userType') {
      setUserType(value);
    }
  }

  const submit = (event) => {
    event.preventDefault();
    // Navigate to where the user visited the Sign In page "from", if applicable
    const { from } = location.state || { from: { pathname: '/' } };

    APIConn.CreateUser(username, password, telephone, emailAddress, authUser._id, userType)
      .then((response) => {
        if (response !== null && response.statusText) {
          window.alert('User created successfully - TODO: redirect to user profile page');
          navigate("/meals");
        } else {
          setErrors(response.message);
        }
      })
      .catch((error) => {
        console.error(error);
        navigate('/error');
      });
  }

  // const cancel = (event) => {
  //   event.preventDefault();
  //   navigate('/RegisterUser');
  // }

  return (
    <article className="post">
        <header>
            <div className="title">
                <h2>
                    Create a new customer account
                </h2>
            </div>
        </header>
        <section>
        {errors ?
            <div>
              {errors.length ?
                <div>
                <h3>Sign in unsuccessful</h3>
                <p>Please check your email address and password and try again.</p>
                </div>
                : null
              }
            </div>             
              : null
          }   
            <form method="post" action="#">
                <div className="row gtr-uniform">
                    <div className="col-6 col-12-xsmall">
                        <p>Username</p>
                        <input type="text" name="username" id="username" value={username} placeholder="Username" onChange={onChange}/>
                    </div>
                    <div className="col-6 col-12-xsmall">
                        <p>Email</p>
                        <input type="text" name="emailAddress" id="emailAddress" value={emailAddress} placeholder="Email" onChange={onChange}/>
                    </div>
                    <div className="col-6 col-12-xsmall">
                      <p>Password</p>
                        <input type="password" name="password" id="password" value={password} placeholder="Password" onChange={onChange}/>
                    </div>
                    <div className="col-6 col-12-xsmall">
                      <p>Telephone</p>
                        <input type="tel" name="telephone" id="telephone" value={telephone} placeholder="Telephone" onChange={onChange}/>
                    </div>

                    <div className="row gtr-uniform">
                        <div className="col-12">
                            <select name="userType" id="userType" value={userType} onChange={onChange} > 
                                <option value="">- User type -</option>
                                <option value="0">Guest</option>
                                <option value="1">Admin</option>
                            </select>
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

export default RegisterUser;
