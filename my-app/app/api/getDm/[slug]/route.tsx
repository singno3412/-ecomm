// Import the necessary modules
import connection from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  try {
    console.log(slug);
    const promisePool = connection.promise();
    const [rows] = await promisePool.query(`SELECT * FROM messages WHERE contacter = ?`, [slug]);
    
    // กรองข้อมูลเพื่อให้เหลือเฉพาะค่า unique ของ blogId
    const uniqueRows = rows.reduce((acc, current) => {
      const x = acc.find(item => item.blogId === current.blogId);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);

    return NextResponse.json(uniqueRows);
  } catch (error) {
    // Handle errors
    console.error('Error in GET:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
