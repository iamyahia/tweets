import type { Prisma } from "@prisma/client";
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

export const getFilteredTweets = async (
  userId: string,
  sortFilter: Prisma.TweetOrderByWithRelationInput,
  whereFilter: Prisma.TweetWhereInput
) => {
  return await prisma.tweet.findMany({
    where: {
      recipientId: userId,
      ...whereFilter,
    },
    orderBy: sortFilter,
    select: {
      id: true,
      message: true,
      style_bg: true,
      style_emoji: true,
      style_text_color: true,
      author: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });
};

export const getRecentTweets = async () => {
  return await prisma.tweet.findMany({
    take: 3,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      style_emoji: true,
      recipient: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });
};
