import React from "react";
import Login from "./Login";
import Register from "./Register";

export default class LoginRegisterPage extends React.Component
{
    render()
    {
        return (
            <div className="container mt-3">
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a href="#loginForm" className="nav-link active" data-bs-toggle="tab">Login</a>
                    </li>
                    <li className="nav-item">
                        <a href="#registerForm" className="nav-link" data-bs-toggle="tab">Register</a>
                    </li>
                </ul>

                <div className="tab-content">
                    <div id="loginForm" className="tab-pane container active">
                        <Login />
                    </div>
                    <div id="registerForm" className="tab-pane container fade">
                        <Register />
                    </div>
                </div>
            </div>
        );
    }
}