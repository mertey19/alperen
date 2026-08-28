import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { ADMIN_COOKIE } from "@/lib/cms/cookie";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-ag-admin", "1");

  if (pathname === "/admin/login" || pathname.startsWith("/admin/login/")) {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  if (!request.cookies.get(ADMIN_COOKIE)?.value) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
