# LLM Evaluation Lab

A Quality Engineering portfolio project focused on evaluating LLM-generated answers against a provided source context.

The project demonstrates how AI outputs can be assessed using structured evaluation criteria, risk-based quality gates, human review workflows, and transparent reporting.

## Project status

MVP completed.

The current implementation includes:

- TypeScript project setup
- Vitest test framework
- static LLM evaluation dataset
- manual evaluation dataset
- single-answer evaluation
- dataset-level evaluation
- pass, warning, and fail outcome logic
- human review decision logic
- average quality metrics
- dataset-level quality gate
- human-readable evaluation report
- evaluation strategy documentation
- evaluation rubric
- risk-based evaluation documentation
- human review process documentation
- automated tests for main evaluation paths

## Project overview

LLM-generated answers cannot always be evaluated using traditional deterministic assertions.

An answer may be:

- factually correct but incomplete
- relevant but unsupported by the provided context
- grounded in the source but misleading
- partially correct
- confidently incorrect
- suitable for automatic acceptance
- risky enough to require human review

This project creates a structured evaluation framework for assessing those differences.

## Project goal

The goal is to demonstrate how LLM outputs can be evaluated from a Quality Engineering and AI Governance perspective without training, fine-tuning, or building a language model.

The project focuses on:

- defining measurable LLM quality criteria
- designing an evaluation dataset
- evaluating answers against a source of truth
- identifying hallucinations and unsupported claims
- assigning risk and human review requirements
- generating human-readable reports
- applying release-oriented quality gates

## MVP use case

The MVP simulates a customer support AI assistant.

Each evaluation case contains:

- a user prompt
- a source context
- a model answer
- an expected outcome
- an expected risk type

The source context represents the approved information available to the assistant.

The evaluation framework determines whether the answer is sufficiently grounded, faithful, relevant, complete, and correct.

## Evaluation flow

The project uses three evaluation layers.

### Evaluation case

Defines the input that should be assessed.

Includes:

- case identifier
- category
- user prompt
- source context
- model answer
- expected outcome
- expected risk type

### Manual evaluation

Captures the human assessment of the model answer.

Includes:

- groundedness score
- faithfulness score
- relevance score
- completeness score
- answer correctness score
- hallucination risk score
- detected risk type
- evaluation comment

### Automated evaluation result

Applies deterministic decision logic to the manual scores.

Produces:

- final outcome
- human review requirement
- dataset-level counts
- average quality scores
- quality gate result
- release recommendation

## Evaluation criteria

### Groundedness

Determines whether the answer is supported by the provided source context.

### Faithfulness

Determines whether the answer accurately preserves the meaning of the source.

### Relevance

Determines whether the answer directly addresses the user prompt.

### Completeness

Determines whether the answer includes all important information required to answer the question.

### Answer correctness

Determines whether the final answer is correct relative to the source context and expected response.

### Hallucination risk

Identifies invented, unsupported, or contradictory claims.

## Scoring model

The project uses a three-point scoring scale.

Positive quality dimensions:

- `1` - pass
- `0.5` - partial
- `0` - fail

Hallucination risk:

- `0` - no hallucination risk
- `0.5` - possible unsupported claim
- `1` - clear hallucination

## Supported risk types

The project currently supports:

- `none`
- `hallucination`
- `unsupported_claim`
- `contradiction`
- `incomplete`
- `irrelevant`

## Individual outcome logic

### Pass

An answer receives `pass` when:

- no critical condition is present
- no partial score is present
- hallucination risk is `0`
- detected risk type is `none`

### Warning

An answer receives `warning` when:

- no critical fail condition is present
- at least one evaluation score is `0.5`

Typical warning scenarios include:

- incomplete answer
- partial correctness
- partial relevance
- partial groundedness
- partial faithfulness

### Fail

An answer receives `fail` when at least one critical condition is present.

Critical conditions include:

- hallucination risk score equals `1`
- groundedness score equals `0`
- faithfulness score equals `0`
- answer correctness score equals `0`
- detected risk type is `hallucination`
- detected risk type is `unsupported_claim`
- detected risk type is `contradiction`

## Human review

Human review is required when:

- final outcome is `fail`
- hallucination risk score is greater than `0`
- detected risk type is not `none`

This ensures that both failed and warning-level cases remain visible to reviewers.

## Dataset-level evaluation

The dataset evaluator calculates:

- total number of cases
- passed count
- warning count
- failed count
- human review count
- average groundedness score
- average faithfulness score
- average relevance score
- average completeness score
- average answer correctness score
- average hallucination risk score
- quality gate result
- individual evaluation results

## Dataset quality gate

The dataset-level quality gate uses worst-case logic.

- if at least one case fails, the dataset result is `fail`
- if no case fails but at least one warning exists, the result is `warning`
- if all cases pass, the result is `pass`

This prevents critical risks from being hidden by acceptable average scores.

## Human-readable report

The project generates a report containing:

- dataset size
- pass count
- warning count
- fail count
- human review count
- average quality metrics
- quality gate result
- release recommendation

Example release recommendations:

- `The evaluated dataset meets the release quality gate.`
- `The evaluation results require review before release.`
- `Release should be blocked until the failed evaluation cases are resolved.`

## Repository structure

```text
llm-evaluation-lab/
├── docs/
│   ├── evaluation-rubric.md
│   ├── evaluation-strategy.md
│   ├── human-review-process.md
│   ├── quality-gates.md
│   └── risk-based-evaluation.md
├── src/
│   ├── evaluation/
│   │   ├── evaluateManualEvaluation.ts
│   │   └── evaluateManualEvaluationDataset.ts
│   ├── reporting/
│   │   └── generateEvaluationReport.ts
│   └── types/
│       └── llmEvaluation.ts
├── test-data/
│   ├── llmEvaluationCases.ts
│   └── llmManualEvaluations.ts
├── tests/
│   ├── evaluateManualEvaluation.test.ts
│   ├── evaluateManualEvaluationDataset.test.ts
│   ├── generateEvaluationReport.test.ts
│   └── sanity.test.ts
├── .gitignore
├── package.json
├── README.md
└── tsconfig.json
```

## Available commands

Run the test suite:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Run TypeScript validation:

```bash
npm run typecheck
```

Run the full project quality check:

```bash
npm run quality:check
```

## Documentation

The project includes the following Quality Engineering and AI Governance documentation:

- `docs/evaluation-strategy.md`
- `docs/evaluation-rubric.md`
- `docs/quality-gates.md`
- `docs/risk-based-evaluation.md`
- `docs/human-review-process.md`

## Quality Engineering approach

This project treats LLM evaluation as a Quality Engineering problem rather than a model development problem.

The focus is on:

- test strategy
- measurable acceptance criteria
- risk-based coverage
- traceable evaluation results
- quality gates
- human oversight
- release readiness
- transparent limitations

## Limitations

The MVP does not automatically understand natural language.

It does not independently detect hallucinations using an LLM, embeddings, semantic similarity, or an LLM-as-a-judge approach.

The current process depends on manual evaluation scores.

The automated component applies deterministic decision rules to those scores.

This limitation is intentional.

The MVP establishes a transparent and explainable evaluation foundation before introducing more advanced AI evaluation tooling.

## Future improvements

Possible future improvements include:

- configurable quality gate thresholds
- category-specific rules
- risk severity levels
- larger evaluation datasets
- reviewer disagreement tracking
- inter-rater reliability
- prompt regression testing
- automated LLM-as-a-judge evaluation
- Langfuse integration
- Phoenix integration
- production monitoring
- quality trend reporting

## Career relevance

This project demonstrates practical skills relevant to roles such as:

- AI Quality Lead
- AI Evaluation Lead
- AI Quality and Governance Lead
- Quality Engineering Manager
- Senior Quality Manager - AI

It extends traditional QA and Quality Engineering practices into AI output evaluation, risk management, release readiness, and governance.
