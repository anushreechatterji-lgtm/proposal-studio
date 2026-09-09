"use client";

import { useRef, useState } from "react";
import { IntakeForm, ProposalType, UploadedDoc } from "@/lib/types";

const PROPOSAL_TYPES: ProposalType[] = ["New business", "Renewal", "Upsell"];

type Props = {
  form: IntakeForm;
  onChange: (form: IntakeForm) => void;
  uploads: UploadedDoc[];
  onUploadsChange: (uploads: UploadedDoc[]) => void;
  onContinue: () => void;
};

export default function IntakeStep({
  form,
  onChange,
  uploads,
  onUploadsChange,
  onContinue,
}: Props) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  function set<K extends keyof IntakeForm>(key: K, value: IntakeForm[K]) {
    onChange({ ...form, [key]: value });
  }

  function addFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    const next: UploadedDoc[] = Array.from(files).map((f) => ({
      id: crypto.randomUUID(),
      name: f.name,
      ext: (f.name.split(".").pop() || "file").slice(0, 4).toUpperCase(),
      sourceGroup: "Uploads",
      confidence: 0,
      includedInProposal: true,
    }));
    onUploadsChange([...uploads, ...next]);
  }

  function removeUpload(id: string) {
    onUploadsChange(uploads.filter((u) => u.id !== id));
  }

  const canContinue = form.clientName.trim().length > 0;

  return (
    <section className="mx-auto w-full max-w-[720px] px-7 pt-13 pb-10">
      <div className="mb-8.5 text-center">
        <p className="mb-2.5 text-[13px] font-semibold tracking-[.04em] text-(--accent) uppercase">
          Step 1 · Intake
        </p>
        <h1 className="mb-3 text-[40px] leading-[1.05] font-semibold tracking-[-0.02em]">
          A few quick questions
        </h1>
        <p className="text-[18px] text-(--sub)">
          So we pull the right data from your systems.
        </p>
      </div>

      <div className="flex flex-col gap-5.5 rounded-[20px] border border-black/[.09] bg-white p-7 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
        <div className="grid grid-cols-2 gap-4.5">
          <label className="block">
            <span className="mb-2 block text-[13px] font-semibold">
              Client / account
            </span>
            <input
              value={form.clientName}
              onChange={(e) => set("clientName", e.target.value)}
              placeholder="Acme Corp"
              className="w-full rounded-xl border border-black/[.09] px-3.5 py-3 text-[15px] outline-none focus:border-(--accent)"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-[13px] font-semibold">
              Opportunity / RFP
            </span>
            <input
              value={form.opportunityName}
              onChange={(e) => set("opportunityName", e.target.value)}
              placeholder="Platform modernization"
              className="w-full rounded-xl border border-black/[.09] px-3.5 py-3 text-[15px] outline-none focus:border-(--accent)"
            />
          </label>
        </div>

        <div>
          <span className="mb-2 block text-[13px] font-semibold">
            Proposal type
          </span>
          <div className="inline-flex gap-0.5 rounded-xl bg-[#f2f2f5] p-[3px]">
            {PROPOSAL_TYPES.map((p) => {
              const active = form.proposalType === p;
              return (
                <button
                  key={p}
                  onClick={() => set("proposalType", p)}
                  className="cursor-pointer rounded-[9px] border-none px-4.5 py-2.5 text-[14px] transition-all"
                  style={{
                    background: active ? "#fff" : "transparent",
                    fontWeight: active ? 600 : 400,
                    boxShadow: active ? "0 1px 3px rgba(0,0,0,.1)" : "none",
                  }}
                >
                  {p}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4.5">
          <label className="block">
            <span className="mb-2 block text-[13px] font-semibold">
              Primary contact
            </span>
            <input
              value={form.primaryContact}
              onChange={(e) => set("primaryContact", e.target.value)}
              placeholder="Sarah Lee"
              className="w-full rounded-xl border border-black/[.09] px-3.5 py-3 text-[15px] outline-none focus:border-(--accent)"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-[13px] font-semibold">
              Due date
            </span>
            <input
              type="date"
              value={form.dueDate}
              onChange={(e) => set("dueDate", e.target.value)}
              className="w-full rounded-xl border border-black/[.09] px-3.5 py-3 text-[15px] outline-none focus:border-(--accent)"
            />
          </label>
        </div>

        <label className="block">
          <span className="mb-2 block text-[13px] font-semibold">
            What should we emphasize?
          </span>
          <textarea
            value={form.scopeNotes}
            onChange={(e) => set("scopeNotes", e.target.value)}
            placeholder="Security & compliance, fast delivery, references in fintech…"
            className="min-h-[80px] w-full resize-y rounded-xl border border-black/[.09] px-3.5 py-3 text-[15px] leading-relaxed outline-none focus:border-(--accent)"
          />
        </label>

        <div>
          <span className="mb-2 block text-[13px] font-semibold">
            Supporting documents{" "}
            <span className="font-normal text-(--sub)">· optional</span>
          </span>
          <label
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              addFiles(e.dataTransfer.files);
            }}
            className="flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-2xl border-[1.5px] border-dashed bg-(--background) p-6 transition-colors"
            style={{
              borderColor: dragOver ? "var(--accent)" : "rgba(0,0,0,.16)",
            }}
          >
            <span className="flex h-8.5 w-8.5 items-center justify-center rounded-[10px] bg-[#eef4fd] text-(--accent)">
              ↑
            </span>
            <span className="text-[14px] font-medium">
              Drop files or <span className="text-(--accent)">browse</span>
            </span>
            <span className="text-[12.5px] text-(--sub)">
              PDF, Word, Excel, slides
            </span>
            <input
              ref={fileInput}
              type="file"
              multiple
              onChange={(e) => addFiles(e.target.files)}
              className="hidden"
            />
          </label>

          {uploads.length > 0 && (
            <div className="mt-3 flex flex-col gap-2">
              {uploads.map((u) => (
                <div
                  key={u.id}
                  className="flex items-center gap-3 rounded-xl bg-[#f6f6f8] px-3.5 py-2.5"
                >
                  <span className="flex h-7.5 w-7.5 items-center justify-center rounded-lg bg-white text-[10px] font-bold text-(--sub)">
                    {u.ext}
                  </span>
                  <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-[14px] font-medium">
                    {u.name}
                  </span>
                  <button
                    onClick={() => removeUpload(u.id)}
                    className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-none bg-black/[.06] text-[14px] text-(--sub)"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6.5 flex items-center justify-between">
        <span className="text-[13px] text-(--sub)">
          These answers scope what we pull next.
        </span>
        <button
          onClick={onContinue}
          disabled={!canContinue}
          className="rounded-full border-none px-7.5 py-3.5 text-[16px] font-medium text-white transition-opacity"
          style={{
            background: canContinue ? "var(--accent)" : "#9fc7f3",
            cursor: canContinue ? "pointer" : "not-allowed",
          }}
        >
          Continue →
        </button>
      </div>
    </section>
  );
}
