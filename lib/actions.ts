"use server";

import { z } from "zod";
import { getUser, includesEmail, insertUser } from "./data";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { setUserCookie } from "./auth";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  const data = Object.fromEntries(formData);
  const parsedCredentials = z
    .object({ email: z.string().email(), password: z.string().min(6) })
    .safeParse(data);

  if (!parsedCredentials.success)
    return parsedCredentials.error.errors[0].message;

  const { email, password } = parsedCredentials.data;
  const user = await getUser(email);

  if (!user) return "Unregistered User";

  const passwordsMatch = await bcrypt.compare(password, user.password);

  if (!passwordsMatch) return "Invalid Password";

  await setUserCookie(user);

  redirect("/profile");
}

export async function createAccount(
  prevState: string | undefined,
  formData: FormData
) {
  const data = Object.fromEntries(formData);
  const parsedCredentials = await z
    .object({
      name: z
        .string()
        .max(20, { message: "Nome deve conter no minimo 20  caracteres" }),
      email: z.string().email({ message: "Email invalido" }),
      password: z.string().min(6).max(60),
      confirmed_password: z.string().min(6).max(60),
    })
    .refine(async (data) => !(await includesEmail(data.email)), {
      message: "Email já existente",
    })
    .refine((data) => data.password === data.confirmed_password, {
      message: "Senhas devem ser iguais",
    })
    .safeParseAsync(data);

  if (!parsedCredentials.success) {
    return parsedCredentials.error.errors[0].message;
  }

  return await insertUser(parsedCredentials.data);
}
