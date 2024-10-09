/**
 * @file        api/data.js
 * @brief       API Route for Fetching Product Data.
 * @details     This API route fetches product data from an external mock API and returns it in JSON format to the client.
 *              The response contains the product details and handles any errors encountered during the fetch operation.
 *              On successful fetch, the product data is returned with a 200 status; on failure, a 500 status with an error message is provided.
 * @returns     {JSON} - A JSON response containing the fetched product data or an error message.
 *****************************************************************
 * @route Details
 * - Handles GET requests to fetch product data from a mock API.
 * - On success, returns the product data with a status of 200.
 * - On failure, returns a 500 status with an error message.
 *****************************************************************
 */


export async function GET() {
    try {
        const response = await fetch("https://da60dbb1-af1a-4f29-a731-0ee1aed7521c.mock.pstmn.io/data");
        const data = await response.json();
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}