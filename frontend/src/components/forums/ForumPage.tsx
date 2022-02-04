import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getForumByID } from "../../api/Forums";
import FileNotFound from "../errors/404";

export default function ForumPage()
{
    const [error404, setError404] = useState(false);
    const { forumID } = useParams();

    useEffect(() => {
        getForumByID(forumID!)
        .then(responseObj => {
            console.log("Response Obj:");
            console.log(responseObj);
            if (responseObj.status === 404)
            {
                setError404(true);
            }
            else
            {
                setError404(false);
            }
        });
    }, []);

    if (error404)
    {
        return (
            <div className="container mt-4 mb-4">
                <FileNotFound />
            </div>
        );
    }
    return (
        <div className="container mt-4 mb-4">
            <h1>Forum Page For Forum ID: {forumID}</h1>
        </div>
    )
}