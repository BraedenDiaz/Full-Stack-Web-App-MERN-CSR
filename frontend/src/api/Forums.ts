import { API_ENDPOINT } from ".";

export const getCSRFToken = async () => {
    const response = await fetch(`${API_ENDPOINT}/forums/create`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    });

    const responseJSON = await response.json();

    return responseJSON;
};

export const insertNewForum = async (forumTitle : string, forumCategory : string, forumDescription : string, csrfToken : any) => {
    const response = await fetch(`${API_ENDPOINT}/forums/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "XSRF-TOKEN": csrfToken
        },
        credentials: "include",
        body: JSON.stringify({
            forumTitle: forumTitle,
            forumCategory: forumCategory,
            forumDescription: forumDescription
        })
    });

    const responseJSON = await response.json();
    const responseObj = {
        status: response.status,
        json: responseJSON
    };

    return responseObj;
};

export const getForums = async () => {
    const response = await fetch(`${API_ENDPOINT}/forums`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    });

    const responseJSON = await response.json();

    return responseJSON;
};

export const getCategories = async () => {
    const response = await fetch(`${API_ENDPOINT}/forums/categories`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    });

    const responseJSON = await response.json();

    return responseJSON;
};

export const deleteForum = async (forumID : string) => {
    const response = await fetch(`${API_ENDPOINT}/forums/${forumID}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    });

    const responseObj = {
        status: response.status,
        json: await response.json()
    };

    return responseObj;
};

export const getForumByID = async (forumID : string) => {
    const response = await fetch(`${API_ENDPOINT}/forums/${forumID}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    });

    const responseObj = {
        status: response.status,
        json: await response.json()
    };
    
    return responseObj;
}