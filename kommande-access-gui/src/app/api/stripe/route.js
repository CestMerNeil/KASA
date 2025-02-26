import { NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
    try {
        const body = await request.json();
        const { lineItems } = body;

        if (!lineItems || !Array.isArray(lineItems) || lineItems.length === 0) {
            return NextResponse.json(
                { error: "Invalid request: lineItems is required and must be a non-empty array" },
                { status: 400 }
            );
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${request.headers.get("origin")}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${request.headers.get("origin")}/checkout/canceled`,
            metadata: {
                order_id: `order_${Date.now()}` // 可以添加更多元数据
            }
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error("Stripe checkout error:", error);
        return NextResponse.json(
            { error: error.message || "An error occurred during checkout" },
            { status: error.statusCode || 500 }
        );
    }
}

// 处理其他HTTP方法
export async function GET() {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function PUT() {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function DELETE() {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
} 