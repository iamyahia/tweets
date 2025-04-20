import { Outlet, redirect } from "react-router";

import { getUser, requireUserId } from "~/utils/session.server";

import type { Route } from "./+types/_layout_._auth";

export const loader = async ({ request }: { request: Request }) => {
  await requireUserId(request);
  const userInfo = await getUser(request);

  if (!userInfo) {
    return redirect("/login");
  }

  return userInfo;
};

export default function ProtectedLayout({ loaderData }: Route.ComponentProps) {
  return <Outlet context={{ userInfo: loaderData }} />;
}
