/**
 * @file        api/openai.js
 * @brief       OpenAI Chat API Route for Handling Chat Completions.
 * @details     This API route is no longer directly communicating with OpenAI.
 *              It forwards chat messages from the client to the backend, which then handles communication with OpenAI's API.
 * @returns     {JSON} - A JSON response containing the chat completion from the backend or an error message in case of failure.
 *****************************************************************
 * @route Details
 * - Accepts POST requests with an array of chat messages in the request body.
 * - Forwards the request to the backend's `/api/openai` route.
 * - On success, returns the generated response from the backend.
 * - On failure, returns a 500 status with an error message and details.
 *****************************************************************
 */

import { NextResponse } from "next/server";

export async function POST(req) {
    const body = await req.json();
    try {
        const res = await fetch("http://localhost:8080/api/openai", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (!res.ok) {
            throw new Error('Failed to fetch response from backend');
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: 'Something went wrong', details: error.message },
            { status: 500 }
        );
    }
}