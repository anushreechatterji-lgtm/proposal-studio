"use client";

type Props = {
  stepNumber: number;
  stepName: string;
  title: string;
  description: string;
  comingNext: string[];
  onBack: () => void;
  onContinue?: () => void;
  continueLabel?: string;
};

export default function PlaceholderStep({
  stepNumber,
  stepName,
  title,
  description,
  comingNext,
  onBack,
  onContinue,
  continueLabel,
}: Props) {
  return (
    <section className="mx-auto w-full max-w-[720px] px-7 pt-10 pb-10">
      <div className="mb-6 text-center">
        <p className="mb-2.5 text-[13px] font-semibold tracking-[.04em] text-(--accent) uppercase">
          Step {stepNumber} · {stepName}
        </p>
        <h1 className="mb-3 text-[34px] leading-[1.05] font-semibold tracking-[-0.02em]">
          {title}
        </h1>
        <p className="text-[17px] text-(--sub)">{description}</p>
      </div>

      <div className="rounded-[20px] border border-dashed border-black/[.14] bg-white p-7">
        <p className="mb-3 text-[13px] font-semibold tracking-[.04em] text-(--sub) uppercase">
          Wired up next
        </p>
        <ul className="flex flex-col gap-2">
          {comingNext.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2.5 text-[14.5px] leading-relaxed"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-(--accent)" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6.5 flex items-center justify-between">
        <button
          onClick={onBack}
          className="cursor-pointer rounded-full border border-black/[.09] bg-white px-6 py-3.5 text-[15px] font-medium"
        >
          Back
        </button>
        {onContinue && (
          <button
            onClick={onContinue}
            className="cursor-pointer rounded-full border-none bg-(--accent) px-7.5 py-3.5 text-[16px] font-medium text-white"
          >
            {continueLabel ?? "Continue →"}
          </button>
        )}
      </div>
    </section>
  );
}
