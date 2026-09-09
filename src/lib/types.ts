export type ProposalType = "New business" | "Renewal" | "Upsell";

export type IntakeForm = {
  clientName: string;
  opportunityName: string;
  proposalType: ProposalType;
  primaryContact: string;
  dueDate: string;
  scopeNotes: string;
};

export type UploadedDoc = {
  id: string;
  name: string;
  ext: string;
  sourceGroup: string;
  confidence: number;
  includedInProposal: boolean;
};

export type StepId = "intake" | "research" | "review" | "export";

export const STEPS: { id: StepId; label: string }[] = [
  { id: "intake", label: "Intake" },
  { id: "research", label: "Research" },
  { id: "review", label: "Review" },
  { id: "export", label: "Export" },
];
