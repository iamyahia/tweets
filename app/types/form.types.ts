// TODO: Do a research about, why we have ability to import those types directly with @prisma/client !?
export type TColor = "RED" | "WHITE" | "BLUE" | "GREEN" | "YELLOW";

export type TEmoji = "SMILE" | "SAD" | "ANGRY" | "LOVE" | "THUMBS_UP";

export type TTweetForm = {
  message: string;
  backgroundColor: keyof TColor;
  textColor: keyof TColor;
  emoji: keyof TEmoji;
};
