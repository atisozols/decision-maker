"use client";
import { useDecision } from "@/context/decisionContext";
import translateRating from "@/utils/translateRating";

const GradingStep = () => {
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
    </div>
  );
};

export default GradingStep;
