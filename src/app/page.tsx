"use client";

import { useState } from "react";
import StepHeader from "@/components/StepHeader";
import IntakeStep from "@/components/steps/IntakeStep";
import PlaceholderStep from "@/components/steps/PlaceholderStep";
import { IntakeForm, StepId, UploadedDoc } from "@/lib/types";

const EMPTY_FORM: IntakeForm = {
  clientName: "",
  opportunityName: "",
  proposalType: "New business",
  primaryContact: "",
  dueDate: "",
  scopeNotes: "",
};

const ORDER: StepId[] = ["intake", "research", "review", "export"];

export default function Home() {
  const [step, setStep] = useState<StepId>("intake");
  const [furthestStep, setFurthestStep] = useState<StepId>("intake");
  const [form, setForm] = useState<IntakeForm>(EMPTY_FORM);
  const [uploads, setUploads] = useState<UploadedDoc[]>([]);

  function goTo(next: StepId) {
    setStep(next);
    if (ORDER.indexOf(next) > ORDER.indexOf(furthestStep)) {
      setFurthestStep(next);
    }
  }

  function restart() {
    setForm(EMPTY_FORM);
    setUploads([]);
    setStep("intake");
    setFurthestStep("intake");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <StepHeader
        currentStep={step}
        furthestStep={furthestStep}
        onSelect={goTo}
        onRestart={restart}
      />

      <main className="flex flex-1 flex-col">
        {step === "intake" && (
          <IntakeStep
            form={form}
            onChange={setForm}
            uploads={uploads}
            onUploadsChange={setUploads}
            onContinue={() => goTo("research")}
          />
        )}

        {step === "research" && (
          <PlaceholderStep
            stepNumber={2}
            stepName="Research"
            title="What the agent is using"
            description="Pulled automatically from your systems. Interrogate it, remove anything you don't want."
            comingNext={[
              "Parsing the documents you uploaded and any connected Excel sheets",
              "Grouping sources with a confidence score per document",
              "A research chat backed by Claude to ask questions about what it found",
            ]}
            onBack={() => goTo("intake")}
            onContinue={() => goTo("review")}
          />
        )}

        {step === "review" && (
          <PlaceholderStep
            stepNumber={3}
            stepName="Review"
            title={`Partnership Proposal — ${form.clientName || "Your client"}`}
            description="Draft an outline, generate the proposal, then refine it inline."
            comingNext={[
              "An assistant panel that proposes a slide outline from the research",
              "One-click generation of the full proposal from that outline",
              "Click-to-edit text directly on the generated slides",
            ]}
            onBack={() => goTo("research")}
            onContinue={() => goTo("export")}
          />
        )}

        {step === "export" && (
          <PlaceholderStep
            stepNumber={4}
            stepName="Export"
            title="Ready to send"
            description="Export, email, or convert the finished proposal to PDF."
            comingNext={[
              "Render the generated proposal to a PDF",
              "Email it straight to the primary contact",
              "Download a copy for offline use",
            ]}
            onBack={() => goTo("review")}
          />
        )}
      </main>
    </div>
  );
}
