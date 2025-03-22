"use client";
import { useState, useEffect } from "react";
import { FiEdit2 } from "react-icons/fi";
import { IoIosArrowDown, IoIosArrowUp, IoMdCheckmark } from "react-icons/io";
import { MdClose } from "react-icons/md";

const CriterionCard = ({
  criterion,
  index,
  onAccept,
  onDelete,
  onMoveUp,
  onMoveDown,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(criterion);

  useEffect(() => {
    setEditValue(criterion);
  }, [criterion]);

  return (
    <div className="shadow-md p-4 mb-1 lg:mb-3 dark:border border-accent flex items-center justify-between h-14 lg:h-16 lg:text-lg">
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
                setEditValue(criterion);
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
          <span>{criterion}</span>
          <div className="flex items-center">
            <div className="flex border-r border-accent pr-4 mr-4 gap-2">
              <button onClick={onMoveUp} className="cursor-pointer text-sm">
                <IoIosArrowUp className="text-lg lg:text-2xl" />
              </button>
              <button onClick={onMoveDown} className="cursor-pointer text-sm">
                <IoIosArrowDown className="text-lg lg:text-2xl" />
              </button>
            </div>
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
    </div>
  );
};
export default CriterionCard;
