import AccountPage from "./AccountPage";
import ProfilePage from "./ProfilePage";

export default function UserAccountPage()
{
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