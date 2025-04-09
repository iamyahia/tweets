import {
  Form,
  Link,
  redirect,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "react-router";

import { register } from "~/utils/auth.server";
import { getUser } from "~/utils/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return (await getUser(request)) ? redirect("/") : null;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  //! There's no validation for the fields, so we can assume that the user has filled in all the fields correctly.
  return await register({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
  });
};

export default function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <Form method="POST">
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              className="mt-1 block w-full border border-gray-300 rounded shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              className="mt-1 block w-full border border-gray-300 rounded shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

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
            Do you have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              LogIn
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
