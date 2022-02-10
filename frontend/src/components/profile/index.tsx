import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../api";
import ErrorUnauthorized from "../errors/403";
import AccountPage from "./AccountPage";
import ProfilePage from "./ProfilePage";

type PropsType = {
    isLoggingOut: boolean,
};

export default function UserAccountPage(props : PropsType)
{
    const navigate = useNavigate();

    const [user, setUser] = useState({
        authenticated: false,
    });

    useEffect(() => {
        if (props.isLoggingOut)
        {
            navigate("/");
        }
    });

    useEffect(() => {
        getUser()
        .then(responseJSON => {
            setUser(responseJSON);
        });
    }, []);

    if (!user.authenticated)
    {
        return <ErrorUnauthorized />;
    }
 

    return (
        <div className="container mt-3">
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a href="#profilePage" className="nav-link active" data-bs-toggle="tab">Profile</a>
                </li>
                <li className="nav-item">
                    <a href="#accountPage" className="nav-link" data-bs-toggle="tab">Account</a>
                </li>
            </ul>

            <div className="tab-content">
                <div id="profilePage" className="tab-pane container active">
                    <ProfilePage />
                </div>
                <div id="accountPage" className="tab-pane container fade">
                    <AccountPage />
                </div>
            </div>
        </div>
    )
}