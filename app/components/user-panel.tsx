import React, { useState, useRef } from "react";
import { Form, useNavigate } from "react-router";

export default function UserPanel({
  users,
}: {
  users: {
    id: string;
    firstName: string;
    lastName: string;
  }[];
}) {
  const [showModal, setShowModal] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  const navigate = useNavigate();

  const handleSignOutClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowModal(true);
  };

  const confirmLogout = () => {
    setShowModal(false);
    formRef.current?.submit();
  };

  const cancelLogout = () => setShowModal(false);

  return (
    <div className="relative w-full flex flex-col justify-between max-w-sm p-4 bg-white shadow rounded h-screen overflow-y-auto">
      <div className="flex flex-col">
        <h2 className="text-xl font-bold mb-4">Contact List</h2>
        <div>
          {users.map((user, index) => (
            <div
              key={index}
              className="flex items-center p-2 hover:bg-gray-100 rounded"
              onClick={() => navigate(`/dashboard/tweet/${user.id}`)}
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
      <Form method="post" action="/logout" ref={formRef}>
        <button
          type="button"
          onClick={handleSignOutClick}
          className="absolute bottom-4 left-4 right-4 cursor-pointer bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded shadow"
        >
          Sign Out
        </button>
      </Form>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded shadow">
            <p className="mb-4">Are you sure you want to logout?</p>
            <div className="flex justify-end">
              <button
                onClick={cancelLogout}
                className="mr-2 bg-gray-300 hover:bg-gray-400 text-black py-1 px-3 rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
