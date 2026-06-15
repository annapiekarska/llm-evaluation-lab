import type { LLMManualEvaluation } from "../src/types/llmEvaluation.js";

export const manualEvaluations: LLMManualEvaluation[] = [
  {
    caseId: "case-001",
    groundednessScore: 1,
    faithfulnessScore: 1,
    relevanceScore: 1,
    completenessScore: 1,
    answerCorrectnessScore: 1,
    hallucinationRiskScore: 0,
    detectedRiskType: "none",
    evaluationComment:
      "Matches the source context and directly answers the user’s question.",
  },
  {
    caseId: "case-002",
    groundednessScore: 0.5,
    faithfulnessScore: 0.5,
    relevanceScore: 1,
    completenessScore: 1,
    answerCorrectnessScore: 0.5,
    hallucinationRiskScore: 1,
    detectedRiskType: "hallucination",
    evaluationComment:
      "The answer contains an unsupported claim about contacting customer support.",
  },
  {
    caseId: "case-003",
    groundednessScore: 0.5,
    faithfulnessScore: 0.5,
    relevanceScore: 1,
    completenessScore: 1,
    answerCorrectnessScore: 0.5,
    hallucinationRiskScore: 0.5,
    detectedRiskType: "unsupported_claim",
    evaluationComment:
      "The answer contains an unsupported claim about receiving a tracking number by email.",
  },
  {
    caseId: "case-004",
    groundednessScore: 0,
    faithfulnessScore: 0,
    relevanceScore: 1,
    completenessScore: 1,
    answerCorrectnessScore: 0,
    hallucinationRiskScore: 1,
    detectedRiskType: "contradiction",
    evaluationComment:
      "The answer directly contradicts the source by claiming that the subscription can only be cancelled after 12 months.",
  },
  {
    caseId: "case-005",
    groundednessScore: 1,
    faithfulnessScore: 1,
    relevanceScore: 1,
    completenessScore: 0.5,
    answerCorrectnessScore: 0.5,
    hallucinationRiskScore: 0,
    detectedRiskType: "incomplete",
    evaluationComment:
      "The answer provides the correct return period but omits the requirement that the product must be unused and unopened",
  },
  {
    caseId: "case-006",
    groundednessScore: 0,
    faithfulnessScore: 0,
    relevanceScore: 0,
    completenessScore: 0,
    answerCorrectnessScore: 0,
    hallucinationRiskScore: 0.5,
    detectedRiskType: "irrelevant",
    evaluationComment:
      "The answer is unrelated to the question and discusses the return policy instead of customer support availability.",
  },
];
