import { data } from "react-router";
import bcrypt from "bcryptjs";

import { prisma } from "./prisma.server";
import { createUser } from "./users.server";

import type { RegisterForm, LoginForm } from "~/types/auth.types.server";
import { createUserSession } from "./session.server";

export const register = async (form: RegisterForm) => {
  // Check if email is exists
  const emailExists = await prisma.user.findUnique({
    where: { email: form.email },
  });

  if (emailExists)
    return data(
      {
        error: "A user with this email already exists. Try another.",
      },
      { status: 400 }
    );

  //! There's no validation for the fields, so we can assume that the user has filled in all the fields correctly.
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

  return createUserSession(newUser.id, "/");
};

export const login = async (form: LoginForm, redirectTo: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: form.email,
    },
  });

  if (!user || !(await bcrypt.compare(form.password, user.password)))
    return data({ error: "Incorrect Login" }, { status: 400 });

  return createUserSession(user.id, redirectTo);
};
