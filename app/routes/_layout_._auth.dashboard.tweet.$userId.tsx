import { useState } from "react";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getValidatedFormData, useRemixForm } from "remix-hook-form";
import { Form, redirect, type LoaderFunctionArgs } from "react-router";

import Modal from "../components/modal";
// import Tweet from "../components/tweet";

import { getUserById } from "~/utils/users.server";

import type { Route } from "./+types/_layout_._auth.dashboard.tweet.$userId";
import { emojiMap } from "~/utils/constants";

const schema = zod.object({
  message: zod.string().min(3).max(150),
  backgroundColor: zod.enum(["RED", "WHITE", "BLUE", "GREEN", "YELLOW"]),
  textColor: zod.enum(["RED", "WHITE", "BLUE", "GREEN", "YELLOW"]),
  emoji: zod.enum(["SMILE", "SAD", "ANGRY", "LOVE", "THUMBS_UP"]),
});

type FormData = zod.infer<typeof schema>;

const resolver = zodResolver(schema);

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { userId } = params;

  if (!userId || typeof userId !== "string") {
    return redirect("/dashboard");
  }
  const userInfo = await getUserById(userId);
  return userInfo;
};

export const action = async ({ request }: Route.ActionArgs) => {
  console.log("action irun ✅✅");
  const {
    errors,
    data,
    receivedValues: defaultValues,
  } = await getValidatedFormData<FormData>(request, resolver);
  console.log("receivedValues", defaultValues);
  if (errors) {
    return { errors, defaultValues };
  }
  return data;
};

export default function TweetModal({
  loaderData: userInfo,
}: Route.ComponentProps) {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useRemixForm<FormData>({
    mode: "onSubmit",
    resolver,
  });

  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Form
          method="POST"
          className="p-4 bg-gray-50 rounded shadow-md"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center">
              <img
                src={`https://i.pravatar.cc/40?img=${1}`}
                alt="avatar"
                className="w-16 h-16 rounded-full"
              />
              <div className="mt-2 text-center">
                <div>{userInfo?.firstName + " " + userInfo?.lastName}</div>
                <div className="text-sm text-gray-600">{userInfo?.email}</div>
              </div>
            </div>
            <div>
              <textarea
                placeholder="What's on your mind?"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                rows={4}
                {...register("message", { required: true })}
              />
              {errors.message && (
                <span className="text-red-500">{errors.message.message}</span>
              )}
              <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col gap-4">
                  <label>Background color</label>
                  <select
                    className={`border border-gray-300 rounded p-2`}
                    {...register("backgroundColor")}
                  >
                    <option>RED</option>
                    <option>BLUE</option>
                    <option>WHITE</option>
                    <option>GREEN</option>
                    <option>YELLOW</option>
                  </select>
                  {errors.backgroundColor && (
                    <span className="text-red-500">
                      {errors.backgroundColor.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-4">
                  <label>Text color</label>
                  <select
                    className="border border-gray-300 rounded p-2"
                    {...register("textColor")}
                  >
                    <option>RED</option>
                    <option>BLUE</option>
                    <option>WHITE</option>
                    <option>GREEN</option>
                    <option>YELLOW</option>
                  </select>
                  {errors.textColor && (
                    <span className="text-red-500">
                      {errors.textColor.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-4">
                  <label>Emoji</label>
                  <select
                    className="border border-gray-300 rounded p-2"
                    {...register("emoji")}
                  >
                    <option value="SMILE">{emojiMap["SMILE"]}</option>
                    <option value="SAD">{emojiMap["SAD"]}</option>
                    <option value="ANGRY">{emojiMap["ANGRY"]}</option>
                    <option value="LOVE">{emojiMap["LOVE"]}</option>
                    <option value="THUMBS_UP">{emojiMap["THUMBS_UP"]}</option>
                  </select>
                  {errors.emoji && (
                    <span className="text-red-500">{errors.emoji.message}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 items-center">
            <div
              className="p-2 border border-gray-300 rounded"
              style={{
                backgroundColor: "/* selected background color */",
                color: "/* selected text color */",
              }}
            >
              Preview Section with Emoji
            </div>

            <div>
              <button
                type="submit"
                className="w-full px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Send
              </button>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
