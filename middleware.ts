// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if the request is for sessions page with quiz parameters
  if (
    request.nextUrl.pathname === '/sessions' &&
    request.nextUrl.searchParams.get('fromQuiz') === 'true'
  ) {
    // Check if user is authenticated (you'll need to implement this based on your auth method)
    const token = request.cookies.get('token')
    
    if (!token) {
      // Redirect to login with return URL
      const url = new URL('/register', request.url)
      url.searchParams.set('returnUrl', '/quiz/recommendations')
      return NextResponse.redirect(url)
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/sessions/:path*']
}