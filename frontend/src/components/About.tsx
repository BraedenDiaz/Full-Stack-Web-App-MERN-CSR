
export default function AboutPage()
{
    return (
        <div className="container mt-4">
            <h1>About</h1>
            <div className="mt-4">
                <h2>The Stack (MERN)</h2>
                <p className="lead fs-4">This web app uses the following stack.</p>
                <h4>Front-End</h4>
                <ul className="lead">
                    <li>HTML</li>
                    <li>CSS</li>
                    <li>Bootstrap 5</li>
                    <li>TypeScript/JavaScript</li>
                    <li>React</li>
                    <li>React Router</li>
                </ul>

                <h4>Back-End</h4>
                <ul className="lead">
                    <li>ExpressJS/NodeJS</li>
                    <li>TypeScript/JavaScript</li>
                    <li>Mongoose (for MongoDB)</li>
                </ul>
            </div>
        </div>
    );
}