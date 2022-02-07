import { API_ENDPOINT } from ".";

export const getComments= async (forumID : string) => {
    const response = await fetch(`${API_ENDPOINT}/forums/${forumID}/comments`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    });

    const responseJSON = await response.json();

    return responseJSON;
};

export const insertNewComment = async (forumID : string, comment : string, csrfToken : string) => {
    const response = await fetch(`${API_ENDPOINT}/forums/${forumID}/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "XSRF-TOKEN": csrfToken
        },
        credentials: "include",
        body: JSON.stringify({
            comment: comment
        })
    });

    const responseObj = {
        status: response.status,
        json: await response.json()
    };

    return responseObj;
};

export const deleteAllComments = async (forumID : string) => {
    const response = await fetch(`${API_ENDPOINT}/forums/${forumID}/comments`, {
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

export const deleteComment = async (forumID : string, commentID : string) => {
    const response = await fetch(`${API_ENDPOINT}/forums/${forumID}/comments/${commentID}`, {
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