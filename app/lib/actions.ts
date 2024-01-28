"use server";

import { z } from "zod";
import { getUser } from "./data";
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

  if (!parsedCredentials.success) return "Credencias invalida";

  const { email, password } = parsedCredentials.data;
  const user = await getUser(email);

  if (!user) return "Usuario não registrado";

  const passwordsMatch = await bcrypt.compare(password, user.password);

  if (!passwordsMatch) return "Credencias invalida";

  await setUserCookie();

  redirect("/profile");
}
