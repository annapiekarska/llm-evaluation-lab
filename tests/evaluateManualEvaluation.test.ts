import { describe, expect, test } from "vitest";
import { manualEvaluations } from "../test-data/llmManualEvaluations.js";
import { evaluateManualEvaluation } from "../src/evaluation/evaluateManualEvaluation.js";

describe("evaluateManualEvaluation", () => {
  test("Check if final outcome is pass, then human review is not needed", () => {
    const manualEvaluation = manualEvaluations[0]!;
    const result = evaluateManualEvaluation(manualEvaluation);

    expect(result.finalOutcome).toBe("pass");
    expect(result.requiresHumanReview).toBe(false);
    expect(result.caseId).toBe("case-001");
  });
  test("Check if final outcome is fail, then human review is needed", () => {
    const manualEvaluation = manualEvaluations[1]!;
    const result = evaluateManualEvaluation(manualEvaluation);

    expect(result.finalOutcome).toBe("fail");
    expect(result.requiresHumanReview).toBe(true);
    expect(result.caseId).toBe("case-002");
  });
  test("Check if final outcome is warning, then human review is needed", () => {
    const manualEvaluation = manualEvaluations[4]!;
    const result = evaluateManualEvaluation(manualEvaluation);

    expect(result.finalOutcome).toBe("warning");
    expect(result.requiresHumanReview).toBe(true);
    expect(result.caseId).toBe("case-005");
  });
});
