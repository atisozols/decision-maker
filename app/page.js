"use client";
import { useState, useRef } from "react";
import { DecisionProvider, useDecision } from "@/context/decisionContext";
import { FiEdit2 } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import {
  IoIosArrowUp,
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosArrowBack,
  IoMdCheckmark,
  IoMdRepeat,
} from "react-icons/io";
import { FaInstagram, FaPlus, FaXTwitter, FaYoutube } from "react-icons/fa6";
import translateRating from "@/utils/translateRating";

function AddInput({ placeholder, value, onChange, onKeyDown, onClick }) {
  return (
    <div
      style={{ marginBottom: "20vh" }}
      className="flex mb-4 shadow-md rounded-xl dark:border border-accent w-full max-w-sm lg:max-w-lg font-thin h-14 lg:h-16 lg:text-lg"
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
    </div>
  );
}

// New component for rendering an option with inline edit functionality
function OptionCard({ option, index, onAccept, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(option);

  return (
    <li className="shadow-md p-4 mb-1 lg:mb-3 rounded-xl dark:border border-accent flex items-center justify-between max-w-sm lg:max-w-lg mx-auto h-14 lg:h-16 lg:text-lg">
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
              className="cursor-pointer text-sm lg:text-lg text-red-500"
            >
              <MdClose className="text-xl lg:text-3xl" />
            </button>
          </div>
        </>
      )}
    </li>
  );
}

// New component for rendering a criterion with inline edit functionality and move controls
function CriterionCard({
  criterion,
  index,
  onAccept,
  onDelete,
  onMoveUp,
  onMoveDown,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(criterion);

  return (
    <div className="shadow-md p-4 mb-1 lg:mb-3 rounded-xl dark:border border-accent flex items-center justify-between h-14 lg:h-16 lg:text-lg">
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
              className="cursor-pointer text-sm lg:text-lg text-red-500"
            >
              <MdClose className="text-xl lg:text-3xl" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// Step 1: Options - What are you deciding between?
function OptionsStep({ onNext }) {
  const { decision, setDecision } = useDecision();
  const [newOption, setNewOption] = useState("");
  const addInputRef = useRef(null);

  const handleAddOption = () => {
    if (newOption.trim() !== "") {
      setDecision((prev) => ({
        ...prev,
        options: [...prev.options, newOption.trim()],
      }));
      setNewOption("");
      document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const updateOption = (index, newText) => {
    if (newText.trim() !== "") {
      const newOptions = [...decision.options];
      newOptions[index] = newText.trim();
      setDecision((prev) => ({ ...prev, options: newOptions }));
    }
  };

  const handleDeleteOption = (index) => {
    const newOptions = decision.options.filter((_, i) => i !== index);
    setDecision((prev) => ({ ...prev, options: newOptions }));
  };

  return (
    <div className="flex flex-col items-center w-full max-w-sm lg:max-w-lg mx-auto">
      <h2 className="text-3xl lg:text-5xl text-center font-thin mb-8">
        <span className="font-black">Varianti</span>, starp kuriem jāizvēlas
      </h2>
      {decision.options.length > 0 && (
        <ul className="w-full max-w-lg font-extralight">
          {decision.options.map((option, index) => (
            <OptionCard
              key={index}
              option={option}
              index={index}
              onAccept={updateOption}
              onDelete={handleDeleteOption}
            />
          ))}
        </ul>
      )}
      <AddInput
        placeholder="Ievadi variantu"
        value={newOption}
        onChange={(e) => setNewOption(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleAddOption();
        }}
        onClick={handleAddOption}
      />
    </div>
  );
}

// Replace the entire CriteriaStep component with this code:

function CriteriaStep({ onNext, onBack }) {
  const { decision, setDecision } = useDecision();
  const [newCriterion, setNewCriterion] = useState("");
  const addInputRef = useRef(null);

  const handleAddCriterion = () => {
    if (newCriterion.trim() !== "") {
      setDecision((prev) => ({
        ...prev,
        criteria: [...prev.criteria, newCriterion.trim()],
      }));
      setNewCriterion("");
      document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const moveCriterionUp = (index) => {
    if (index === 0) return;
    setDecision((prev) => {
      const newCriteria = [...prev.criteria];
      [newCriteria[index - 1], newCriteria[index]] = [
        newCriteria[index],
        newCriteria[index - 1],
      ];
      return { ...prev, criteria: newCriteria };
    });
  };

  const moveCriterionDown = (index) => {
    if (index === decision.criteria.length - 1) return;
    setDecision((prev) => {
      const newCriteria = [...prev.criteria];
      [newCriteria[index], newCriteria[index + 1]] = [
        newCriteria[index + 1],
        newCriteria[index],
      ];
      return { ...prev, criteria: newCriteria };
    });
  };

  const updateCriterion = (index, newText) => {
    if (newText.trim() !== "") {
      const newCriteria = [...decision.criteria];
      newCriteria[index] = newText.trim();
      setDecision((prev) => ({ ...prev, criteria: newCriteria }));
    }
  };

  const handleDeleteCriterion = (index) => {
    const newCriteria = decision.criteria.filter((_, i) => i !== index);
    setDecision((prev) => ({ ...prev, criteria: newCriteria }));
  };

  return (
    <div className="flex flex-col items-center w-full max-w-sm lg:max-w-lg mx-auto">
      <h2 className="text-3xl lg:text-5xl text-center font-thin mb-4">
        <span className="font-black">Kritēriji</span>, kas ietekmē lēmumu
      </h2>
      <p className="mb-8 font-thin">Sakārto tos prioritārā secībā!</p>
      {decision.criteria.length > 0 && (
        <ul className="w-full max-w-lg font-extralight">
          {decision.criteria.map((criterion, index) => (
            <CriterionCard
              key={index}
              criterion={criterion}
              index={index}
              onAccept={updateCriterion}
              onDelete={handleDeleteCriterion}
              onMoveUp={() => moveCriterionUp(index)}
              onMoveDown={() => moveCriterionDown(index)}
            />
          ))}
        </ul>
      )}
      <AddInput
        placeholder="Ievadi kritēriju"
        value={newCriterion}
        onChange={(e) => setNewCriterion(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleAddCriterion();
        }}
        onClick={handleAddCriterion}
      />
    </div>
  );
}

function GradingStep() {
  const { decision, setDecision, gradingIndex } = useDecision();
  const currentOption = decision.options[gradingIndex];

  const handleInputChange = (criterionIndex, value) => {
    const key = `${gradingIndex}-${criterionIndex}`;
    let numVal = parseInt(value, 10);
    if (isNaN(numVal) || numVal < 1 || numVal > 100) {
      numVal = 50;
    }
    setDecision((prev) => ({
      ...prev,
      weights: {
        ...prev.weights,
        [key]: numVal,
      },
    }));
  };

  return (
    <div
      className="w-full max-w-sm lg:max-w-lg mx-auto"
      style={{ marginBottom: "20vh" }}
    >
      <h2 className="text-2xl lg:text-4xl font-thin mb-8">
        <span className="font-black">{currentOption}</span> katrā kritērijā
      </h2>
      <div className="mb-4">
        {decision.criteria.map((criterion, cIdx) => {
          const key = `${gradingIndex}-${cIdx}`;
          return (
            <div key={key} className="mb-2">
              <label className="block font-thin lg:text-lg mb-1">
                {criterion}:{" "}
                <span className="font-light">
                  {translateRating(decision.weights[key] || 0)}
                </span>
              </label>
              <input
                type="range"
                min="1"
                max="100"
                value={decision.weights[key] || 1}
                onChange={(e) => handleInputChange(cIdx, e.target.value)}
                className="w-full"
              />
            </div>
          );
        })}
      </div>
      {/* Removed the local Next button. Navigation in grading is now managed globally via GlobalNavigation. */}
    </div>
  );
}
// Step 4: Results - Show best decision and optionally the decision matrix
function ResultStep({ onBack, onRestart }) {
  const { decision, setDecision } = useDecision();
  const [showMatrix, setShowMatrix] = useState(false);

  const scores = decision.options.map((option, oIdx) => {
    let total = 0;
    decision.criteria.forEach((criterion, cIdx) => {
      const key = `${oIdx}-${cIdx}`;
      const val = parseInt(decision.weights[key], 10) || 0;
      // Higher priority criteria (at lower index) get a higher weight
      const weightFactor = decision.criteria.length - cIdx;
      total += val * weightFactor;
    });
    return total;
  });
  const bestScore = Math.max(...scores);
  const bestOptionIndex = scores.indexOf(bestScore);
  const bestOption = decision.options[bestOptionIndex];

  return (
    <div className="w-full max-w-sm lg:max-w-lg mx-auto">
      <h2 className="text-3xl lg:text-5xl text-center font-thin mb-10">
        <span className="font-black">{bestOption}</span> ir labākais variants!
      </h2>
      <p className="text-center lg:text-lg mb-8 font-extralight">
        Apsveicu ar veiksmīgu lēmumu!
      </p>

      <button
        onClick={() => setShowMatrix(!showMatrix)}
        className="opacity-50 text-xs lg:text-base underline underline-offset-2 px-4 py-2 rounded mb-4 w-full"
      >
        {showMatrix ? "Paslēpt tabulu" : "Rādīt tabulu"}
      </button>
      {showMatrix && (
        <div
          className="overflow-x-auto text-xs lg:text-base font-thin"
          style={{ marginBottom: "20vh" }}
        >
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2 text-left"></th>
                <th className="border p-2 font-extralight">Kopā</th>
                {decision.criteria.map((criterion, cIdx) => (
                  <th key={cIdx} className="border p-2 font-extralight">
                    {criterion} ({cIdx + 1})
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {decision.options
                .map((option, oIdx) => ({
                  option,
                  score: scores[oIdx],
                  originalIndex: oIdx,
                }))
                .sort((a, b) => b.score - a.score)
                .map(({ option, score, originalIndex }, idx) => (
                  <tr key={idx}>
                    <td className="border p-2 font-semibold">{option}</td>
                    <td className="border p-2 font-black">{score}</td>
                    {decision.criteria.map((criterion, cIdx) => {
                      const key = `${originalIndex}-${cIdx}`;
                      return (
                        <td key={key} className="border p-2">
                          {decision.weights[key]
                            ? parseInt(decision.weights[key], 10) *
                              (decision.criteria.length - cIdx)
                            : ""}
                        </td>
                      );
                    })}
                  </tr>
                ))}
            </tbody>
          </table>
          <p className="mt-4 lg:text-lg font-thin">
            Prioritāte tiek izmantota kā svars, aprēķinot rezultātu
          </p>
        </div>
      )}
    </div>
  );
}

function GlobalNavigation() {
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
            <IoIosArrowBack className="text-2xl" />
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
                <IoMdCheckmark className="text-2xl" />
              ) : (
                <IoIosArrowForward className="text-2xl" />
              )
            ) : step === totalSteps ? (
              <IoMdRepeat className="text-xl" />
            ) : (
              <IoIosArrowForward className="text-2xl" />
            )}
          </button>
        ) : (
          <div></div>
        )}
      </div>
      <div className="w-full max-w-sm mx-auto flex items-center justify-center gap-8">
        <a href="https://x.com/atis_ozols">
          <FaXTwitter className="text-lg" />
        </a>
        <a href="https://youtube.com/@atisozols">
          <FaYoutube className="text-xl" />
        </a>
        <a href="https://instagram.com/atisozols">
          <FaInstagram className="text-lg" />
        </a>
      </div>
      <div id="footer"></div>
    </div>
  );
}

function HomeContent() {
  const { step } = useDecision();

  return (
    <div className="relative" style={{ minHeight: "70vh" }}>
      <div className="flex flex-col items-center p-8 space-y-6">
        {step === 1 && <OptionsStep />}
        {step === 2 && <CriteriaStep />}
        {step === 3 && <GradingStep />}
        {step === 4 && <ResultStep />}
      </div>
      <GlobalNavigation />
    </div>
  );
}

export default function Home() {
  return (
    <DecisionProvider>
      <HomeContent />
    </DecisionProvider>
  );
}
