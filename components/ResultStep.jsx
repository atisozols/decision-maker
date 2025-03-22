import { useState } from "react";
import { useDecision } from "@/context/decisionContext";
import DecisionMatrix from "./DecisionMatrix";

const ResultStep = () => {
  const { decision } = useDecision();
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
        className="cursor-pointer text-xs lg:text-base underline underline-offset-2 px-4 py-2 rounded mb-4 w-full"
      >
        {showMatrix ? "Paslēpt tabulu" : "Rādīt tabulu"}
      </button>
      {showMatrix && <DecisionMatrix decision={decision} scores={scores} />}
    </div>
  );
};

export default ResultStep;
