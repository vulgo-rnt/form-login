"use client";

import { useFormState, useFormStatus } from "react-dom";
import { createAccount } from "../lib/actions";

export default function Page() {
  const [errorMessage, dispatch] = useFormState(createAccount, undefined);

  return (
    <form action={dispatch}>
      <input type="text" name="name" placeholder="Name" required />
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <input
        type="password"
        name="confirmed_password"
        placeholder="Confirmed Password"
        required
      />
      <div>{errorMessage && <p>{errorMessage}</p>}</div>
      <LoginButton />
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button aria-disabled={pending} type="submit">
      Create
    </button>
  );
}
