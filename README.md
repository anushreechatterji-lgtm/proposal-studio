# Proposal Studio

An AI-assisted sales proposal tool: Intake, Research, Review, Export.

## Status

This is milestone 1 of the build plan: a working Next.js shell with the four-step
navigation and a fully functional Intake form. Research, Review, and Export are
placeholder screens describing what gets wired up next (document parsing, an LLM
research agent, proposal generation, and PDF/email export).

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4

## Local development

```bash
npm install
npm run dev
```

## Deploying

Import this repository into Vercel (vercel.com → Add New Project → Import Git
Repository). No extra configuration is needed for this milestone; environment
variables for the LLM, database, storage, and email providers will be added as
those stages are built out.
