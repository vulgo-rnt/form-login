"use client";

import { useFormState } from "react-dom";
import { createAccount } from "../../lib/actions";
import { useEffect, useState } from "react";
import errorTyping from "@/common/stringHandling/errorTyping";
import { ChildrenProps } from "@/lib/definitions";

export default function Page() {
  const [error, dispatch] = useFormState(createAccount, undefined);
  const [messageError, setMessageError] = useState({ type: "", message: "" });

  useEffect(() => {
    const objectError = errorTyping(error);
    setMessageError(objectError);
    if (objectError.type === "alert") alert(objectError.message);
  }, [error]);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-blue-500">
      <form action={dispatch} className="max-w-sm mx-auto">
        <div className="p-2">
          <div className="m-1">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              User
            </label>
            <input
              className={
                messageError?.type === "username"
                  ? "rounded-lg bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm  focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400"
                  : "rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              }
              type="text"
              name="name"
              placeholder="Username"
              required
            />
          </div>
          {messageError?.type === "username" && (
            <ParagError>{messageError.message}</ParagError>
          )}
          <div className="m-1">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Email
            </label>
            <input
              className={
                messageError?.type === "email"
                  ? "rounded-lg bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm  focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400"
                  : "rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              }
              type="email"
              name="email"
              placeholder="Email"
              required
            />
          </div>
          {messageError?.type === "email" && (
            <ParagError>{messageError.message}</ParagError>
          )}
          <div className="m-1">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Password
            </label>
            <input
              className={
                messageError?.type === "password"
                  ? "rounded-lg bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm  focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400"
                  : "rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              }
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </div>
          {messageError?.type === "password" && (
            <ParagError>{messageError.message}</ParagError>
          )}
          <div className="m-1">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Confirmed Password
            </label>
            <input
              className={
                messageError?.type === "confirmed_password"
                  ? "rounded-lg bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm  focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400"
                  : "rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              }
              type="password"
              name="confirmed_password"
              placeholder="Confirmed Password"
              required
            />
          </div>
          {messageError?.type === "confirmed_password" && (
            <ParagError>{messageError.message}</ParagError>
          )}
        </div>
        <FormButton>Sign up</FormButton>
      </form>
    </div>
  );
}
function FormButton({ children }: ChildrenProps) {
  return (
    <button
      className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55"
      type="submit"
    >
      {children}
    </button>
  );
}

function ParagError({ children }: ChildrenProps) {
  return (
    <p className="mt-2 text-sm text-red-600 dark:text-red-500">{children}</p>
  );
}
