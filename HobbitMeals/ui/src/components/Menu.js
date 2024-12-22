import React, { useContext } from 'react';
import Context from '../util/Context';
import { useNavigate } from 'react-router-dom';

const Menu = () => {

    const context = useContext(Context.Context);
    const authUser = context.authenticatedUser;
    
    let navigate = useNavigate();
    
    const logOut = (event) => {
        event.preventDefault();
        console.log("Logging out");
        // context.actions.signOut();
        // navigate('/');
    };

    return (
        <section id="menu">

            <section>
                <form className="search" method="get" action="#">
                    <input type="text" name="query" placeholder="Search" />
                </form>
            </section>

            <section>
                <ul className="links">
                    <li>
                        <a href="#">
                            <h3>Etiam sed consequat</h3>
                            <p>xxx lectus amet ultricies</p>
                        </a>
                    </li>
                </ul>
            </section>

            <section>
                <form method="post" action="#">
                    <div className="row gtr-uniform">
                        <div className="col-12">
                            <ul className="actions">
                                <li onClick={logOut}><input type="reset" value="logout" /></li>
                            </ul>
                        </div>
                    </div>
                </form>
            </section>

        </section>
    );
}
export default Menu;

