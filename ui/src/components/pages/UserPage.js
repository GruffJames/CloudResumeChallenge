
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import Context from '../../util/Context';

const UserPage = () => {

    const context = useContext(Context.Context);
    const navigate = useNavigate();

    const logOut = (event) => {
        event.preventDefault();
        context.actions.signOut();
        navigate('/');
    };
    
    return (
        <div id="tab-about" className='tab-content__item'>
            <div className="row tab-content__item-header">
                <div className="column">
                    <h1>Title</h1>
                </div>
            </div>

            <div className="row">
                <div className="column">
                    <p className="lead">
                        Upper
                    </p>

                    <p>
                        lower
                    </p>
                </div>
            </div>
            <span className="btn btn--stroke h-full-width" onClick={logOut}>Log out</span>
            
        </div> 
    );
}

export default UserPage;
