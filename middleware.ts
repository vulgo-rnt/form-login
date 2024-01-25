import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("token")?.value;
  console.log(request.headers.get("authorization"));

  if (currentUser) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }
  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/profile"],
};
