import React from "react";

export default class Login extends React.Component
{
    render()
    {
        return (
            <div className="container mt-3 mb-3">
                <h1>Login</h1>
                <form>
                    <div className="mb-3 mt-3">
                        <label htmlFor="loginUsername" className="form-label">Username:</label>
                        <input type="text" className="form-control" id="loginUsername" placeholder="Username" name="loginUsername" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="loginPassword" className="form-label">Password:</label>
                        <input type="password" className="form-control" id="loginPassword" placeholder="Password" name="loginPassword" />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        );
    }
}