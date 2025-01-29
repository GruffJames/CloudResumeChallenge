import { useContext } from 'react';

import Context from '../util/Context';
import SignInPopUp from "./SignInPopUp";

function IntroSection() {

    
    const context = useContext(Context.Context);
    const authUser = context.authenticatedUser;

    return (
        <section id="intro" className="s-intro s-intro--static">

            <div className="grid-overlay">
                <div></div>
            </div> 

            <div className="row intro-content">

                <div className="column">

                    <div className="intro-content__text">

                        <h3>Gruff James</h3>
                        <h1>Software developer</h1>

                    </div>

                    <div className="intro-content__bottom">

                        <div className="intro-content__notify" style={{ visibility: authUser ? 'hidden' : 'visible' }}>
                            <button type="button" className="btn--stroke btn--small modal-trigger">
                                Sign in
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 12l-9-9v7h-15v4h15v7z"/></svg>
                            </button>
                        </div> 
        
                    </div> 

                </div> 

            </div>

            <SignInPopUp/>

            <ul className="intro-social">
                <li><a href="https://github.com/GruffJames/" aria-label="Go to Github"><i className="fab fa-github" aria-hidden="true"></i></a></li>
                <li><a href="https://www.linkedin.com/in/gruff-james/" aria-label="Go to LinkedIn"><i className="fab fa-linkedin" aria-hidden="true"></i></a></li>
                <li><a href="https://www.instagram.com/gruffjames/" aria-label="Go to Instagram"><i className="fab fa-instagram" aria-hidden="true"></i></a></li>
            </ul> 

            <div className="intro-scroll">
                <a href="#info" className="scroll-link smoothscroll">
                    Scroll For More
                </a>
            </div> 

        </section> 
    );
}

export default IntroSection;