import { useContext } from 'react';
import {Link} from 'react-router-dom';

import Context from '../util/Context';

const Header = () => {

    const context = useContext(Context.Context);
    const authUser = context.authenticatedUser;

    return (
    <header className="s-header">

        <div className="header-logo">
            <a className="site-logo" href="/">
                <h1>gruff-james.dev</h1>
            </a>
        </div>

    
            {authUser ?
                <div className="header-email">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 12l11 3.1 7-8.1-8.156 5.672-4.312-1.202 15.362-7.68-3.974 14.57-3.75-3.339-2.17 2.925v-.769l-2-.56v7.383l4.473-6.031 4.527 4.031 6-22z"/></svg>
                    <Link to="/account">
                        <span>Welcome back {authUser.username}</span>
                    </Link>
                </div>
                : 
                null
            }
            
        

    </header>
    );
}

export default Header;