
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
        <div className="container mt-4">
            <h1>Welcome to the Homepage {user.authenticated ? user.username : "Guest"}!</h1>
            <div className="mt-4">
                <h2>Project</h2>
                <p className="lead lh-lg fs-4">
                    The goal of this project was to create a website as an example of an implementation of a
                    full-stack web application using the MERN stack.
                </p>
            </div>
            <div className="mt-4">
                <h2>The Web App</h2>
                <p className="lead lh-lg fs-4">
                    As for the website, it represents a forum-based website where users
                    can create their own discussion forums about a topic of their choosing such
                    that other users can come in and dsicuss that topic.
                </p>
                <p className="lead lh-lg fs-4">
                    With that said, this website is a "toy site" in that it isn't meant to be a website used in production. Instead, it
                    was created to help me as the web developer practice and showcase my full-stack web development skills along with my
                    experience specifically in the MERN stack.
                </p>
                <p className="lead lh-lg fs-4">
                    Nevertheless, although the website isn't intended for production-level use, I still developed it with the assumption that
                    it could be a production level website and so I still implemented code and features that would support this possibility. 
                    Some examples of this include the implementation of a RESTful API, secure handling of user session cookies and storage, and many other
                    various security measures to protect against attacks that are common against production-level web apps including Cross-Site-Scripting
                    (XSS) attacks, Cross-Site Request Forgery (CSRF) attacks, HTTP header pollution, etc.
                </p>
            </div>
        </div>
    );
}