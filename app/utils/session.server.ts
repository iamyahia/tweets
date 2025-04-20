import { createCookieSessionStorage, redirect } from "react-router";
import { prisma } from "./prisma.server";

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) throw new Error("SESSION_SECRET is not set.");

const storage = createCookieSessionStorage({
  cookie: {
    name: "tweets_session",
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 30, // 30 minutes
    httpOnly: true,
  },
});

async function getUserSession(request: Request) {
  return await storage.getSession(request.headers.get("Cookie"));
}

//? This function will be used if we want the current user id.
export const getUserId = async (request: Request) => {
  {
    const session = await getUserSession(request);
    const userId = session.get("userId");
    if (!userId || typeof userId !== "string") return null;
    return userId;
  }
};

export const createUserSession = async (userId: string, redirectTo: string) => {
  const session = await storage.getSession();
  session.set("userId", userId);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
};

//? This function will be used for those route which require authentication and will redirect to the login page if the user is not authenticated.
export const requireUserId = async (
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) => {
  const session = await getUserSession(request);
  const userId = session.get("userId");

  // TODO: Think about this fn, we use it in multiple place, maybe we can move it to a dedicate utility fn.
  if (!userId || typeof userId !== "string") {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }
  return userId;
};

export const getUser = async (request: Request) => {
  const userId = await getUserId(request);
  if (!userId) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true, firstName: true, lastName: true },
    });

    return user;
  } catch (error) {
    throw logout(request);
  }
};

export const logout = async (request: Request) => {
  const session = await getUserSession(request);
  return redirect("/login", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
};
