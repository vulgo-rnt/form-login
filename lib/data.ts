import { sql } from "@vercel/postgres";
import { User } from "./definitions";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export async function getUser(email: string) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function includesEmail(email: string) {
  try {
    const fetch = await sql`SELECT * FROM users WHERE email=${email}`;
    if (fetch.rowCount === 1) return true;
    return false;
  } catch (error) {
    console.error("Failed to fetch user:", error);
  }
}

export async function insertUser(user: User) {
  const { name, email, password } = user;
  const id = uuidv4();
  const encryptPassword = await bcrypt.hash(password, 10);
  try {
    await sql`INSERT INTO users (id, name, email, password)
    VALUES (${id}, ${name}, ${email}, ${encryptPassword})`;
    return "Cadastrado com sucesso";
  } catch (error) {
    return "Erro ao se cadastrar";
  }
}
