import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserProfile, saveUserProfile } from "../../api/Users";
import ErrorUnauthorized from "../errors/403";
import FormError from "../errors/FormError";

export default function ProfilePage()
{
    const { username } = useParams();

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

        const responseObj = await saveUserProfile(username!, newUsername, newPassword);

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
            { saveSuccessful ? <div className="alert alert-success">Profile saved successfully!</div> : <div></div>}
            <FormError show={errorState.show} errorsArr={errorState.errorsArr} />
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