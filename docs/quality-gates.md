# LLM Quality Gates

## Purpose

This document defines the quality gates used in the LLM Evaluation Lab.

The quality gates determine whether evaluated LLM outputs are acceptable for release, require review, or should block release.

The quality gate framework supports:

- repeatable decision-making
- transparent release criteria
- risk-based evaluation
- human oversight
- AI quality governance

## Quality gate levels

The project uses three quality gate outcomes:

- `pass`
- `warning`
- `fail`

The quality gate is evaluated at two levels:

1. individual answer level
2. dataset level

## Individual answer quality gate

Each manual evaluation is converted into an `LLMEvaluationResult`.

The automated evaluator assigns:

- `finalOutcome`
- `requiresHumanReview`

## Pass criteria

An answer receives `pass` when no fail or warning condition is detected.

A pass result normally means:

- groundedness is fully acceptable
- faithfulness is fully acceptable
- relevance is fully acceptable
- completeness is fully acceptable
- answer correctness is fully acceptable
- hallucination risk is `0`
- detected risk type is `none`

A passed answer does not require human review.

## Warning criteria

An answer receives `warning` when:

- no critical fail condition is present
- at least one evaluation score is `0.5`

Typical warning scenarios include:

- incomplete answer
- partial correctness
- partial groundedness
- partial faithfulness
- partial relevance
- possible low-severity unsupported information

A warning indicates that the answer may be usable but should be reviewed before release.

## Fail criteria

An answer receives `fail` when at least one critical condition is present.

Critical fail conditions include:

- hallucination risk score equals `1`
- groundedness score equals `0`
- faithfulness score equals `0`
- answer correctness score equals `0`
- detected risk type is `hallucination`
- detected risk type is `unsupported_claim`
- detected risk type is `contradiction`

A failed answer should not be automatically accepted.

## Human review criteria

Human review is required when at least one of the following is true:

- final outcome is `fail`
- hallucination risk score is greater than `0`
- detected risk type is not `none`

The human review requirement is intentionally broader than the fail condition.

This ensures that warning-level risks are also visible to reviewers.

Examples include:

- incomplete answers
- possible unsupported claims
- uncertain outputs
- answers requiring domain judgment

## Dataset-level quality gate

The dataset-level quality gate is calculated from individual evaluation outcomes.

### Dataset pass

The dataset receives `pass` when:

- no failed cases exist
- no warning cases exist
- all evaluated cases pass

### Dataset warning

The dataset receives `warning` when:

- no failed cases exist
- at least one warning case exists

A warning indicates that the dataset should be reviewed before release.

### Dataset fail

The dataset receives `fail` when:

- at least one failed case exists

A single critical failure is sufficient to block the dataset quality gate.

## Why fail takes priority

The quality gate uses a worst-case outcome approach.

This prevents critical AI risks from being hidden by:

- strong average scores
- a high number of passing cases
- good performance in unrelated dimensions

For example, a dataset may have high average relevance but still contain one hallucinated answer.

The presence of that hallucination should remain visible and should block release.

## Release recommendations

### Pass recommendation

When the quality gate result is `pass`:

`The evaluated dataset meets the release quality gate.`

The evaluated output may proceed to the next stage of release review.

### Warning recommendation

When the quality gate result is `warning`:

`The evaluation results require review before release.`

The output should not be automatically rejected, but identified issues should be reviewed.

### Fail recommendation

When the quality gate result is `fail`:

`Release should be blocked until the failed evaluation cases are resolved.`

Failed cases should be investigated and corrected before release approval.

## Quality gate outputs

The dataset evaluation result includes:

- total cases
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
- individual results

## Current MVP thresholds

The MVP uses deterministic rules rather than configurable thresholds.

Current rules:

- at least one critical condition results in `fail`
- no fail condition and at least one partial score results in `warning`
- no fail or warning condition results in `pass`
- at least one failed dataset case results in dataset `fail`
- no failed cases and at least one warning results in dataset `warning`
- all cases passing results in dataset `pass`

## Limitations

The current quality gate has several intentional limitations:

- all failed cases have the same blocking impact
- category-specific risk levels are not implemented
- severity levels are not configurable
- domain-specific thresholds are not implemented
- the gate depends on manual evaluation scores
- reviewer agreement is not currently measured

These limitations are acceptable for the MVP because the primary goal is to demonstrate a transparent, explainable, and testable quality gate framework.

## Future improvements

Future versions may include:

- configurable thresholds
- category-specific gates
- severity-based fail conditions
- weighted evaluation dimensions
- minimum pass-rate requirements
- maximum hallucination rate
- separate gates for high-risk domains
- human approval workflow
- reviewer disagreement controls
- production monitoring thresholds
- regression-based release gates
- governance approval criteria
