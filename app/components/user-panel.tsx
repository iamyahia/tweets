import React from "react";

const contacts = [
  { id: 1, fullName: "John Doe", avatar: "https://i.pravatar.cc/40?img=1" },
  { id: 2, fullName: "Jane Smith", avatar: "https://i.pravatar.cc/40?img=2" },
  {
    id: 3,
    fullName: "Alice Johnson",
    avatar: "https://i.pravatar.cc/40?img=3",
  },
];

const UserPanel: React.FC = () => {
  return (
    <div className="w-full max-w-sm p-4 bg-white shadow rounded h-screen overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Contact List</h2>
      <div>
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="flex items-center p-2 hover:bg-gray-100 rounded"
          >
            <img
              src={contact.avatar}
              alt={contact.fullName}
              className="w-10 h-10 rounded-full mr-3"
            />
            <span className="text-gray-700">{contact.fullName}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPanel;
