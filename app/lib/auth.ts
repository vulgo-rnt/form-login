import { cookies } from "next/headers";
import { type NextRequest } from "next/server";
import { SignJWT, jwtVerify } from "jose";

export async function verifyAuth(req: NextRequest) {
  const access_token = req.cookies.get("access_token")?.value;

  if (!access_token) throw new Error("Sem token de acesso");

  try {
    const secret = process.env.JWT_SECRET;
    await jwtVerify(access_token, new TextEncoder().encode(secret));
    return true;
  } catch (error) {
    throw error;
  }
}

export async function setUserCookie() {
  const secret = process.env.JWT_SECRET;
  const token = await new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(new TextEncoder().encode(secret));

  cookies().set("access_token", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
  });
}
