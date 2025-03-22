"use client";
import { DecisionProvider, useDecision } from "@/context/decisionContext";
import OptionsStep from "@/components/OptionsStep";
import CriteriaStep from "@/components/CriteriaStep";
import GradingStep from "@/components/GradingStep";
import ResultStep from "@/components/ResultStep";
import GlobalNavigation from "@/components/GlobalNavigation";

const HomeContent = () => {
  const { step } = useDecision();

  return (
    <div className="relative" style={{ minHeight: "80vh", marginTop: "15vh" }}>
      <div className="flex flex-col items-center p-8 space-y-6">
        {step === 1 && <OptionsStep />}
        {step === 2 && <CriteriaStep />}
        {step === 3 && <GradingStep />}
        {step === 4 && <ResultStep />}
      </div>
      <GlobalNavigation />
    </div>
  );
};

export default function Home() {
  return (
    <DecisionProvider>
      <HomeContent />
    </DecisionProvider>
  );
}
