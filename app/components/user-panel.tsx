import React from "react";
import { Form } from "react-router";

export default function UserPanel({
  users,
}: {
  users: {
    firstName: string;
    lastName: string;
  }[];
}) {
  return (
    <div className="relative w-full flex flex-col justify-between max-w-sm p-4 bg-white shadow rounded h-screen overflow-y-auto">
      <div className="flex flex-col">
        <h2 className="text-xl font-bold mb-4">Contact List</h2>
        <div>
          {users.map((user, index) => (
            <div
              key={index}
              className="flex items-center p-2 hover:bg-gray-100 rounded"
            >
              <img
                src={`https://i.pravatar.cc/40?img=${index}`}
                alt={user.firstName + user.lastName}
                className="w-10 h-10 rounded-full mr-3"
              />
              <span className="text-gray-700">
                {user.firstName} {user.lastName}
              </span>
            </div>
          ))}
        </div>
      </div>
      <Form method="post" action="/logout">
        <button
          type="submit"
          className="absolute bottom-4 left-4 right-4 cursor-pointer bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded shadow"
        >
          Sign Out
        </button>
      </Form>
    </div>
  );
}
