import { sign } from "jsonwebtoken";
import { User } from "./definitions";
import { cookies } from "next/headers";

export function setJWT(user: User) {
  return sign(
    {
      id: user.name,
      email: user.email,
    },
    JWT_SECRET,
    {
      expiresIn: 60 * 60 * 24 * 7,
    }
  );
}

export function setCookie(token: string) {
  cookies().set("access_token", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
  });
}
