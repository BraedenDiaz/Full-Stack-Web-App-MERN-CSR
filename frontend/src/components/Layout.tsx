import React from "react";
import { Outlet, Link } from "react-router-dom";

export default class Layout extends React.Component
{
    render() 
    {
        return (
            <div>
                <div className="p-5 bg-primary text-white">
                    <h1 className="display-2 text-center">A Website</h1>
                </div>
                <nav className="navbar navbar-expand-sm bg-dark navbar-dark sticky-top">
                    <div className="container-fluid">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="collapsibleNavbar">
                            <ul className="navbar-nav me-auto">
                                <li className="nav-item">
                                    <Link to="/" className="nav-link">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="#" className="nav-link">Forums</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="#" className="nav-link">About</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="#" className="nav-link">Contact</Link>
                                </li>
                            </ul>
                            <ul className="navbar-nav">
                                <div className="nav-item">
                                    <Link to="/login" className="nav-link">Login/Register</Link>
                                </div>
                            </ul>
                        </div>
                    </div>
                </nav>
                <Outlet />
                <div className="p-3 bg-primary text-white">
                    <h1 className="display-6 text-center">This is the footer.</h1>
                </div>
            </div>
        );
    }
}