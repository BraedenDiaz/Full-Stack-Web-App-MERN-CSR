import { API_ENDPOINT } from ".";

export const insertNewForum = async (forumTitle : string, forumCategory : string, forumDescription : string) => {
    const response = await fetch(`${API_ENDPOINT}/forums/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            forumTitle: forumTitle,
            forumCategory: forumCategory,
            forumDescription: forumDescription
        })
    });

    return response.status;
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