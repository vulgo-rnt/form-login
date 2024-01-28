import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAuth } from "./app/lib/auth";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const verifiedToken = await verifyAuth(request).catch((err) => {
    console.error(err.message);
  });

  if (!verifiedToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else if (verifiedToken && path !== "/profile") {
    return NextResponse.redirect(new URL("/profile", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/profile"],
};
