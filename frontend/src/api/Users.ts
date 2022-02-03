import { API_ENDPOINT } from ".";

export const getUserProfile = async (username : string) => {
    const response = await fetch(`${API_ENDPOINT}/users/${username}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    });
    
    const responseJSON = await response.json();

    return {
        status: response.status,
        json: responseJSON
    };
};

export const saveUserProfile = async (username : string, newUsername : string, newPassword : string, csrfToken : any) => {
    const response = await fetch(`${API_ENDPOINT}/users/${username}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "XSRF-TOKEN": csrfToken
        },
        credentials: "include",
        body: JSON.stringify({
            newUsername: newUsername,
            newPassword: newPassword
        })
    });
    const responseJSON = await response.json();

    return {
        status: response.status,
        json: responseJSON
    };
};

export const deleteUserAccount = async (username : string) => {
    const response = await fetch(`${API_ENDPOINT}/users/${username}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    });
    const responseJSON = await response.json();

    return {
        status: response.status,
        json: responseJSON
    };
};