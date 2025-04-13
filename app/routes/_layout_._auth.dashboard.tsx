import UserPanel from "~/components/user-panel";
import type { Route } from "./+types/_layout_._auth.dashboard";
import type { LoaderFunctionArgs } from "react-router";
import { getOtherUsers } from "~/utils/users.server";

export const loader = async ({ request }: LoaderFunctionArgs) =>
  await getOtherUsers(request);

export default function Dashboard({ loaderData: users }: Route.ComponentProps) {
  return (
    <>
      <UserPanel users={users} />
    </>
  );
}
