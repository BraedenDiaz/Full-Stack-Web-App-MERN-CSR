import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../api";
import { getCategories, getCSRFToken, insertNewForum } from "../../api/Forums";
import ErrorUnauthorized from "../errors/403";
import FileNotFound from "../errors/404";
import FormError from "../errors/FormError";

/**
 * @author Braeden Diaz
 * 
 * Functional component which represents a form allowing users to create
 * new forums on the website.
 * 
 */

 type PropsType = {
    isLoggingOut: boolean,
    alert: {
        show: boolean,
        type : string,
        message: string
    },
    setAlert : Dispatch<SetStateAction<{ show: boolean; type: string; message: string; }>>
};

export default function CreateNewForum(props : PropsType)
{
    const navigate = useNavigate();
    const [user, setUser] = useState({
        authenticated: false,
    });
    const [csrfToken, setCSRFToken] = useState("");
    const [forumTitle, setForumTitle] = useState("");
    const [forumCategory, setForumCategory] = useState("");
    const [forumDescription, setForumDescription] = useState("");
    const [categories, setCategories] = useState([""]);

    const [error404, setError404] = useState(false);
    const [error403, setError403] = useState(false);
    const [errorState, setErrorState] = useState({
        show: false,
        errorsArr: []
    });

    useEffect(() => {
        if (props.isLoggingOut)
        {
            navigate("/");
        }
    }, [props.isLoggingOut]);

    useEffect(() => {
        getUser()
        .then(responseJSON => {
            setUser(responseJSON);
        });
        
        getCSRFToken()
        .then(responseJSON => {
            setCSRFToken(responseJSON.csrfToken)
        });

        getCategories()
        .then(responseJSON => {
            // We get back an array of key-value pair arrays where the key is the category
            // name and the value is the category color. On this page, we only want the name,
            // so we convert them into their own array and set our component's state.
            //
            // It's also good to note that we use an Object instead of a Map since the keys for
            // an object can only have a string type whereas the keys for a Map can have any type.
            const categoryNames : string[] = Object.keys(Object.fromEntries(responseJSON));
            setCategories(categoryNames);
        });
    }, []);

    const handleChange = (event : any) => {
        switch (event.target.name)
        {
            case "forumTitle":
                setForumTitle(event.target.value);
                break;
            case "forumCategory":
                setForumCategory(event.target.value);
                break;
            case "forumDescription":
                setForumDescription(event.target.value);
                break;
        }
    };

    const handleFormSubmit = (event : any) => {
        event.preventDefault();

        

        insertNewForum(forumTitle, forumCategory, forumDescription, csrfToken)
        .then(responseObj => {
            if (responseObj.status === 200)
            {
                props.setAlert({
                    show: true,
                    type: "success",
                    message: "Forum Created Successfully!"
                });
                navigate("/forums");
            }
            else if (responseObj.status === 400)
            {
                setErrorState({
                    show: true,
                    errorsArr: responseObj.json.errors.map((errorObj : any) => {
                        return errorObj.msg;
                    })
                });
            }
            else if (responseObj.status === 403)
            {
                setError403(true);
            }
            else if (responseObj.status === 404)
            {
                setError404(true);
            }
        });
    };
  
    if (error404)
    {
        return <FileNotFound />;
    }
    else if (error403)
    {
        return <ErrorUnauthorized />;
    }

    if (!user.authenticated)
    {
        return <ErrorUnauthorized />;
    }

    return (
        <div className="container mt-4 mb-4">
            <FormError show={errorState.show} errorsArr={errorState.errorsArr} />
            <h1>Create New Forum</h1>
            <form onSubmit={handleFormSubmit}>
                <div className="form-floating mb-3 mt-3">
                    <input type="text"
                            id="forumTitle"
                            name="forumTitle"
                            className="form-control"
                            placeholder="Forum Title"
                            value={forumTitle}
                            onChange={handleChange} />
                    <label htmlFor="forumTitle">Forum Title</label>
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="forumCategory" className="form-label">Forum Category:</label>
                    <select id="forumCategory"
                            name="forumCategory"
                            className="form-select"
                            defaultValue={forumCategory}
                            onChange={handleChange}>
                        <option value="" disabled>Select a forum category...</option>
                        {categories.map(category => <option key={"category_" + category} value={category}>{category}</option>)}
                    </select>
                </div>
                <div className="mb-3 mt-3">
                    <textarea name="forumDescription"
                              className="form-control"
                              rows={10}
                              onChange={handleChange}
                              value={forumDescription}
                              placeholder="Enter a description for your new forum."></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Create</button>
            </form>
        </div>
    );
}