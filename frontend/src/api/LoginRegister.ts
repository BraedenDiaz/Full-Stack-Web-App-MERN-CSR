import { API_ENDPOINT } from ".";

/**
 * @author Braeden Diaz
 * 
 * API for interacting with the server to perform user registration and login functionality.
 */

export const registerUser = async (username : string, password : string, csrfToken : any) : Promise<any> => {
    const newUser : object = {
        username: username,
        password: password
    };

    const response : Response = await fetch(`${API_ENDPOINT}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "XSRF-TOKEN": csrfToken
        },
        credentials: "include",
        body: JSON.stringify(newUser)
    });

    const responseMessage : object = {
        status: response.status,
        json: await response.json()
    };

    return responseMessage;
};

export const loginUser = async(username : string, password : string, csrfToken : any) : Promise<any> => {
    const userObj : object = {
        username : username,
        password : password
    };

    const response : Response = await fetch(`${API_ENDPOINT}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "XSRF-TOKEN": csrfToken
        },
        credentials: "include",
        body: JSON.stringify(userObj)
    });

    const responseMessage : object = {
        status: response.status,
        json: await response.json()
    };

    return responseMessage;
};