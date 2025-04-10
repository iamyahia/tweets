import { Outlet } from "react-router";

import { getUser, requireUserId } from "~/utils/session.server";

import type { Route } from "./+types/_layout._auth";

export const loader = async ({ request }: { request: Request }) => {
  await requireUserId(request);
  const userInfo = await getUser(request);

  return userInfo;
};

export default function ProtectedLayout({ loaderData }: Route.ComponentProps) {
  return <Outlet context={{ userInfo: loaderData }} />;
}
