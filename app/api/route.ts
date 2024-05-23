import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const token = request.cookies.get('token')
  return new Response(`Hello, Next.js! token=${token?.value}`, {
    status: 200,
    headers: { 'Set-Cookie': `token=${token?.value}` },
  })
}