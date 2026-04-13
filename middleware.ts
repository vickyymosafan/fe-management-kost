import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Mock Role checking logic using generic condition
  // In real app: Get token from request.cookies
  const url = request.nextUrl.clone()
  const path = request.nextUrl.pathname

  // We check for role parameter or assume owner if not specified for Development purposes
  const role = request.cookies.get('role')?.value || 'owner'

  // If a tenant tries to access an (owner) explicit route like /owner
  // Currently since we map /kamar etc inside (owner), they reside at root.
  // Actually Next.js Route Groups don't add path segment. 
  // Wait, my directory is app/(owner), so paths are /kamar, /dashboard, etc.
  // We need to define protected routes exactly.
  const ownerRoutes = ['/kamar', '/penyewa', '/pembayaran', '/']

  if (role === 'tenant' && ownerRoutes.includes(path)) {
    url.pathname = '/tenant/dashboard'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
