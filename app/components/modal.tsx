import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;
  const container = document.getElementById("modal-root") || document.body;

  const handleClose = () => {
    onClose();
    navigate("/dashboard");
  };

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 flex justify-center items-center bg-black/50"
      // onClick={handleClose}
    >
      <div className="bg-white rounded shadow-lg p-6 relative">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          Close
        </button>
        {children}
      </div>
    </div>,
    container
  );
}
