/*

import {NextApiRequest, NextApiResponse} from "next";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req = NextApiRequest, res = NextApiResponse) {
    if (req.method === "POST") {
        try {
            const {lineItems} = req.body;
            const session = await stripe.chechout.sessions.create({
                payment_method_types: ["card"],
                line_items: lineItems,
                mode: "payment",
                success_url: `${req.headers.origin}/?success=true`,
                cancel_url: `${req.headers.origin}/?canceled=true`,
            });
            res.status(200).json({url: session.url});
        } catch (error) {
            res.status(err.statusCode || 500).json(error.message);
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end("Method Not Allowed");
    }
}


*/