import { manualEvaluations } from "../test-data/llmManualEvaluations.js";
import { evaluateManualEvaluationDataset } from "../src/evaluation/evaluateManualEvaluationDataset.js";
import { generateLLMEvaluationReport } from "../src/reporting/generateEvaluationReport.js";
import { describe, expect, test } from "vitest";

describe("generateEvaluationReport", () => {
  test("Check correctness of the values in the evaluation report", () => {
    const manualReport = evaluateManualEvaluationDataset(manualEvaluations);
    const report = generateLLMEvaluationReport(manualReport);

    expect(report).toContain("LLM Evaluation Report");
    expect(report).toContain("Dataset size: 6");
    expect(report).toContain("Passed: 1");
    expect(report).toContain("Warnings: 1");
    expect(report).toContain("Failed: 4");
    expect(report).toContain("Human review required: 5");
    expect(report).toContain("Quality gate result: FAIL");
    expect(report).toContain("Release should be blocked");
  });
});
