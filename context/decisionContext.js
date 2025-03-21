"use client";
import { createContext, useState, useContext } from "react";

const DecisionContext = createContext();

export function DecisionProvider({ children }) {
  const [decision, setDecision] = useState({
    criteria: [],
    options: [],
    weights: {},
    scores: {},
  });

  // Navigation state and functions
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const [gradingIndex, setGradingIndex] = useState(0);
  const goNext = () => {
    if (step === 3) {
      if (gradingIndex < decision.options.length - 1) {
        setGradingIndex(gradingIndex + 1);
      } else {
        setStep(4);
      }
    } else {
      if (step < totalSteps) {
        if (step + 1 === 3) {
          setGradingIndex(0);
        }
        setStep(step + 1);
      }
    }
  };
  const goBack = () => {
    if (step === 3) {
      if (gradingIndex > 0) {
        setGradingIndex(gradingIndex - 1);
      } else {
        setStep(2);
      }
    } else {
      if (step > 1) {
        setStep(step - 1);
      }
    }
  };
  const restart = () => {
    setStep(1);
    setDecision({
      criteria: [],
      options: [],
      weights: {},
      scores: {},
    });
  };

  return (
    <DecisionContext.Provider
      value={{
        decision,
        setDecision,
        step,
        goNext,
        goBack,
        restart,
        totalSteps,
        gradingIndex,
      }}
    >
      {children}
    </DecisionContext.Provider>
  );
}

export function useDecision() {
  return useContext(DecisionContext);
}
