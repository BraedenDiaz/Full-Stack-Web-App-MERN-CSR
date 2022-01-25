import { useUser } from "./Layout";

/**
 * @author Braeden Diaz
 * 
 * Functional component which represents the home page of the web app.
 */

export default function Home()
{
    const [user] = useUser();

    return (
        <div>
            <h1>Welcome to the Homepage {user ? user.username : "Guest"}!</h1>
        </div>
    );
}