import type { Tweet } from "@prisma/client";
import type { TColor, TEmoji } from "~/types/form.types";

import { backgroundColorMap, colorMap, emojiMap } from "~/utils/constants";

type TweetProps = {
  emoji: TEmoji;
  message: string;
  lastName: string;
  firstName: string;
  textColor: TColor;
  backgroundColor: TColor;
};
export default function Tweet({
  emoji = "THUMBS_UP",
  message,
  lastName,
  firstName,
  textColor = "WHITE",
  backgroundColor,
}: TweetProps) {
  return (
    <div
      className={`flex ${backgroundColorMap[backgroundColor]} p-4 rounded-xl w-full gap-x-2 relative`}
    >
      <img
        src={`https://i.pravatar.cc/40?img=${1}`}
        alt={firstName + lastName}
        className="w-10 h-10 rounded-full mr-3"
      />
      <div className="flex flex-col">
        <div>
          <p
            className={`${colorMap[textColor]} font-bold text-lg whitespace-pre-wrap break-all`}
          >
            {firstName} {lastName}{" "}
          </p>
          <p className={`${colorMap[textColor]} whitespace-pre-wrap break-all`}>
            {message}
          </p>
        </div>
        <div className="absolute bottom-4 right-4 bg-white rounded-full h-10 w-10 flex items-center justify-center text-2xl">
          {emojiMap[emoji]}
        </div>
      </div>
    </div>
  );
}
