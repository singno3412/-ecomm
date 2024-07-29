// Import the necessary modules
import { getServerSession } from "next-auth";
import connection from '@/utils/db';
import { randomBytes, randomInt } from 'crypto';
import { NextResponse } from 'next/server';
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Adjust the path to your authOptions

export async function GET(request) {
  try {
    // Establish a connection to the database
    const promisePool = connection.promise();
    const [rows] = await promisePool.query(`SELECT * FROM posts;`);

    // Return the fetched rows as JSON
    return NextResponse.json(rows);
  } catch (error) {
    // Handle errors
    console.error('Error in GET:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request) {
    try {
        const promisePool = connection.promise();
        const body = await request.json(); // Get the body of the POST request
        await promisePool.query(`INSERT INTO posts (user_id,title,content) VALUES (?, ?, ?)`, [body.userId, body.title, body.content]);
        const [rows] = await promisePool.query(`SELECT * FROM posts;`);

        // Return the fetched rows as JSON
        return NextResponse.json(rows);
      } catch (error) {
        // Handle errors
        console.error('Error in GET:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      }
}