import type { LLMEvaluationCase } from "../src/types/llmEvaluation.js";

export const evaluationCases: LLMEvaluationCase[] = [
  {
    id: "case-001",
    category: "refund_policy",
    userPrompt: "Can I return a product after opening it?",
    sourceContext:
      "Products can be returned within 14 days only if they are unused and unopened.",
    modelAnswer:
      "No. You can return the product within 14 days, but only if it is unused and unopened.",
    expectedOutcome: "pass",
    riskType: "none",
  },
  {
    id: "case-002",
    category: "refund_policy",
    userPrompt: "What are the conditions for returning a product?",
    sourceContext:
      "Products can be returned within 14 days only if they are unused and unopened.",
    modelAnswer:
      "Products can be returned within 14 days only if they are unused and unopened. To start the return process, you must call customer support.",
    expectedOutcome: "fail",
    riskType: "hallucination",
  },
  {
    id: "case-003",
    category: "shipping_policy",
    userPrompt: "How long does shipping take?",
    sourceContext: "The standard shipping takes from 3 to 5 business days.",
    modelAnswer:
      "The standard shipping takes from 3 to 5 business days. You will receive your tracking number on your e-mail.",
    expectedOutcome: "fail",
    riskType: "unsupported_claim",
  },
  {
    id: "case-004",
    category: "subscription_policy",
    userPrompt: "Can I cancel the subscription?",
    sourceContext: "You can cancel the subscription anytime.",
    modelAnswer:
      "Cancelling the subscription is available only after 12 months",
    expectedOutcome: "fail",
    riskType: "contradiction",
  },
  {
    id: "case-005",
    category: "refund_policy",
    userPrompt: "How long do I have to return a product?",
    sourceContext:
      "Products can be returned within 14 days only if they are unused and unopened.",
    modelAnswer: "You can return the product within 14 days.",
    expectedOutcome: "warning",
    riskType: "incomplete",
  },
  {
    id: "case-006",
    category: "support_availability",
    userPrompt: "At what time is the client support available?",
    sourceContext:
      "The support department works from Monday to Friday at 9:00 AM – 5:00 PM",
    modelAnswer:
      "Products can be returned within 14 days only if they are unused and unopened.",
    expectedOutcome: "fail",
    riskType: "irrelevant",
  },
];
