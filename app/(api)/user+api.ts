import { neon } from '@neondatabase/serverless';

export async function POST(request: Request) {
  const sql = neon(`${process.env.DATABASE_URL}`);
  const { name, email, clerkId } = await request.json();

  try {
    if (!name || !email || !clerkId) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    const response = await sql`
    INSERT INTO users (
        name, 
        email,
        clerk_id
    )
        VALUES (
        ${name},
        ${email},
        ${clerkId}
        )
  `;

    return new Response(JSON.stringify({ data: response }), { status: 201 });
  } catch (err: any) {
    console.log(err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
