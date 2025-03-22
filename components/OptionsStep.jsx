"use client";
import { useState } from "react";
import { useDecision } from "@/context/decisionContext";
import AddInput from "@/components/AddInput";
import OptionCard from "@/components/OptionCard";

const OptionsStep = () => {
  const { decision, setDecision } = useDecision();
  const [newOption, setNewOption] = useState("");

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
      <h2 className="text-4xl lg:text-6xl text-left font-thin mb-2 w-full">
        <span className="font-black">lēmums</span>
      </h2>
      <p className="italic text-left w-full font-extralight mb-4 text-sm lg:text-base">
        lietvārds
      </p>
      <hr
        style={{ borderTopWidth: "0.5px" }}
        className="w-full border-foreground mb-4"
      />
      <p className="mb-10 text-sm lg:text-base w-full">
        izvēle, kas izriet no vairāku iespēju vispusīgas apsvēršanas,
        pārdomāšanas un apspriešanas
      </p>
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
        placeholder="Ievadi izvēles iespēju"
        value={newOption}
        tooltip={true}
        showQuestion={decision.options.length < 2}
        onChange={(e) => setNewOption(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleAddOption();
        }}
        onClick={handleAddOption}
      />
    </div>
  );
};

export default OptionsStep;
