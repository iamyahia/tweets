import type { $Enums } from "@prisma/client";
import { emojiMap } from "~/utils/constants";

// TODO: move this and other types to their dedicate file
const RecentBar = ({
  tweets,
}: {
  tweets: {
    style_emoji: $Enums.Emoji | null;
    recipient: {
      id: string;
      firstName: string;
      lastName: string;
    };
  }[];
}) => {
  return (
    <div className="w-1/7 bg-white border-l-4 border-l-red-500 flex flex-col items-center">
      <h2 className="text-xl text-red-500 font-semibold my-6">Recent Tweets</h2>
      <div className="h-full flex flex-col gap-y-10 mt-10">
        {tweets.map((tweet) => (
          <div className="h-18 w-18 relative" key={tweet.recipient.id}>
            <img
              src={`https://i.pravatar.cc/40?img=${1}`}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div className="h-8 w-8 text-3xl top-5 right-4 rounded-full absolute flex justify-center items-center">
              {emojiMap[tweet.style_emoji || "THUMBS_UP"]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentBar;
