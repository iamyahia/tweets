import { Outlet, type LoaderFunctionArgs } from "react-router";

import Tweet from "~/components/tweet";
import UserPanel from "~/components/user-panel";

import { getOtherUsers } from "~/utils/users.server";
import { requireUserId } from "~/utils/session.server";
import { getFilteredTweets } from "~/utils/tweets.server";

import type { Route } from "./+types/_layout_._auth.dashboard";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  // TODO: we can make more enhancement between getOtherUsers + requireUserId, by removing one of them or passing userId to getOtherUsers or stuffs like that.
  const users = await getOtherUsers(request);
  const tweets = await getFilteredTweets(userId, {}, {});

  return {
    users,
    tweets,
  };
};

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  const { tweets, users } = loaderData;
  return (
    <>
      <Outlet />
      <div className="h-full flex">
        <UserPanel users={users} />
        <div className="flex-1 flex-flex-col">
          {/* Search bar */}
          <div className="flex-1 flex">
            <div className="w-full p-10 flex flex-col gap-y-4">
              {tweets.map((tweet) => (
                <Tweet
                  key={tweet.id}
                  backgroundColor={tweet.style_bg!}
                  emoji={tweet.style_emoji!}
                  firstName={tweet.author.firstName}
                  lastName={tweet.author.lastName}
                  message={tweet.message}
                  textColor={tweet.style_text_color!}
                />
              ))}
            </div>
            {/* Recent tweets */}
          </div>
        </div>
      </div>
    </>
  );
}
