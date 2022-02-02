import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getUser } from "../../api";
import { getCategories, getForums } from "../../api/Forums";

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
    const [user, setUser] = useState({
        authenticated: false,
        username: ""
    });

    const [categoryColorMap, setCategoryColorMap] = useState(Object);

    const [forums, setForums] = useState([
        {
            _id: -1,
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
    },  []);

    const handleCreateNewForumBtnClick = () => {
        setCreateNewForumBtnClicked(true);
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

        console.log();

        forumCards.push(
            (
                <div key={"card_" + forumObj._id}>
                    <div className="card border-secondary text-center">
                        <div className="card-header p-3 text-white" style={{backgroundColor: categoryColor}}>
                        </div>
                        <div className="card-body">
                            <h4 className="card-title">{forumObj.title}</h4>
                            <p className="card-text">{forumObj.description}</p>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">An item</li>
                            <li className="list-group-item">Category: {forumObj.category}</li>
                            <li className="list-group-item">A third item</li>
                        </ul>
                        <div className="card-footer" style={{backgroundColor: categoryColor}}>
                            {forumObj._id}
                        </div>
                    </div>
                </div>
            )
        )
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