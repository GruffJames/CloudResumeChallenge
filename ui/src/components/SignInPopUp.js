import React, { useState, useContext } from 'react';
import Context from '../util/Context';

function SignInPopUp(){

    const context = useContext(Context.Context);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [LoggingIn, setLoggingIn] = useState(false);

    const [errors, setErrors] = useState([]);

    const onChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
    
        if (name === 'username') {
          setUsername(value);
        }
    
        if (name === 'password') {
          setPassword(value);
        }
    }

    const submit = (event) => {
        event.preventDefault();
        // Navigate to where the user visited the Sign In page "from", if applicable
    
        setLoggingIn(true);

        context.actions.signIn(username, password)
          .then((response) => {
            if (response.status === 200) {
              const modal = document.querySelector(".modal");
              modal.classList.toggle("show-modal");
              setErrors([]);
            } else {
              setErrors([{ message: 'Login in unsuccessful' }]);
            }
          })
          .catch((error) => {
            console.error(error);
            setErrors([{ message: 'Login in unsuccessful' }]);
          })
          .finally(() => {
            setLoggingIn(false);
          });;
    }

    return (
        <div className="modal">
            <div className="modal__inner">

                <span className="modal__close"></span>

                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/></svg>

                <h3>Login</h3>
                <p>
                  Be the first to know about the latest updates and
                  get exclusive offers.
                </p>

                <form id="mc-form" className="group mc-form" noValidate>
                    <input
                        type="text"
                        name="username"
                        className="h-full-width h-text-center h-add-half-bottom"
                        id="mc-username"
                        placeholder="Username"
                        required
                        autoComplete='username'
                        value={username}
                        onChange={onChange}
                    />
                    <input
                        type="password"
                        name="password"
                        className="password h-full-width h-text-center h-add-half-bottom"
                        id="mc-password"
                        placeholder="Password"
                        autoComplete='current-password'
                        required
                        value={password}
                        onChange={onChange}
                    />
                    <input
                        id='mc-login'
                        type="submit"
                        name="Login"
                        value="Login"
                        className="btn--small h-full-width"
                        onClick={submit}
                    />
                    <label htmlFor="mc-login" className="subscribe-message"></label>
                {LoggingIn ?
                  <p>Logging in...</p>
                  :
                  null
                }
                {errors.length !== 0 ?
                        <div className="alert-box alert-box--error hideit">
                            <p>{errors[0].message}</p>
                            {/* <i className="fa fa-times alert-box__close" aria-hidden="true"></i> */}
                            {/* TODO: must fix this */} 
                        </div>
                      :
                    null
                }
                </form>
            </div> 
        </div> 
    );
}

export default SignInPopUp;