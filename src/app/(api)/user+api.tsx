import { client } from "@/src/config/NilePostgresConfig";

export async function POST(request: Request) {
  const { firstName, lastName, email } = await request.json();

  await client.connect();
  const result = await client.query(
    `INSERT INTO USERS VALUES(DEFAULT, '${firstName}', '${lastName}', '${email}')`
  );
  await client.end();
  if (result.rowCount === 0) {
    return new Response("Error inserting user", { status: 500 });
  }

  return Response.json(result);
}

export async function GET(request: Request) {
  const email = new URL(request.url).searchParams.get("email");
  try {
    await client.connect();
    const result = await client.query(
      `SELECT * FROM USERS WHERE email = '${email}'`
    );
    await client.end();
    return Response.json(result.rows[0]);
  } catch (e) {
    return Response.json({ error: e });
  }
}
