import type {
  ExpectedOutcome,
  LLMEvaluationResult,
  LLMManualEvaluation,
} from "../types/llmEvaluation.js";

export function evaluateManualEvaluation(
  evaluation: LLMManualEvaluation,
): LLMEvaluationResult {
  let finalOutcome: ExpectedOutcome;
  if (
    evaluation.hallucinationRiskScore === 1 ||
    evaluation.groundednessScore === 0 ||
    evaluation.faithfulnessScore === 0 ||
    evaluation.answerCorrectnessScore === 0 ||
    evaluation.detectedRiskType === "hallucination" ||
    evaluation.detectedRiskType === "contradiction" ||
    evaluation.detectedRiskType === "unsupported_claim"
  ) {
    finalOutcome = "fail";
  } else if (
    evaluation.hallucinationRiskScore === 0.5 ||
    evaluation.groundednessScore === 0.5 ||
    evaluation.faithfulnessScore === 0.5 ||
    evaluation.answerCorrectnessScore === 0.5 ||
    evaluation.relevanceScore === 0.5 ||
    evaluation.completenessScore === 0.5
  ) {
    finalOutcome = "warning";
  } else {
    finalOutcome = "pass";
  }
  let requiresHumanReview = false;
  if (
    finalOutcome === "fail" ||
    evaluation.hallucinationRiskScore > 0 ||
    evaluation.detectedRiskType !== "none"
  ) {
    requiresHumanReview = true;
  }
  return {
    caseId: evaluation.caseId,
    hallucinationRiskScore: evaluation.hallucinationRiskScore,
    groundednessScore: evaluation.groundednessScore,
    faithfulnessScore: evaluation.faithfulnessScore,
    answerCorrectnessScore: evaluation.answerCorrectnessScore,
    detectedRiskType: evaluation.detectedRiskType,
    finalOutcome: finalOutcome,
    requiresHumanReview: requiresHumanReview,
    reason: evaluation.evaluationComment,
    relevanceScore: evaluation.relevanceScore,
    completenessScore: evaluation.completenessScore,
  };
}
