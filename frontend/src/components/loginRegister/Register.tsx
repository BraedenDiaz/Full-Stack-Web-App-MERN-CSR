import React from "react";

export default class Register extends React.Component
{
    render()
    {
        return (
            <div className="container mt-3 mb-3">
                <h1>Register</h1>
                <form>
                    <div className="mb-3 mt-3">
                        <label htmlFor="registerUsername" className="form-label">Username:</label>
                        <input type="text" className="form-control" id="registerUsername" placeholder="Username" name="registerUsername" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="registerPassword" className="form-label">Password:</label>
                        <input type="password" className="form-control" id="registerPassword" placeholder="Password" name="registerPassword" />
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
            </div>
        );
    }
}