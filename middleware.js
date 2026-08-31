// Gates the whole site behind a shared secret link.
//
// There is deliberately no `matcher` export: middleware then runs on every
// request, so the 57 MB of images and video in public/assets are protected
// too, not just index.html. Adding a matcher that skips static files would
// leave every screenshot publicly reachable by direct URL.
import { next } from '@vercel/functions';

const COOKIE = 'access';
const THIRTY_DAYS = 60 * 60 * 24 * 30;

export default function middleware(request) {
  const token = process.env.SITE_TOKEN;

  // Fail closed: if SITE_TOKEN is missing, serve nothing rather than
  // accidentally serving everything.
  if (!token) return deny();

  const url = new URL(request.url);

  // Arriving via ?key=<token>: set the cookie, then bounce to the clean URL
  // so the secret doesn't sit in the address bar or get screenshotted.
  if (url.searchParams.get('key') === token) {
    url.searchParams.delete('key');
    return new Response(null, {
      status: 302,
      headers: {
        Location: url.pathname + url.search,
        'Set-Cookie': `${COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${THIRTY_DAYS}`,
        'Cache-Control': 'no-store',
      },
    });
  }

  if (readCookie(request, COOKIE) === token) return next();

  return deny();
}

function readCookie(request, name) {
  const header = request.headers.get('cookie') || '';
  for (const part of header.split(';')) {
    const eq = part.indexOf('=');
    if (eq === -1) continue;
    if (part.slice(0, eq).trim() === name) return part.slice(eq + 1).trim();
  }
  return null;
}

// 404 rather than 401 : doesn't advertise that there's something here to crack,
// and avoids the native browser auth dialog that in-app browsers mishandle.
function deny() {
  return new Response('Not found', {
    status: 404,
    headers: { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' },
  });
}
