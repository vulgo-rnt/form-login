import { cookies } from "next/headers";
import { type NextRequest } from "next/server";
import { SignJWT, jwtVerify } from "jose";
import { User } from "./definitions";

export async function verifyAuth(req: NextRequest) {
  const access_token = req.cookies.get("access_token")?.value;

  if (!access_token) throw new Error("Sem token de acesso");

  const secret = process.env.JWT_SECRET;
  return await jwtVerify(access_token, new TextEncoder().encode(secret)).catch(
    (err) => {
      throw new Error(err);
    }
  );
}

export async function setUserCookie(user: User) {
  cookies().delete('access_token')
  const secret = process.env.JWT_SECRET;
  const { name, email } = user;
  const token = await new SignJWT({ name, email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(new TextEncoder().encode(secret));

  cookies().set("access_token", token, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 7,
  });
}
