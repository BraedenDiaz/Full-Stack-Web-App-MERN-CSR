import React, { useState, useEffect } from "react";
import { Outlet, Link, useOutletContext } from "react-router-dom";

import { API_ENDPOINT, getUser } from "../api/index";

type PropsType = {
    isLoggingOut: boolean,
    setIsLoggingOut: React.Dispatch<React.SetStateAction<boolean>>
};

type User = { authenticated: boolean, username: string };
type ContextType = [User, () => void];

/**
 * @author Braeden Diaz
 * 
 * Functional component which represents the layout for the web app. E.g. the header,
 * navigation bar, and footer.
 * 
 * This component is also the root parent container component for most other components within
 * the web app. Therefore, this component also contains user state once the user is looged in which
 * all other components can access for dynamic rendering. 
 */

export default function Layout(props : PropsType)
{
    const [user, setUser] = useState<User>({
        authenticated: false,
        username: ""
    });

    const refreshUserInfo = () => {
        getUser()
        .then(responseJSON => {
            if (responseJSON.authenticated)
            {
                props.setIsLoggingOut(false);
            }
            
            setUser({
                authenticated: responseJSON.authenticated,
                username: responseJSON.username
            });
        });
    };

    useEffect(refreshUserInfo);

    const handleLogout = () => {
        fetch(`${API_ENDPOINT}/logout`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        })
        .then(response => {
            if (response.status !== 200)
            {
                console.log("Logout failed.");
            }
            else
            {
                setUser({
                    authenticated: false,
                    username: ""
                });
                props.setIsLoggingOut(true);
            }
        });
    };

    return (
        <div>
            <div className="p-5 bg-primary text-white">
                <h1 className="display-2 text-center">Web of Forums</h1>
            </div>
            <div className="offcanvas offcanvas-end" id="sidebar">
                <div className="offcanvas-header">
                    <div>
                        <h1 className="offcanvas-title">{user.username}</h1>
                        <Link to={`/users/${user.username}`}>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="offcanvas">Profile</button>
                        </Link>
                    </div>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas"></button>
                </div>
                <div className="offcanvas-body">
                    <p>Profile information.</p>
                    <button className="btn btn-secondary" type="button" data-bs-dismiss="offcanvas" onClick={handleLogout}>Logout</button>
                </div>
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
                                <Link to="/forums" className="nav-link">Forums</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/about" className="nav-link">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="contact" className="nav-link">Contact</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            <div className="nav-item">
                                {user.authenticated ?
                                    <button className="btn nav-link" data-bs-toggle="offcanvas" data-bs-target="#sidebar">
                                        {user.username}
                                    </button>
                                :   <Link to="/login" className="nav-link">Login/Register</Link>}
                                
                            </div>
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet context={[user, refreshUserInfo]} />
        </div>
    );
}

export function useContext()
{
    return useOutletContext<ContextType>();
}