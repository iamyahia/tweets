import { Outlet, type LoaderFunctionArgs } from "react-router";
import type { Prisma } from "@prisma/client";

import Tweet from "~/components/tweet";
import UserPanel from "~/components/user-panel";

import { getOtherUsers } from "~/utils/users.server";
import { requireUserId } from "~/utils/session.server";
import { getFilteredTweets, getRecentTweets } from "~/utils/tweets.server";

import type { Route } from "./+types/_layout_._auth.dashboard";
import RecentBar from "~/components/recent-bar";
import { SearchBar } from "~/components/search-bar";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url).searchParams;
  const searchParams = url.get("search");
  const sort = url.get("sort");

  let sortOptions: Prisma.TweetOrderByWithRelationInput = {};
  if (sort === "date") {
    sortOptions = { createdAt: "desc" };
  } else if (sort === "sender") {
    sortOptions = { author: { firstName: "asc" } };
  } else if (sort === "emoji") {
    sortOptions = { style_emoji: "asc" };
  }

  let filterOptions: Prisma.TweetWhereInput = {};
  if (searchParams) {
    filterOptions = {
      OR: [
        { message: { contains: searchParams, mode: "insensitive" } },
        {
          author: {
            OR: [
              { firstName: { contains: searchParams, mode: "insensitive" } },
              { lastName: { contains: searchParams, mode: "insensitive" } },
            ],
          },
        },
      ],
    };
  }

  //
  const userId = await requireUserId(request);

  // TODO: we can make more enhancement between getOtherUsers + requireUserId, by removing one of them or passing userId to getOtherUsers or stuffs like that.
  const users = await getOtherUsers(request);
  const tweets = await getFilteredTweets(userId, sortOptions, filterOptions);
  const recentTweets = await getRecentTweets();
  return {
    users,
    tweets,
    recentTweets,
  };
};

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  const { tweets, users, recentTweets } = loaderData;
  return (
    <>
      <Outlet />
      <div className="h-full flex">
        <UserPanel users={users} />
        <div className="flex-1 flex-flex-col">
          {/* Search bar */}
          <SearchBar />
          <div className="flex-1 flex h-full">
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
            <RecentBar tweets={recentTweets} />
          </div>
        </div>
      </div>
    </>
  );
}
