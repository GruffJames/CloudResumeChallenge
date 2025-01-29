import { useContext } from 'react';
import {Routes, Route, Link, Navigate } from 'react-router-dom';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import WorkPage from './pages/WorkPage';
import ProjectsPage from './pages/ProjectsPage';
import UserPage from './pages/UserPage';
import Footer from './Footer';

import Context from '../util/Context';
import Error404Page from './pages/Error404Page';

const InfoSection = () => {

    const context = useContext(Context.Context);
    const authUser = context.authenticatedUser;

    return (
        <section id="info" className="s-info">
            <div className="vert-line"></div>
            <div className="row info-content">
                <div className="column">
                    <nav className="tab-nav">
                        <ul className="tab-nav__list">
                            <li>
                                <Link to="/about">
                                    <span>About</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/work">
                                    <span>Work</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/projects">
                                    <span>Projects</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact">
                                    <span>Contact</span>
                                </Link>
                            </li>
                            {
                                authUser ?
                                    <li>
                                        <Link to="/account">
                                            <span>Account</span>
                                        </Link>
                                    </li>
                                :
                                null 
                            }
                        </ul>
                    </nav>

                    <div className="tab-content">
                        <Routes>
                            <Route path="/about" element={<AboutPage />} />
                            <Route path="/projects" element={<ProjectsPage />} />
                            <Route path="/contact" element={<ContactPage />} />
                            <Route path="/work" element={<WorkPage />} />

                            {
                                authUser ?
                                    <Route path="/account" element={<UserPage/>} />
                                :
                                null 
                            }
                            <Route path="/" element={<Navigate replace to="/about" />} />
                            <Route path="/404" element={<Error404Page/>} />
                            <Route path="*" element={<Navigate replace to="/404" />} />
                        </Routes>
                    </div>

                    <Footer />
                </div>
            </div>
        </section>
    );
}

export default InfoSection;
