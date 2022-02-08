import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"
import { getUser } from "../../api";
import { deleteAllComments, deleteComment, getComments, insertNewComment } from "../../api/Comments";
import { deleteForum, getForumByID } from "../../api/Forums";
import FileNotFound from "../errors/404";

export default function ForumPage()
{
    const [csrfToken, setCSRFToken] = useState("");
    const [comment, setComment] = useState("");
    const [user, setUser] = useState({
        authenticated: false,
        username: ""
    });
    const [error404, setError404] = useState(false);
    const [errorState, setErrorState] = useState({
        show: false,
        errorsArr: []
    });

    const navigate = useNavigate();
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
            _id: "",
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
        getUser()
        .then(responseJSON => {
            setUser(responseJSON);
        });

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

    const handleEditForum = async () => {
        navigate(`/forums/${forumID}/edit`);
    };

    const handleDeleteForum = async () => {
        const responseObj = await deleteForum(forumID!);

        if (responseObj.status !== 200)
        {
            console.log("Delete Forum Error: Response not status 200.");
        }
        else
        {
            navigate("/forums");
        }
    };

    const handleRemoveAllComments = async () => {
        const responseObj = await deleteAllComments(forumID!);

        if (responseObj.status !== 200)
        {
            console.log("Remove All Comments Error: Response status was not 200.");
        }
        else
        {
            getCommentsForForum();
        }
    };

    const handleRemoveComment = async (event : any) => {
        const removeCommentBtnID : string = event.target.id;
        const commentID : string = removeCommentBtnID.substring(removeCommentBtnID.lastIndexOf("_") + 1);

        const responseObj = await deleteComment(forumID!, commentID);

        if (responseObj.status !== 200)
        {
            console.log("Remove Comment Error: Response status was not 200.");
        }
        else
        {
            getCommentsForForum();
        }

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
                    {
                        user.authenticated && user.username === forumInfo.author.username ?
                            <div className="clearfix">
                                <button type="button" className="btn btn-danger float-end" data-bs-toggle="modal" data-bs-target="#deleteForumConfirmationModal">Delete Forum</button>
                                <button type="button" className="btn btn-info text-white float-end me-2" onClick={handleEditForum}>Edit Forum</button>
                            </div>

                        :
                            []
                    }
                    <p className="card-text">
                        <strong>Author:</strong> {forumInfo.author.username}
                    </p>
                    <p className="card-text">
                        <strong>Category:</strong> {forumInfo.category}
                    </p>
                    <p className="card-text">
                        {forumInfo.description}
                    </p>
                    {
                        user.authenticated && user.username === forumInfo.author.username ?
                            <div className="clearfix">
                                <button type="button" className="btn btn-secondary float-end" onClick={handleRemoveAllComments}>Remove All Comments</button>
                            </div>

                        :
                            []
                    }
                </div>
                <div className="card-footer text-center">
                    {forumInfo._id}
                </div>
            </div>
            {
                user.authenticated &&
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
            }
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
                                    {
                                        user.authenticated && (user.username === commentObj.author.username || user.username === forumInfo.author.username) ?
                                            <div className="clearfix">
                                                <button id={`removeCommentBtn_${commentObj._id}`} type="button" className="btn btn-danger float-end" onClick={handleRemoveComment}>Remove</button>
                                            </div>
                                        :
                                            []
                                    }
                                </div>
                            </div>
                        );
                    })
                }
            </div>
            <div id="deleteForumConfirmationModal" className="modal fade">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title">Delete Forum</h4>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                </div>
                                <div className="modal-body">
                                    <p>Are you sure you want to delete this forum and all of its comments? Once you do, there's no going back.</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger" onClick={handleDeleteForum} data-bs-dismiss="modal">Delete Forum</button>
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
        </div>
    )
}