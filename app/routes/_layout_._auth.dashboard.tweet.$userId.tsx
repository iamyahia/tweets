import { useState } from "react";
import { redirect, type LoaderFunctionArgs } from "react-router";

import Modal from "../components/Modal";

import { getUserById } from "~/utils/users.server";

import type { Route } from "./+types/_layout_._auth.dashboard.tweet.$userId";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { userId } = params;

  if (!userId || typeof userId !== "string") {
    return redirect("/dashboard");
  }
  const userInfo = await getUserById(userId);
  return userInfo;
};

export default function TweetModal({ loaderData }: Route.ComponentProps) {
  const userInfo = loaderData;
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-4 bg-gray-50 rounded shadow-md">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center">
              <img
                src={`https://i.pravatar.cc/40?img=${userInfo?.id}`}
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
              />
              <div className="grid grid-cols-3 gap-2">
                <select className="border border-gray-300 rounded p-2">
                  <option>RED</option>
                  <option>BLUE</option>
                  <option>WHITE</option>
                  <option>GREEN</option>
                  <option>YELLOW</option>
                </select>
                <select className="border border-gray-300 rounded p-2">
                  <option>RED</option>
                  <option>BLUE</option>
                  <option>WHITE</option>
                  <option>GREEN</option>
                  <option>YELLOW</option>
                </select>
                <select className="border border-gray-300 rounded p-2">
                  <option>SMILE</option>
                  <option>SAD</option>
                  <option>ANGRY</option>
                  <option>LOVE</option>
                  <option>THUMBS_UP</option>
                </select>
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
        </div>
      </Modal>
    </div>
  );
}
