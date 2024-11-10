import { v4 as uuidv4 } from 'uuid';

export async function GET(request) {
  const chatId = uuidv4();
  
  return new Response(JSON.stringify({ chatId }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
