import { useEffect, useState } from "react";
import {
  Form,
  Link,
  redirect,
  useActionData,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "react-router";

import { login } from "~/utils/auth.server";
import { getUserId } from "~/utils/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return (await getUserId(request)) ? redirect("/") : null;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const redirectTo =
    new URL(request.url).searchParams.get("redirectTo") || "/dashboard";
  //! There's no validation for the fields, so we can assume that the user has filled in all the fields correctly.
  return await login(
    {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    },
    redirectTo
  );
};

export default function Login() {
  const actionData = useActionData();
  const [formErrors, setFormErrors] = useState(actionData?.error || "");

  useEffect(() => {
    if (actionData?.error) {
      setFormErrors(actionData.error);
    }
  }, [actionData]);

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {formErrors && (
          <div className="mb-4 text-red-500 text-center">{formErrors}</div>
        )}
        <Form method="POST">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 block w-full border border-gray-300 rounded shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="mt-1 block w-full border border-gray-300 rounded shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <p className="mb-4 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </Link>
          </p>
          <button
            type="submit"
            className="cursor-pointer w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded"
          >
            Log In
          </button>
        </Form>
      </div>
    </div>
  );
}
