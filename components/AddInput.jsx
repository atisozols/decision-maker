import Link from "next/link";
import { FaPlus, FaQuestion } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { useDecision } from "@/context/decisionContext";

const AddInput = ({
  placeholder,
  showQuestion = false,
  value,
  onChange,
  onKeyDown,
  onClick,
  tooltip = false,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showTooltipButton, setShowTooltipButton] = useState(tooltip);
  const { decision } = useDecision();
  useEffect(() => {
    if (showTooltip) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showTooltip]);

  return (
    <>
      <div
        style={{ marginBottom: "20vh" }}
        className="relative flex mb-4 shadow-sm dark:border border-accent w-full max-w-sm lg:max-w-lg font-thin h-14 lg:h-16 lg:text-lg"
      >
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          className="flex-grow p-4 mr-2"
        />
        <button
          onClick={() => {
            if (onClick) onClick();
            document
              .getElementById("footer")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="p-2 mr-2 rounded-xl cursor-pointer"
        >
          <FaPlus className="text-lg lg:text-2xl" />
        </button>
        {showQuestion && (
          <Link
            href="/about"
            className="absolute -bottom-8 text-xs lg:text-sm w-full text-center hover:underline underline-offset-4"
          >
            Kas te notiek?
          </Link>
        )}
        {tooltip && showTooltipButton && decision?.options?.length <= 1 && (
          <div className="absolute -top-3 -right-3 w-full flex justify-end">
            <button
              onClick={() => {
                if (tooltip) {
                  setShowTooltip(true);
                  setShowTooltipButton(false);
                }
              }}
              className="flex justify-center items-center w-7 h-7 bg-background text-foreground shadow-sm p-0.5 rounded-full font-bold text-xs cursor-pointer"
            >
              <FaQuestion className="text-sm" />
            </button>
          </div>
        )}
      </div>
      {tooltip && showTooltip && (
        <div
          style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
          className="fixed inset-0 flex items-center justify-center z-50 p-8"
        >
          <div className="bg-background p-8 shadow w-full max-w-sm lg:max-w-md">
            <ul className="text-justify font-extralight space-y-4">
              <li className="flex items-start space-x-5">
                <span>1</span>
                <span>
                  Ievadi vismaz divas izvēles iespējas, starp kurām nevari
                  izlemt
                </span>
              </li>
              <li className="flex items-start space-x-5">
                <span>2</span>
                <span>
                  Ievadi vismaz divus kritērijus, kas ir svarīgi, lai pieņemtu
                  lēmumu
                </span>
              </li>
              <li className="flex items-start space-x-5">
                <span>3</span>
                <span>Sakārto kritērijus, sākot ar svarīgāko</span>
              </li>
              <li className="flex items-start space-x-5">
                <span>4</span>
                <span>Izvērtē katru savu izvēli katrā no kritērijiem</span>
              </li>
              <li className="flex items-start space-x-5">
                <span>5</span>
                <span>Apskati rezultātu!</span>
              </li>
            </ul>
            <div className="flex justify-center mt-8">
              <button
                className="px-4 py-1 cursor-pointer shadow-sm font-extralight"
                onClick={() => setShowTooltip(false)}
              >
                Sapratu
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddInput;
