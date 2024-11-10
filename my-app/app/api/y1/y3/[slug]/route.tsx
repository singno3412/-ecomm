// Import the necessary modules
import connection from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params
  try {
    console.log(slug)
    const promisePool = connection.promise();
    const [rows] = await promisePool.query(`SELECT * FROM posts WHERE id = ?`,[slug]);
    return NextResponse.json(rows);
  } catch (error) {
    // Handle errors
    console.error('Error in GET:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
