/**
 * @file        api/user.js
 * @brief       User Authentication API Route for Login.
 * @details     This API route handles user login requests by verifying the provided username and password.
 *              The request is forwarded to an external mock API for validation, and the response is processed accordingly.
 *              If the login is successful, the token is returned to the client; otherwise, an error message is sent.
 *              The route ensures proper error handling and status code responses.
 * @returns     {JSON} - A JSON response containing the login status and token if successful, or an error message.
 *****************************************************************
 * @route Details
 * - Accepts POST requests containing `username` and `password` in the body.
 * - Forwards the request to an external API for user validation.
 * - On success, returns a 200 status with a success message and token.
 * - On failure, returns an appropriate status code and error message.
 * - Handles unexpected errors by returning a 500 status with a detailed error message.
 *****************************************************************
 */


import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { username, password } = await req.json();

        const res = await fetch('https://da60dbb1-af1a-4f29-a731-0ee1aed7521c.mock.pstmn.io/user_success', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!res.ok) {
            const errorData = await res.json();
            return NextResponse.json({ message: errorData.message }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json({ message: 'login successful', token: data.token }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: 'Something went wrong', details: error.message }, { status: 500 });
    }
}