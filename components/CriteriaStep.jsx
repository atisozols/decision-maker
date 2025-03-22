"use client";
import CriterionCard from "./CriterionCard";
import AddInput from "./AddInput";
import { useDecision } from "@/context/decisionContext";
import { useState } from "react";

const CriteriaStep = () => {
  const { decision, setDecision } = useDecision();
  const [newCriterion, setNewCriterion] = useState("");

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
      <h2 className="text-3xl lg:text-5xl text-left font-thin mb-4">
        <span className="font-black">kritēriji</span>*, kas ietekmē lēmumu:
      </h2>
      <p className="mb-8 font-thin w-full text-right text-sm lg:text-base">
        *sakārto tos prioritārā secībā!
      </p>
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
};

export default CriteriaStep;
