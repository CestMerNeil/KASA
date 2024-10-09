/**
 * @file        api/openai.js
 * @brief       OpenAI Chat API Route for Handling Chat Completions.
 * @details     This API route sends chat messages to the OpenAI API and retrieves responses using the GPT-3.5-turbo model.
 *              It accepts a request body containing the message history, forwards it to the OpenAI API, and returns the generated response.
 *              Proper error handling is included to manage issues with the request or response from the OpenAI API.
 * @returns     {JSON} - A JSON response containing the chat completion from OpenAI or an error message in case of failure.
 *****************************************************************
 * @route Details
 * - Accepts POST requests with an array of chat messages in the request body.
 * - Sends the chat messages to OpenAI's GPT-3.5-turbo model for completion.
 * - Uses the API key stored in the environment variables for authorization.
 * - On success, returns the generated response from OpenAI.
 * - On failure, returns a 500 status with an error message and details.
 *****************************************************************
 */


import { NextResponse } from "next/server";

export async function POST(req) {
    const body = await req.json();
    try {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: body,
            }),
        });

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Something went wrong', details: error.message }, { status: 500 });
    }

}