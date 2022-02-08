import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCategories, getCSRFToken, getForumByID, updateForum } from "../../api/Forums";
import FormError from "../errors/FormError";

export default function EditForumPage()
{
    const navigate = useNavigate();
    const [csrfToken, setCSRFToken] = useState("");
    const [forumTitle, setForumTitle] = useState("");
    const [forumCategory, setForumCategory] = useState("");
    const [forumDescription, setForumDescription] = useState("");
    const [categories, setCategories] = useState([""]);
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

    useEffect(() => {
        getCSRFToken()
        .then(responseJSON => {
            setCSRFToken(responseJSON.csrfToken)
        });

        getForumByID(forumID!)
        .then(responseObj => {
            if (responseObj.status === 200)
            {
                setForumInfo(responseObj.json);
                setForumTitle(responseObj.json.title);
                setForumCategory(responseObj.json.category);
                setForumDescription(responseObj.json.description);
            }
        });

        getCategories()
        .then(responseJSON => {
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

    const handleFormSubmit = async (event : any) => {
        event.preventDefault();

        const responseObj = await updateForum(forumID!, forumTitle, forumCategory, forumDescription, csrfToken);

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
            navigate(-1);
        }
    };

    return (
        <div className="container mt-4 mb-4">
            <FormError show={errorState.show} errorsArr={errorState.errorsArr} />
            <h1>Edit Forum</h1>
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
                            value={forumCategory}
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
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>
    );
}