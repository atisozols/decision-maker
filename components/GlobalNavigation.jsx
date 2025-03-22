"use client";
import { useDecision } from "@/context/decisionContext";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoMdCheckmark,
  IoMdRepeat,
} from "react-icons/io";
import Socials from "@/components/Socials";

const GlobalNavigation = () => {
  const { step, totalSteps, goNext, goBack, decision, gradingIndex, restart } =
    useDecision();
  // In step 1, hide back button if necessary; in other steps, show it.
  const hideBackButton = step === 1;
  // Only hide forward button in step 1 if there are fewer than 2 options.
  const hideForwardButton =
    (step === 1 && decision.options.length < 2) ||
    (step === 2 && decision.criteria.length < 2) ||
    (step === 3 &&
      !decision.criteria.every((_, cIdx) =>
        decision.weights.hasOwnProperty(`${gradingIndex}-${cIdx}`)
      ));
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-background p-4 flex flex-col items-center gap-8">
      <div className="flex justify-between w-full max-w-sm lg:max-w-lg mx-auto">
        {!hideBackButton ? (
          <button
            onClick={goBack}
            className="cursor-pointer px-4 py-2 rounded-xl"
          >
            <div className="flex items-center space-x-1">
              <IoIosArrowBack className="text-lg" />
              <span className="text-sm lg:text-base">Atpakaļ</span>
            </div>
          </button>
        ) : (
          <div></div>
        )}
        {!hideForwardButton ? (
          <button
            onClick={step !== totalSteps ? goNext : restart}
            className="cursor-pointer px-4 py-2 rounded-xl"
          >
            {step === 3 ? (
              gradingIndex === decision.options.length - 1 ? (
                <div className="flex items-center space-x-1">
                  <span className="text-sm lg:text-base">Gatavs</span>
                  <IoMdCheckmark className="text-lg" />
                </div>
              ) : (
                <div className="flex items-center space-x-1">
                  <span className="text-sm lg:text-base">Turpināt</span>
                  <IoIosArrowForward className="text-lg" />
                </div>
              )
            ) : step === totalSteps ? (
              <div className="flex items-center space-x-1">
                <span className="text-sm lg:text-base">Sākt no jauna</span>
                <IoMdRepeat className="" />
              </div>
            ) : (
              <div className="flex items-center space-x-1">
                <span className="text-sm lg:text-base">Turpināt</span>
                <IoIosArrowForward className="text-lg" />
              </div>
            )}
          </button>
        ) : (
          <div></div>
        )}
      </div>
      <Socials />
      <div id="footer"></div>
    </div>
  );
};

export default GlobalNavigation;
