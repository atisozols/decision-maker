"use client";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import { IoMdCheckmark } from "react-icons/io";

const OptionCard = ({ option, index, onAccept, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(option);

  return (
    <li className="shadow-sm p-4 mb-1 lg:mb-3 dark:border border-accent flex items-center justify-between max-w-sm lg:max-w-lg mx-auto h-14 lg:h-16 lg:text-lg">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onAccept(index, editValue);
                setIsEditing(false);
              }
            }}
            className="flex-grow border-b mr-2"
          />
          <div className="flex items-center gap-2 justify-end">
            <button
              onClick={() => {
                onAccept(index, editValue);
                setIsEditing(false);
              }}
              className="cursor-pointer text-sm lg:text-lg text-green-500"
            >
              <IoMdCheckmark className="text-lg lg:text-2xl" />
            </button>
            <button
              onClick={() => {
                setEditValue(option);
                setIsEditing(false);
              }}
              className="cursor-pointer text-sm lg:text-lg text-gray-500"
            >
              <MdClose className="text-lg lg:text-2xl" />
            </button>
          </div>
        </>
      ) : (
        <>
          <span>{option}</span>
          <div className="flex items-center">
            <button
              onClick={() => setIsEditing(true)}
              className="cursor-pointer text-sm lg:text-lg mr-2"
            >
              <FiEdit2 className="" />
            </button>
            <button
              onClick={() => onDelete(index)}
              className="cursor-pointer text-sm lg:text-lg"
            >
              <MdClose className="text-xl lg:text-3xl" />
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default OptionCard;
