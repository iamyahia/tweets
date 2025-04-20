export type TColor = "RED" | "WHITE" | "BLUE" | "GREEN" | "YELLOW";

export type TEmoji = "SMILE" | "SAD" | "ANGRY" | "LOVE" | "THUMBS_UP";

export type TTweetForm = {
  message: string;
  backgroundColor: keyof TColor;
  textColor: keyof TColor;
  emoji: keyof TEmoji;
};
