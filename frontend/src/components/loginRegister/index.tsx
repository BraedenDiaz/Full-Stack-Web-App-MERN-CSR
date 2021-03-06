import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { API_ENDPOINT } from "../../api";
import { useContext } from "../Layout";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

/**
 * @author Braeden Diaz
 * 
 * Functional component which is the parent container for the registration and login components.
 */

export default function LoginRegisterContainer()
{ 
    const [user] = useContext();

    const [csrfToken, setCSRFToken] = useState("");
    useEffect(() => {
        fetch(`${API_ENDPOINT}/login`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        .then(response => response.json())
        .then(responseJSON => {
            setCSRFToken(responseJSON.csrfToken);
        });
    }, []);

    const [activeTab, setActiveTab] = useState("login");
    const handleTabChange = (newTab : string) => {
        setActiveTab(newTab);
    };

    if (user.authenticated)
    {
        return <Navigate to="/" />;
    }

    return (
        <div className="container mt-3">
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a href="#loginForm" onClick={() => setActiveTab("login")} className={activeTab === "login" ? "nav-link active" : "nav-link"} data-bs-toggle="tab">Login</a>
                </li>
                <li className="nav-item">
                    <a href="#registerForm" onClick={() => setActiveTab("register")} className={activeTab === "register" ? "nav-link active" : "nav-link"} data-bs-toggle="tab">Register</a>
                </li>
            </ul>

            <div className="tab-content">
                <div id="loginForm" className={activeTab === "login" ? "tab-pane container active" : "tab-pane container fade"}>
                    <LoginPage csrfToken={csrfToken} />
                </div>
                <div id="registerForm" className={activeTab === "register" ? "tab-pane container active" : "tab-pane container fade"}>
                    <RegisterPage setActiveTab={handleTabChange} csrfToken={csrfToken} />
                </div>
            </div>
        </div>
    );
}