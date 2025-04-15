import type { Tweet, User } from "@prisma/client";

import { emojiMap } from "~/utils/constants";

export default function Tweet({
  emoji,
  message,
  lastName,
  firstName,
  textColor,
  backgroundColor,
}: {
  emoji?: "SMILE" | "SAD" | "ANGRY" | "LOVE" | "THUMBS_UP";
  message: string;
  lastName: string;
  firstName: string;
  textColor?: string;
  backgroundColor: string;
}) {
  return (
    <div
      className={`flex ${backgroundColor} p-4 rounded-xl w-full gap-x-2 relative`}
    >
      <img
        src={`https://i.pravatar.cc/40?img=${1}`}
        alt={firstName + lastName}
        className="w-10 h-10 rounded-full mr-3"
      />
      <div className="flex flex-col">
        <div>
          <p
            className={`${
              textColor || "WHITE"
            } font-bold text-lg whitespace-pre-wrap break-all`}
          >
            {firstName} {lastName}{" "}
          </p>
          <p
            className={`${textColor || "WHITE"} whitespace-pre-wrap break-all`}
          >
            {message}
          </p>
        </div>
        <div className="absolute bottom-4 right-4 bg-white rounded-full h-10 w-10 flex items-center justify-center text-2xl">
          {emojiMap[emoji] || "THUMBS_UP"}
        </div>
      </div>
    </div>
  );
}
