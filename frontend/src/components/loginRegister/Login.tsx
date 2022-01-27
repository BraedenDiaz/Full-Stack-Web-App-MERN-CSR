import { useState } from "react";
import { useContext } from "../Layout";
import { loginUser } from "../../api/LoginRegister";
import FormError from "../errors/FormError";

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

    const [errorState, setErrorState] = useState({
        show: false,
        errorsArr: []
    });

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

    const handleSubmit = async (event : any) => {
        event.preventDefault();

        const responseObj = await loginUser(usernameValue, passwordValue, csrfToken);

        console.log("Server Response to Login:");
        console.log(responseObj);

        if (responseObj.status === 200)
        {
            if (responseObj.json.authenticated)
            {
                setUser({
                    authenticated: responseObj.json.authenticated,
                    username: responseObj.json.username
                });

                setErrorState({
                    show: false,
                    errorsArr: []
                });
            }
        }
        else
        {
            setErrorState({
                show: true,
                errorsArr: responseObj.json.errors.map((errorObj : any) => {
                    return errorObj.msg;
                })
            })
        }
        
    };

    return (
        <div className="container mt-3 mb-3">
            <FormError show={errorState.show} errorsArr={errorState.errorsArr} />
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