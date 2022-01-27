import { useState } from "react";
import FormError from "../errors/FormError";
import { registerUser } from "../../api/LoginRegister";
import { useContext } from "../Layout";

type PropsType = {
    setActiveTab: (arg : string) => void
};

/**
 * @author Braeden Diaz
 * 
 * Functional component which represents the registration form.
 */

export default function Register(props : PropsType)
{
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
            case "registerUsername":
                setUsername(event.target.value);
                break;
            case "registerPassword":
                setPassword(event.target.value);
                break;
        }
    };

    const handleSubmit = async (event : any) => {
        event.preventDefault();

        const responseObj = await registerUser(usernameValue, passwordValue, csrfToken);
        console.log("Server Response to Register:");
        console.log(responseObj);

        if (responseObj.status === 201)
        {
            props.setActiveTab("login");

            setErrorState({
                show: false,
                errorsArr: []
            });
        }
        else
        {
            setErrorState({
                show: true,
                errorsArr: responseObj.json.errors.map((errorObj : any) => {
                    return errorObj.msg;
                })
            });
        }
    };

    return (
        <div className="container mt-3 mb-3">
            <FormError show={errorState.show} errorsArr={errorState.errorsArr} />
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="_csrf" value={csrfToken} />
                <div className="mb-3 mt-3">
                    <label htmlFor="registerUsername" className="form-label">Username:</label>
                    <input type="text"
                            id="registerUsername"
                            name="registerUsername"
                            className="form-control"
                            placeholder="Username"
                            onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="registerPassword" className="form-label">Password:</label>
                    <input type="password"
                           id="registerPassword"
                           name="registerPassword"
                           className="form-control"
                           placeholder="Password"
                           onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
}