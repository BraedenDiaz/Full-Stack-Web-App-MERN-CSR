import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserProfile, saveUserProfile } from "../../api/Users";
import ErrorUnauthorized from "../errors/403";
import FormError from "../errors/FormError";

export default function ProfilePage()
{
    const { username } = useParams();

    const [csrfToken, setCSRFToken] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [saveSuccessful, setSaveSuccess] = useState(false);
    const [errorState, setErrorState] = useState({
        show: false,
        errorsArr: []
    });

    const [user, setUser] = useState({
        authenticated: false,
        username: "",
        password: ""
    });
    useEffect(() => {
        getUserProfile(username!)
        .then(responseObj => {
            if (responseObj.status === 200)
            {
                setCSRFToken(responseObj.json.csrfToken);

                setUser({
                    authenticated: responseObj.json.authenticated,
                    username: responseObj.json.username,
                    password: responseObj.json.password
                });

                setNewUsername(responseObj.json.username);
                setNewPassword(responseObj.json.password);
            }
            else if (responseObj.status === 403)
            {
                setUser({
                    authenticated: responseObj.json.authenticated,
                    username: "",
                    password: ""
                });
            }
            else if (responseObj.status === 404)
            {
                console.log("404 Error: File Not Found.");
            }
        });
    }, [username]);

    const handleChange = (event : any) => {
        switch (event.target.id)
        {
            case "new-username":
                setNewUsername(event.target.value);
                break;
            case "new-password":
                setNewPassword(event.target.value);
                break;
        }
    };

    const handleSubmit = async(event : any) => {
        event.preventDefault();

        const responseObj = await saveUserProfile(username!, newUsername, newPassword, csrfToken);

        if (responseObj.status === 200)
        {
            setSaveSuccess(true);
            setErrorState({
                show: false,
                errorsArr: []
            });
        }
        else
        {
            setSaveSuccess(false);
            setErrorState({
                show: true,
                errorsArr: responseObj.json.errors.map((errorObj : any) => {
                    return errorObj.msg;
                })
            });
        }

    };

    if (!user.authenticated)
    {
        return <ErrorUnauthorized />;
    }

    return (
        <div className="container mt-3 mb-3">
            {
                saveSuccessful ?
                    <div className="alert alert-success">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                        </svg>
                        Profile saved successfully!
                    </div>
                :
                    <FormError show={errorState.show} errorsArr={errorState.errorsArr} />
            }
            <h1>Edit Profile</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 mt-3">
                    <label htmlFor="new-username" className="form-label">Username:</label>
                    <input type="text"
                            id="new-username"
                            name="new-username"
                            className="form-control"
                            placeholder="New Username"
                            value={newUsername}
                            onChange={handleChange} />
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="new-password" className="form-label">Password:</label>
                    <input type="text"
                            id="new-password"
                            name="new-password"
                            className="form-control"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>
    );
}