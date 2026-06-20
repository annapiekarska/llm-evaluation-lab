import type { LLMEvaluationDatasetResult } from "../types/llmEvaluation.js";

export function generateLLMEvaluationReport(
  evaluation: LLMEvaluationDatasetResult,
): string {
  let recommendation: string;

  if (evaluation.qualityGateResult === "fail") {
    recommendation =
      "Release should be blocked until the failed evaluation cases are resolved.";
  } else if (evaluation.qualityGateResult === "warning") {
    recommendation = "The evaluation results require review before release.";
  } else {
    recommendation = "The evaluated dataset meets the release quality gate.";
  }

  const lines = [
    "LLM Evaluation Report",
    "",
    `Dataset size: ${evaluation.totalCases}`,
    `Passed: ${evaluation.passedCount}`,
    `Warnings: ${evaluation.warningCount}`,
    `Failed: ${evaluation.failedCount}`,
    `Human review required: ${evaluation.humanReviewCount}`,
    "",
    "Average metrics:",
    `Groundedness: ${(evaluation.averageGroundednessScore * 100).toFixed(2)}%`,
    `Faithfulness: ${(evaluation.averageFaithfulnessScore * 100).toFixed(2)}%`,
    `Relevance: ${(evaluation.averageRelevanceScore * 100).toFixed(2)}%`,
    `Completeness: ${(evaluation.averageCompletenessScore * 100).toFixed(2)}%`,
    `Answer correctness: ${(evaluation.averageAnswerCorrectnessScore * 100).toFixed(2)}%`,
    `Hallucination risk: ${(evaluation.averageHallucinationRiskScore * 100).toFixed(2)}%`,
    "",
    `Quality gate result: ${evaluation.qualityGateResult.toUpperCase()}`,
    `Recommendation: ${recommendation}`,
  ];

  return lines.join("\n");
}
