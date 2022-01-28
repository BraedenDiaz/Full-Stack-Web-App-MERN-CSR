
/**
 * @author Braeden Diaz
 * 
 * Simple export of the main API server (web server) endpoint.
 */
export const API_ENDPOINT = "http://localhost:8080";

export async function getUser()
{
    const response = await fetch(`${API_ENDPOINT}/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    });

    const responseJSON = await response.json();
    return responseJSON;
}