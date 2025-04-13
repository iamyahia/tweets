import { redirect } from "react-router";
import bcrypt from "bcryptjs";

import { prisma } from "./prisma.server";

import type { RegisterForm } from "~/types/auth.types.server";
import { getUserId } from "./session.server";

export const createUser = async (user: RegisterForm) => {
  // Hashing the password
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const newUser = await prisma.user.create({
    data: {
      email: user.email,
      password: hashedPassword,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  });

  return { id: newUser.id, email: user.email };
};

export const getOtherUsers = async (request: Request) => {
  const userId = await getUserId(request);

  if (!userId) throw redirect("/login");

  return await prisma.user.findMany({
    where: {
      id: { not: userId },
    },
    orderBy: {
      firstName: "asc",
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
    },
  });
};

export const getUserById = async (userId: string) => {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      firstName: true,
      lastName: true,
      email: true,
    },
  });
};
