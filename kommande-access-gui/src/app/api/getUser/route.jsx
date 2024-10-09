/**
 * @file        api/getUser.js
 * @brief       API Route for Fetching User Data.
 * @details     This API route fetches user data from a mock external API and returns it to the client.
 *              The response is formatted as JSON and includes error handling in case of network or API issues.
 *              On success, the user data is returned with a 200 status; on failure, a 500 status with an error message is returned.
 * @returns     {JSON} - A JSON response containing the fetched user data or an error message.
 *****************************************************************
 * @route Details
 * - Handles GET requests to fetch user data from a mock API.
 * - On success, returns the user data with a status of 200.
 * - On failure, returns a 500 status with an error message.
 *****************************************************************
 */


export async function GET() {
    try {
        const response = await fetch("https://da60dbb1-af1a-4f29-a731-0ee1aed7521c.mock.pstmn.io/getUser");
        const data = await response.json();
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}