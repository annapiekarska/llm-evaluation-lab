import { describe, expect, test } from "vitest";
import { evaluateManualEvaluationDataset } from "../src/evaluation/evaluateManualEvaluationDataset.js";
import { manualEvaluations } from "../test-data/llmManualEvaluations.js";

describe("evaluateManualEvaluationDataset", () => {
  test("Check the manualEvaluation dataset results are calculated correctly", () => {
    const result = evaluateManualEvaluationDataset(manualEvaluations);

    expect(result.totalCases).toBe(6);
    expect(result.passedCount).toBe(1);
    expect(result.warningCount).toBe(1);
    expect(result.failedCount).toBe(4);
    expect(result.humanReviewCount).toBe(5);
    expect(result.qualityGateResult).toBe("fail");
    expect(result.results).toHaveLength(6);

    expect(result.averageGroundednessScore).toBeCloseTo(0.5);
    expect(result.averageFaithfulnessScore).toBeCloseTo(0.5);
    expect(result.averageRelevanceScore).toBeCloseTo(0.8333333333333334);
    expect(result.averageCompletenessScore).toBeCloseTo(0.75);
    expect(result.averageAnswerCorrectnessScore).toBeCloseTo(
      0.4166666666666667,
    );
    expect(result.averageHallucinationRiskScore).toBeCloseTo(0.5);
  });
});
