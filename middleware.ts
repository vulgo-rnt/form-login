import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAuth } from "./app/lib/auth";

export async function middleware(request: NextRequest) {
  const verifiedToken = await verifyAuth(request).catch((err) => {
    console.error(err.message);
  });

  if (!verifiedToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/profile"],
};
