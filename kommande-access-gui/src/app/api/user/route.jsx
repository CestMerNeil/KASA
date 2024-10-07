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