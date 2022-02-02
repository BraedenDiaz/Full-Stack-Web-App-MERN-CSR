import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
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

export default function ForumsPage()
{
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
    let [createNewForumBtnClicked, setCreateNewForumBtnClicked] = useState(false);

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
        setCreateNewForumBtnClicked(true);
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
            setRefresh(true);
        }
    };

    if (createNewForumBtnClicked)
    {
        
        return <Navigate to="/forums/create" />;
    }

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
                    <div>
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
                                <p className="card-text">{forumObj.description}</p>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Author: {forumObj.author.username}</li>
                                <li className="list-group-item">Category: {forumObj.category}</li>
                                {
                                    userIsForumAuthor ?
                                    <li className="list-group-item">
                                        <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteForumConfirmationModal">Delete Forum</button>
                                    </li>
                                    :
                                        []
                                }
                            </ul>
                            <div className="card-footer" style={{backgroundColor: categoryColor}}>
                                {forumObj._id}
                            </div>
                        </div>
                    </div>
                    <div id="deleteForumConfirmationModal" className="modal fade">
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