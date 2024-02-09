"use client";

import { useFormState } from "react-dom";
import { authenticate } from "../../lib/actions";
import { useEffect, useState } from "react";
import errorTyping from "@/common/stringHandling/errorTyping";
import { ChildrenProps } from "@/lib/definitions";

export default function Page() {
  const [error, dispatch] = useFormState(authenticate, undefined);
  const [messageError, setMessageError] = useState({ type: "", message: "" });

  useEffect(() => {
    setMessageError(errorTyping(error));
  }, [error]);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-blue-500">
      <form action={dispatch} className="max-w-sm mx-auto">
        <div className="p-2">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            User
          </label>
          <div className="flex m-1">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
              </svg>
            </span>
            <input
              type="email"
              name="email"
              id="user"
              className={
                messageError?.type === "username"
                  ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-e-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400"
                  : "rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              }
              placeholder="Email"
              required
            />
          </div>
          {messageError?.type === "username" && (
            <ParagError>{messageError.message}</ParagError>
          )}
          <div className="m-1">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className={
                messageError.type === "password"
                  ? "bg-red-50 border border-red-50 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400"
                  : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              }
              required
            />
            {messageError.type === "password" && (
              <ParagError>{messageError.message}</ParagError>
            )}
          </div>
        </div>
        <FormButton>Sign in</FormButton>
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
