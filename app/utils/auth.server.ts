import { data } from "react-router";
import bcrypt from "bcryptjs";

import { prisma } from "./prisma.server";
import { createUser } from "./users.server";

import type { RegisterForm, LoginForm } from "~/types/auth.types.server";

export const register = async (form: RegisterForm) => {
  // Check if email is exists
  const emailExists = await prisma.user.findUnique({
    where: { email: form.email },
  });

  console.log("exists", emailExists);
  if (emailExists)
    return data(
      {
        error: "A user with this email already exists. Try another.",
      },
      { status: 400 }
    );

  // Create user
  const newUser = await createUser(form);
  if (!newUser)
    return data(
      {
        error: "User not created! Please try again.",
        fields: {
          email: form.email,
          password: form.password,
          firstName: form.firstName,
          lastName: form.lastName,
        },
      },
      { status: 400 }
    );

  // create new session + redirect user to home page
  return null;
};

export const login = async (form: LoginForm) => {
  // Check if email is exists
  const user = await prisma.user.findUnique({
    where: {
      email: form.email,
    },
  });

  // Check if password is correct
  if (!user || !(await bcrypt.compare(form.password, user.password)))
    return data({ error: "Incorrect Login" }, { status: 400 });

  // create user session + redirect user to home page
  return null;
};
