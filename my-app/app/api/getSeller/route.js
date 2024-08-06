
import connection from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const promisePool = connection.promise()
    const [rows,fields] = await promisePool.query(
        `SELECT * FROM posts WHERE type = 'Seller'`
    ) 
    return NextResponse.json(rows)
}