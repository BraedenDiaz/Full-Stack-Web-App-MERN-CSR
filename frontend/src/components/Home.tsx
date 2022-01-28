
/**
 * @author Braeden Diaz
 * 
 * Functional component which represents the home page of the web app.
 */

import { useContext } from "./Layout";

export default function Home()
{
    const [user] = useContext();

    return (
        <div>
            <h1>Welcome to the Homepage {user.authenticated ? user.username : "Guest"}!</h1>
        </div>
    );
}