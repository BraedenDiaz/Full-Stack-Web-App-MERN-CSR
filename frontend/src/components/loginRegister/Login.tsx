import { useState, useEffect } from "react";
import { API_ENDPOINT } from "../../api";
import { useContext } from "../Layout";
import { loginUser } from "../../api/LoginRegister";

type PropsType = {};

/**
 * @author Braeden Diaz
 * 
 * Functional component which represents the login form.
 */

export default function Login(props : PropsType)
{
    const setUser = useContext()[1];
    const [usernameValue, setUsername] = useState("");
    const [passwordValue, setPassword] = useState("");
    const csrfToken = useContext()[2];

    const handleChange = (event : any) => {
        switch (event.target.id)
        {
            case "loginUsername":
                setUsername(event.target.value);
                break;
            case "loginPassword":
                setPassword(event.target.value);
                break;
        }
    };

    const handleSubmit = (event : any) => {
        event.preventDefault();

        loginUser(usernameValue, passwordValue, csrfToken)
        .then(responseJSON => {
            console.log("Server Response to Login:");
            console.log(responseJSON);

            if (responseJSON.authenticated)
            {
                setUser({
                    authenticated: responseJSON.authenticated,
                    username: responseJSON.username
                });
            }
            
        });
    };

    return (
        <div className="container mt-3 mb-3">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="_csrf" value={csrfToken} />
                <div className="mb-3 mt-3">
                    <label htmlFor="loginUsername" className="form-label">Username:</label>
                    <input type="text"
                            id="loginUsername"
                            name="loginUsername"
                            className="form-control"
                            placeholder="Username"
                            onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="loginPassword" className="form-label">Password:</label>
                    <input type="password"
                            id="loginPassword"
                            name="loginPassword"
                            className="form-control"
                            placeholder="Password"
                            onChange={handleChange}  />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
}