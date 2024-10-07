export async function GET() {
    try {
        const response = await fetch("https://da60dbb1-af1a-4f29-a731-0ee1aed7521c.mock.pstmn.io/data");
        const data = await response.json();
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}