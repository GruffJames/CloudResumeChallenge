import React, { useState, useContext } from 'react';
import Context from '../util/Context';
import { useNavigate, useLocation } from 'react-router-dom';

const UserSignIn = () => {
  const context = useContext(Context.Context);
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
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
  }

  const submit = (event) => {
    event.preventDefault();
    // Navigate to where the user visited the Sign In page "from", if applicable
    const { from } = location.state || { from: { pathname: '/' } };

    context.actions.signIn(emailAddress, password)
      .then((response) => {
        if (response.status === 200) {
          navigate(from); 
        } else {
          setErrors([{ message: 'Sign in unsuccessful' }]);
        }
      })
      .catch((error) => {
        console.error(error);
        setErrors([{ message: 'Sign in unsuccessful' }]);
      });
  }


  return (
    <article className="post">
        <header>
            <div className="title">
                <h2>
                    <a href="single.html">Sign in</a>
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
                      <input type="text" name="emailAddress" id="emailAddress" value={emailAddress} placeholder="Username" onChange={onChange}/>
                  </div>
                  <div className="col-6 col-12-xsmall">
                      <input type="password" name="password" id="password" value={password} placeholder="Password" onChange={onChange}/>
                  </div>
                  <div className="col-12">
                      <ul className="actions">
                          <li onClick={submit}><input type="submit" value="Login" /></li>
                      </ul>
                  </div>
              </div>
          </form>
        </section>
    </article>
  );
}

export default UserSignIn;
