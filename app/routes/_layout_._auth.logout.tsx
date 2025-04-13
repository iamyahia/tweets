import { redirect, type ActionFunctionArgs } from "react-router";

import { logout } from "~/utils/session.server";

export const action = async ({ request }: ActionFunctionArgs) =>
  logout(request);

export const loader = async () => redirect("/");
