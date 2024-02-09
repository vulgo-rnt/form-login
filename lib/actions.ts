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
    .object({
      email: z.string().email({ message: "username:Email invalido" }),
      password: z.string().min(6, {
        message: "password:Senha deve conter no minimo 6 caracteres",
      }),
    })
    .safeParse(data);

  if (!parsedCredentials.success)
    return parsedCredentials.error.errors[0].message;

  const { email, password } = parsedCredentials.data;
  const user = await getUser(email);

  if (!user) return "username:Usuario não registrado";

  const passwordsMatch = await bcrypt.compare(password, user.password);

  if (!passwordsMatch) return "password:Senha invalida";

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
      name: z.string().max(20, {
        message: "username:Nome deve conter no maximo 20 caracteres",
      }),
      email: z.string().email({ message: "email:Email invalido" }),
      password: z
        .string()
        .min(6, {
          message: "password:Senha deve conter no minimo 6 caracteres",
        })
        .max(60, {
          message: "password:Senha deve conter no maximo 60 caracteres",
        }),
      confirmed_password: z.string(),
    })
    .refine(async (data) => !(await includesEmail(data.email)), {
      message: "email:Email já existente",
    })
    .refine((data) => /[A-Z]/.test(data.password), {
      message: "password:Senha deve conter uma letra maiuscula",
    })
    .refine((data) => data.password === data.confirmed_password, {
      message: "confirmed_password:Senhas devem ser iguais",
    })
    .safeParseAsync(data);

  if (!parsedCredentials.success) {
    return parsedCredentials.error.errors[0].message;
  }

  return await insertUser(parsedCredentials.data);
}
