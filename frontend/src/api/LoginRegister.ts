import { API_ENDPOINT } from ".";

export const registerUser = async (username : string, password : string) : Promise<any> => {
    const newUser : Object = {
        username: username,
        password: password
    };

    const response : Promise<Response> = fetch(`${API_ENDPOINT}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
    });

    const responseText = (await response).json();

    return responseText;
};