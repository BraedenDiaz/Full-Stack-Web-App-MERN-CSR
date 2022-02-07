import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getComments, insertNewComment } from "../../api/Comments";
import { getForumByID } from "../../api/Forums";
import FileNotFound from "../errors/404";

export default function ForumPage()
{
    const [csrfToken, setCSRFToken] = useState("");
    const [comment, setComment] = useState("");
    const [error404, setError404] = useState(false);
    const [errorState, setErrorState] = useState({
        show: false,
        errorsArr: []
    });

    const { forumID } = useParams();

    const [forumInfo, setForumInfo] = useState({
        _id: "",
        author: {
            _id: "",
            username: ""
        },
        title: "",
        category: "",
        description: ""
    });

    const [forumComments, setForumComments] = useState([
        {
            author: {
                username: ""
            },
            comment: ""
        }
    ]);

    const getCommentsForForum = () => {
        getComments(forumID!)
        .then(responseJSON => {
            setCSRFToken(responseJSON.csrfToken);
            setForumComments(responseJSON.result);
        });
    };

    useEffect(() => {
        getForumByID(forumID!)
        .then(responseObj => {
            if (responseObj.status === 404)
            {
                setError404(true);
            }
            else
            {
                setError404(false);
                setForumInfo(responseObj.json);
            }
        });

        getCommentsForForum();
    }, []);

    const handleCommentTextAreaChange = (event : any) => {
        setComment(event.target.value);
    };

    const handleAddCommentFormSubmit = (event : any) => {
        event.preventDefault();

        insertNewComment(forumID!, comment, csrfToken)
        .then(responseObj => {
            if (responseObj.status === 400)
            {
                setErrorState({
                    show: true,
                    errorsArr: responseObj.json.errors.map((errorObj : any) => {
                        return errorObj.msg;
                    })
                });
            }
            else
            {
                setErrorState({
                    show: false,
                    errorsArr: []
                });

                getCommentsForForum();
                setComment("");
            }
        })
    };

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
            <div className="card">
                <div className="card-header text-center h3">
                    {forumInfo.title}
                </div>
                <div className="card-body">
                    <p className="card-text">
                        <strong>Author:</strong> {forumInfo.author.username}
                    </p>
                    <p className="card-text">
                        <strong>Category:</strong> {forumInfo.category}
                    </p>
                    <p className="card-text">
                        {forumInfo.description}
                    </p>
                </div>
                <div className="card-footer text-center">
                    {forumInfo._id}
                </div>
            </div>
            <div className="clearfix">
                <form onSubmit={handleAddCommentFormSubmit}>
                    <textarea name="commentTextArea"
                            className="form-control mt-2"
                            rows={4}
                            onChange={handleCommentTextAreaChange}
                            value={comment}
                            placeholder="Enter a comment..."></textarea>
                    <button type="submit" className="btn btn-primary mt-1 float-end">Comment</button>
                </form>
            </div>
            <div className="mt-1">
                <p><strong>Comments:</strong></p>
                {
                    forumComments.map((commentObj, index) => {
                        return (
                            <div key={`${commentObj.author.username}_comment_${index}`} className="card mt-2">
                                <div className="card-body">
                                    <h4 className="card-title">
                                        {commentObj.author.username}
                                    </h4>
                                    <p className="card-text">
                                        {commentObj.comment}
                                    </p>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    )
}