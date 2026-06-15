export type ExpectedOutcome = "pass" | "warning" | "fail";
export type EvaluationScore = 0 | 0.5 | 1;
export type RiskType =
  | "none"
  | "hallucination"
  | "unsupported_claim"
  | "contradiction"
  | "incomplete"
  | "irrelevant";
export type LLMEvaluationCase = {
  id: string;
  category: string;
  userPrompt: string;
  sourceContext: string;
  modelAnswer: string;
  expectedOutcome: ExpectedOutcome;
  riskType: RiskType;
};
export type LLMEvaluationResult = {
  caseId: string;
  groundednessScore: EvaluationScore;
  faithfulnessScore: EvaluationScore;
  relevanceScore: EvaluationScore;
  completenessScore: EvaluationScore;
  answerCorrectnessScore: EvaluationScore;
  hallucinationRiskScore: EvaluationScore;
  detectedRiskType: RiskType;
  finalOutcome: ExpectedOutcome;
  requiresHumanReview: boolean;
  reason: string;
};
export type LLMEvaluationDatasetResult = {
  totalCases: number;
  passedCount: number;
  warningCount: number;
  failedCount: number;
  humanReviewCount: number;
  averageGroundednessScore: number;
  averageFaithfulnessScore: number;
  averageRelevanceScore: number;
  averageCompletenessScore: number;
  averageAnswerCorrectnessScore: number;
  averageHallucinationRiskScore: number;
  qualityGateResult: ExpectedOutcome;
  results: LLMEvaluationResult[];
};
