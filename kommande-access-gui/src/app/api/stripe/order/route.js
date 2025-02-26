import { NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const sessionId = searchParams.get("session_id");

        if (!sessionId) {
            return NextResponse.json(
                { error: "Missing session_id parameter" },
                { status: 400 }
            );
        }

        // 从Stripe获取会话详情
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ["line_items", "payment_intent"],
        });

        if (!session) {
            return NextResponse.json(
                { error: "Session not found" },
                { status: 404 }
            );
        }

        // 格式化响应数据
        const orderData = {
            id: session.id,
            customer_email: session.customer_details?.email,
            amount_total: session.amount_total / 100, // 转换为美元
            currency: session.currency,
            payment_status: session.payment_status,
            created_at: new Date(session.created * 1000).toISOString(),
            items: session.line_items?.data.map(item => ({
                name: item.description,
                quantity: item.quantity,
                price: item.amount_total / 100 / item.quantity, // 单价
                total: item.amount_total / 100,
            })) || [],
            metadata: session.metadata,
        };

        return NextResponse.json(orderData);
    } catch (error) {
        console.error("Error retrieving order:", error);
        return NextResponse.json(
            { error: error.message || "Failed to retrieve order details" },
            { status: error.statusCode || 500 }
        );
    }
} 