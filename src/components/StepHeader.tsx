"use client";

import { STEPS, StepId } from "@/lib/types";

type Props = {
  currentStep: StepId;
  furthestStep: StepId;
  onSelect: (step: StepId) => void;
  onRestart: () => void;
};

const ORDER: StepId[] = ["intake", "research", "review", "export"];

export default function StepHeader({
  currentStep,
  furthestStep,
  onSelect,
  onRestart,
}: Props) {
  const currentIndex = ORDER.indexOf(currentStep);
  const furthestIndex = ORDER.indexOf(furthestStep);

  return (
    <header className="sticky top-0 z-20 flex items-center gap-6 border-b border-black/[.09] bg-[rgba(251,251,253,0.82)] px-7 py-3.5 backdrop-blur-xl">
      <div className="flex min-w-[160px] items-center gap-2.5">
        <div className="flex h-[26px] w-[26px] items-center justify-center rounded-lg bg-(--accent)">
          <div className="h-[11px] w-[11px] rounded-[3px] border-2 border-white" />
        </div>
        <span className="text-[16px] font-semibold tracking-[-0.01em]">
          Proposal Studio
        </span>
      </div>

      <nav className="flex flex-1 justify-center">
        <div className="flex items-center gap-0.5">
          {STEPS.map((step, i) => {
            const isCurrent = step.id === currentStep;
            const isDone = i < currentIndex;
            const isReachable = i <= furthestIndex;
            return (
              <button
                key={step.id}
                onClick={() => isReachable && onSelect(step.id)}
                disabled={!isReachable}
                className="flex items-center gap-2.5 rounded-full px-3.5 py-1.5 transition-colors disabled:cursor-not-allowed"
                style={{
                  background: isCurrent ? "#eef4fd" : "transparent",
                }}
              >
                <span
                  className="flex h-[22px] w-[22px] items-center justify-center rounded-full text-[12px] font-semibold"
                  style={{
                    background: isDone
                      ? "var(--accent)"
                      : isCurrent
                        ? "#fff"
                        : "#f2f2f5",
                    color: isDone
                      ? "#fff"
                      : isCurrent
                        ? "var(--accent)"
                        : "var(--sub)",
                    border: isCurrent ? "1.5px solid var(--accent)" : "none",
                  }}
                >
                  {isDone ? "✓" : i + 1}
                </span>
                <span
                  className="text-[13px] tracking-[-0.01em]"
                  style={{
                    fontWeight: isCurrent ? 600 : 500,
                    color: isCurrent ? "var(--foreground)" : "var(--sub)",
                  }}
                >
                  {step.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      <div className="flex min-w-[160px] items-center justify-end gap-3">
        <button
          onClick={onRestart}
          className="cursor-pointer border-none bg-transparent text-[13px] text-(--sub)"
        >
          Restart
        </button>
        <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-linear-to-br from-[#c7c7cc] to-[#8e8e93] text-[12px] font-semibold text-white">
          {"BK"}
        </div>
      </div>
    </header>
  );
}
