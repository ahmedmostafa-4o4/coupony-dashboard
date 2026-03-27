import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { AUTH_ACCESS_TOKEN_COOKIE } from "@/lib/auth/session";

function getLocalizedHref(request: NextRequest, lang: string, path: string) {
  return new URL(`/${lang}${path}`, request.url);
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const segments = pathname.split("/").filter(Boolean);
  const [lang = "en", section] = segments;
  const hasAccessToken = Boolean(
    request.cookies.get(AUTH_ACCESS_TOKEN_COOKIE)?.value
  );

  if (section === "admin" && !hasAccessToken) {
    return NextResponse.redirect(getLocalizedHref(request, lang, "/login"));
  }

  if (section === "login" && hasAccessToken) {
    return NextResponse.redirect(getLocalizedHref(request, lang, "/admin"));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:lang/admin/:path*", "/:lang/login"],
};
