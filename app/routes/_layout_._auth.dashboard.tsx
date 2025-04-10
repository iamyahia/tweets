import UserPanel from "~/components/user-panel";
import type { Route } from "./+types/_layout_._auth.dashboard";

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <UserPanel />
    </>
  );
}
