import { prisma } from "./prisma.server";

import type { TColor, TEmoji } from "~/types/form.types";

type TCreateTweetProps = {
  textColor: TColor;
  userId: string;
  emoji: TEmoji;
  backgroundColor: TColor;
  recipientId: string;
  message: string;
};
export const createTweet = async ({
  textColor,
  userId,
  emoji,
  backgroundColor,
  recipientId,
  message,
}: TCreateTweetProps) => {
  await prisma.tweet.create({
    data: {
      message,
      author: {
        connect: {
          id: userId,
        },
      },
      recipient: {
        connect: {
          id: recipientId,
        },
      },
      style_bg: backgroundColor,
      style_emoji: emoji,
      style_text_color: textColor,
    },
  });
};
