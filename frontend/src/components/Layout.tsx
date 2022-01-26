import React, { useState, useEffect } from "react";
import { Outlet, Link, useOutletContext } from "react-router-dom";

import { API_ENDPOINT } from "../api/index";

type PropsType = object;
type User = { authenticated: boolean, username: string };
type ContextType = [  (User | null), React.Dispatch<React.SetStateAction<User | null>>, string ];

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
    // Top-Level state that will be shared with all child components
    const [user, setUser] = useState<User | null>(null);
    const [csrfToken, setCSRFToken] = useState("");

    // Effect which runs on every render that check with the
    // server to see if the user is still authenticated.
    //
    // This is needed because this layout is re-rendered on multiple
    // routes for the website.
    useEffect(() => {
        fetch(`${API_ENDPOINT}/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        .then(responseMessage => responseMessage.json())
        .then(responseJSON => {
            console.log("Response to Layout:");
            console.log(responseJSON);

            const { authenticated, csrfToken, username } = responseJSON;

            setCSRFToken(csrfToken);

            if (authenticated)
            {
                setUser({
                    authenticated: authenticated,
                    username: username 
                });
            }
        });
    }, []);

    const handleLogout = () => {
        fetch(`${API_ENDPOINT}/logout`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "XSRF-TOKEN": csrfToken
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
                setUser(null);
                console.log("Logout succeeded!");
            }
        });
    };

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
                                {user?.authenticated ?
                                    <button onClick={handleLogout} className="btn nav-link">Logout</button>
                                :   <Link to="/login" className="nav-link">Login/Register</Link>}
                                
                            </div>
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet context={[user, setUser, csrfToken]} />
            <div className="p-3 bg-primary text-white">
                <h1 className="display-6 text-center">This is the footer.</h1>
            </div>
        </div>
    );
}

export function useContext()
{
    return useOutletContext<ContextType>();
}