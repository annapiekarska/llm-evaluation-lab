import { evaluateManualEvaluation } from "./evaluateManualEvaluation.js";
import type {
  LLMEvaluationDatasetResult,
  LLMManualEvaluation,
  ExpectedOutcome,
} from "../types/llmEvaluation.js";

export function evaluateManualEvaluationDataset(
  evaluations: LLMManualEvaluation[],
): LLMEvaluationDatasetResult {
  const results = evaluations.map((evaluation) =>
    evaluateManualEvaluation(evaluation),
  );

  const totalCases = results.length;
  const passedCount = results.filter(
    (result) => result.finalOutcome === "pass",
  ).length;
  const warningCount = results.filter(
    (result) => result.finalOutcome === "warning",
  ).length;
  const failedCount = results.filter(
    (result) => result.finalOutcome === "fail",
  ).length;
  const humanReviewCount = results.filter(
    (result) => result.requiresHumanReview === true,
  ).length;

  const averageGroundednessScore =
    totalCases === 0
      ? 0
      : results.reduce((sum, result) => sum + result.groundednessScore, 0) /
        totalCases;

  const averageFaithfulnessScore =
    totalCases === 0
      ? 0
      : results.reduce((sum, result) => sum + result.faithfulnessScore, 0) /
        totalCases;

  const averageRelevanceScore =
    totalCases === 0
      ? 0
      : results.reduce((sum, result) => sum + result.relevanceScore, 0) /
        totalCases;

  const averageCompletenessScore =
    totalCases === 0
      ? 0
      : results.reduce((sum, result) => sum + result.completenessScore, 0) /
        totalCases;
  const averageAnswerCorrectnessScore =
    totalCases === 0
      ? 0
      : results.reduce(
          (sum, result) => sum + result.answerCorrectnessScore,
          0,
        ) / totalCases;
  const averageHallucinationRiskScore =
    totalCases === 0
      ? 0
      : results.reduce(
          (sum, result) => sum + result.hallucinationRiskScore,
          0,
        ) / totalCases;

  let qualityGateResult: ExpectedOutcome = "pass";
  if (failedCount > 0) {
    qualityGateResult = "fail";
  } else if (warningCount > 0) {
    qualityGateResult = "warning";
  }
  return {
    totalCases: totalCases,
    passedCount: passedCount,
    warningCount: warningCount,
    failedCount: failedCount,
    humanReviewCount: humanReviewCount,
    averageGroundednessScore: averageGroundednessScore,
    averageFaithfulnessScore: averageFaithfulnessScore,
    averageRelevanceScore: averageRelevanceScore,
    averageCompletenessScore: averageCompletenessScore,
    averageAnswerCorrectnessScore: averageAnswerCorrectnessScore,
    averageHallucinationRiskScore: averageHallucinationRiskScore,
    qualityGateResult,
    results,
  };
}
