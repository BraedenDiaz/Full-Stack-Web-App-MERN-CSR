import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../Layout";
import Login from "./Login";
import Register from "./Register";

/**
 * @author Braeden Diaz
 * 
 * Functional component which is the parent container for the registration and login components.
 */

export default function LoginRegisterPage()
{ 
    const [user] = useUser();
    const [activeTab, setActiveTab] = useState("login");

    const handleTabChange = (newTab : string) => {
        setActiveTab(newTab);
    };

    if (user)
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
                    <a href="#registerForm" onClick={() => setActiveTab("register")} className={activeTab === "register" ? "nav-link active" : "nav-link"}data-bs-toggle="tab">Register</a>
                </li>
            </ul>

            <div className="tab-content">
                <div id="loginForm" className={activeTab === "login" ? "tab-pane container active" : "tab-pane container fade"}>
                    <Login />
                </div>
                <div id="registerForm" className={activeTab === "register" ? "tab-pane container active" : "tab-pane container fade"}>
                    <Register setActiveTab={handleTabChange} />
                </div>
            </div>
        </div>
    );
}