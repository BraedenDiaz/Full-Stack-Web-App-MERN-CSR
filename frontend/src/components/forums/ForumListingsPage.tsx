import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../api";
import { deleteForum, getCategories, getForums } from "../../api/Forums";

/**
 * @author Braeden Diaz
 * 
 * Functional component which represents the forums page.
 * 
 * The forums page contains a listing of all the forums created by users.
 * 
 */

type PropsType = {
    alert: {
        show: boolean,
        type : string,
        message: string
    },
    setAlert : Dispatch<SetStateAction<{ show: boolean; type: string; message: string; }>>
};

export default function ForumListingsPage(props : PropsType)
{
    const navigate = useNavigate();
    const [refresh, setRefresh] = useState(false);
    const [user, setUser] = useState({
        authenticated: false,
        username: ""
    });

    const [categoryColorMap, setCategoryColorMap] = useState(Object);

    const [forums, setForums] = useState([
        {
            _id: "",
            author: {
                _id: "",
                username: ""
            },
            title: "",
            category: "",
            description: ""
        }
    ]);

    useEffect(() => {
        getUser()
        .then(responseJSON => {
            setUser(responseJSON);
        });

        getCategories()
        .then(responseJSON => {
            setCategoryColorMap(Object.fromEntries(responseJSON));
        });

        getForums()
        .then(responseJSON => {
            setForums(responseJSON);
        });
    },  [refresh]);

    const handleCreateNewForumBtnClick = () => {
        navigate("/forums/create");
    };

    const handleEditForum = async (event : any) => {
        const editForumBtnID : string = event.target.id;
        const forumID : string = editForumBtnID.substring(editForumBtnID.lastIndexOf("_") + 1);
        navigate(`/forums/${forumID}/edit`);
    };

    const handleDeleteForum = async (event : any) => {
        const deleteForumBtnID : string = event.target.id;
        const forumID : string = deleteForumBtnID.substring(deleteForumBtnID.lastIndexOf("_") + 1);

        const responseObj = await deleteForum(forumID);

        if (responseObj.status !== 200)
        {
            console.log("Delete Forum Error: Response not status 200.");
        }
        else
        {
            props.setAlert({
                show: true,
                type: "success",
                message: "Forum Deleted Successfully!"
            });
            setRefresh(true);
        }
    };

    const handleAlertClose = () => {
        props.setAlert({
            show: false,
            type: "success",
            message: ""
        });
    };

    const handleEnterForum = (event : any) => {
        const enterForumBtnID : string = event.target.id;
        const forumID : string = enterForumBtnID.substring(enterForumBtnID.lastIndexOf("_") + 1);
        navigate(`/forums/${forumID}`);
    };

    const shortenDescription = (description : string) => {
        let newDescription = description;

        if (description.length >= 35)
        {
            newDescription = newDescription.substring(0, 32);
            newDescription += "...";
        }

        return newDescription;
    };

    const forumCards = [];
    
    // Build the JSX HTML forum card for each forum
    for (let forumObj of forums)
    {
        // Remove spaces from the category name
        const convertedCategory = forumObj.category.replace(/\s/g, "");
        // Get the corresponding category color from the color map
        const categoryColor = categoryColorMap[convertedCategory];

        let userIsForumAuthor = false;

        if (user.authenticated && user.username === forumObj.author.username)
        {
            userIsForumAuthor = true;
        }

        forumCards.push(
            (
                <div key={"card_" + forumObj._id}>
                    <div className="card border-secondary text-center">
                        <div className="card-header p-3 text-white" style={{backgroundColor: categoryColor}}>
                            {
                                userIsForumAuthor ?
                                    "You Are the Author of this Forum"
                                :
                                    ""
                            }
                        </div>
                        <div className="card-body">
                            <h4 className="card-title">{forumObj.title}</h4>
                            <p className="card-text">{shortenDescription(forumObj.description)}</p>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Author: {forumObj.author.username}</li>
                            <li className="list-group-item">Category: {forumObj.category}</li>
                            <li className="list-group-item">
                                <button id={`enterForumBtn_${forumObj._id}`} type="button" className="btn btn-success" onClick={handleEnterForum}>Enter Forum</button>
                            </li>
                            {
                                userIsForumAuthor ?
                                    <li className="list-group-item">
                                        <button id={`enterForumBtn_${forumObj._id}`} type="button" className="btn btn-info text-white me-2" onClick={handleEditForum}>Edit Forum</button>
                                        <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target={"#deleteForumConfirmationModal_" + forumObj._id}>Delete Forum</button>
                                    </li>
                                :
                                    []
                            }
                        </ul>
                        <div className="card-footer" style={{backgroundColor: categoryColor}}>
                            {forumObj._id}
                        </div>
                    </div>
                    <div id={"deleteForumConfirmationModal_" + forumObj._id} className="modal fade">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title">Delete Forum</h4>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                </div>
                                <div className="modal-body">
                                    <p>Are you sure you want to delete this forum? Once you do, there's no going back.</p>
                                </div>
                                <div className="modal-footer">
                                    <button id={"deleteForumBtn_" + forumObj._id} type="button" className="btn btn-danger" onClick={handleDeleteForum} data-bs-dismiss="modal">Delete Forum</button>
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>    
            )
        );
    }

    //const forumRowCols = [];

    // Deprecated: Bootstrap provides an easy way to do this for us.
    // Place our forum cards in a new row after every 4 cards
    // for (let i = 0; i < forumCards.length; i += 4)
    // {
    //     forumRowCols.push((
    //         <div key={"row_" + i} className="row m-4">
    //             {
    //                 forumCards.filter((jsxElem, index) => {
    //                     return (index < i + 4 && index >= i);
    //                 })
    //             }
    //         </div>
    //     ));
    // }

    return (
        <div className="container mt-4 mb-4">
            {
                props.alert.show ?
                    <div className={`alert alert-${props.alert.type} alert-dismissible fade show`}>
                        <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={handleAlertClose}></button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                        </svg>
                        {props.alert.message}
                    </div>
                :
                    []
                
            }
            <div className="clearfix mb-4">
                <span className="h1">Forums</span>
                { user.authenticated ? <button type="button" className="btn btn-success float-end" onClick={handleCreateNewForumBtnClick}>Create New Forum</button>
                : []}
            </div>
            
            <div className="row row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-sm-1 g-4">
                {forumCards}
            </div>
        </div>
    );
}