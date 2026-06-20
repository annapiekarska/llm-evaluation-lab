# LLM Evaluation Strategy

## Purpose

This document defines the evaluation strategy used in the LLM Evaluation Lab.

The project evaluates LLM-generated answers against a provided source context using structured Quality Engineering criteria.

The purpose is to determine whether an answer is:

- grounded in the source context
- faithful to the meaning of the source
- relevant to the user request
- complete enough to be useful
- correct
- free from hallucinations and unsupported claims
- suitable for automatic acceptance
- suitable for release
- in need of human review

The project focuses on AI output quality rather than model development.

It does not train, fine-tune, or build a language model.

## Evaluation use case

The MVP simulates a customer support assistant that answers user questions based on an approved source of truth.

Each evaluation case contains:

- a user prompt
- a source context
- a model-generated answer
- an expected outcome
- an expected risk type

The source context represents the information the model is allowed to use when producing the answer.

The evaluation determines whether the generated answer is acceptable from a Quality Engineering and AI Governance perspective.

## Evaluation process

The evaluation process contains three layers.

### Evaluation case

The evaluation case defines what should be assessed.

It contains:

- case identifier
- category
- user prompt
- source context
- model answer
- expected outcome
- expected risk type

### Manual evaluation

A human evaluator reviews the answer against the source context and assigns scores for each quality dimension.

The manual evaluation contains:

- groundedness score
- faithfulness score
- relevance score
- completeness score
- answer correctness score
- hallucination risk score
- detected risk type
- evaluation comment

### Automated decision logic

The system converts the manual evaluation into a final evaluation result.

The automated logic determines:

- final outcome
- human review requirement
- dataset-level counts
- average quality scores
- quality gate result
- release recommendation

This approach separates human judgment from automated decision rules.

## Evaluation dimensions

### Groundedness

Groundedness measures whether the answer is supported by the provided source context.

A grounded answer should not include information that cannot be traced back to the source.

Examples of groundedness failures include:

- invented facts
- unsupported procedures
- unsupported promises
- information taken from outside the provided source

### Faithfulness

Faithfulness measures whether the answer accurately represents the meaning of the source.

An answer may reference the source but still distort or contradict its meaning.

Examples of faithfulness failures include:

- reversing a rule
- removing an important restriction
- changing a condition
- presenting uncertain information as confirmed

### Relevance

Relevance measures whether the answer directly responds to the user prompt.

A relevant answer should address the question without moving to an unrelated topic.

Examples of relevance failures include:

- answering a different question
- providing unrelated policy information
- ignoring the actual user request

### Completeness

Completeness measures whether the answer includes all important information required to answer the question.

An answer may be factually correct but incomplete.

Examples of completeness failures include:

- omitting an important condition
- omitting a restriction
- providing only part of the required answer

### Answer correctness

Answer correctness measures whether the final answer is correct when compared with the source context and expected response.

This dimension provides an overall quality judgment.

### Hallucination risk

Hallucination risk measures whether the answer contains invented, unsupported, or contradictory claims.

A hallucination can include:

- a fabricated fact
- a fabricated process
- a fabricated requirement
- a fabricated recommendation
- a confident claim that is not supported by the source

## Scoring model

The MVP uses a three-point scoring scale.

### Positive quality dimensions

The following dimensions use the same scale:

- groundedness
- faithfulness
- relevance
- completeness
- answer correctness

Scores:

- `1` - fully meets the criterion
- `0.5` - partially meets the criterion
- `0` - does not meet the criterion

### Hallucination risk

Hallucination risk uses an inverse interpretation.

Scores:

- `0` - no hallucination risk
- `0.5` - possible or partial unsupported claim
- `1` - clear hallucination or critical unsupported claim

## Risk types

The project currently supports the following risk types:

- `none`
- `hallucination`
- `unsupported_claim`
- `contradiction`
- `incomplete`
- `irrelevant`

### None

No quality risk has been identified.

### Hallucination

The answer includes invented information that is not supported by the source context.

### Unsupported claim

The answer includes a claim that may be plausible but cannot be verified using the provided source.

### Contradiction

The answer directly conflicts with the source context.

### Incomplete

The answer omits important information required to provide a complete response.

### Irrelevant

The answer does not address the user question.

## Final outcome logic

Each evaluated answer receives one of three outcomes.

### Pass

An answer receives `pass` when:

- no critical risk is detected
- quality dimensions meet the required level
- hallucination risk is absent
- no human review is required

### Warning

An answer receives `warning` when:

- no critical failure is detected
- one or more quality dimensions are partial
- the answer may require review before release

Typical warning scenarios include:

- incomplete but factually correct answers
- partially supported answers
- partial answer correctness

### Fail

An answer receives `fail` when a critical quality condition is detected.

Examples include:

- clear hallucination
- unsupported claim
- contradiction
- groundedness score of `0`
- faithfulness score of `0`
- answer correctness score of `0`

## Human review

Human review is required when:

- the final outcome is `fail`
- hallucination risk is greater than `0`
- the detected risk type is not `none`

Human review provides an additional control for uncertain or high-risk AI outputs.

## Dataset-level evaluation

The system evaluates all manual evaluation records and produces:

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

The dataset-level quality gate uses outcome-based logic.

- if at least one case fails, the dataset quality gate is `fail`
- if no cases fail but at least one warning exists, the quality gate is `warning`
- if all cases pass, the quality gate is `pass`

This approach prevents critical failures from being hidden by good average scores.

## Reporting

The project generates a human-readable evaluation report containing:

- dataset size
- pass, warning, and fail counts
- number of cases requiring human review
- average evaluation scores
- quality gate result
- release recommendation

The report is designed to support:

- Quality Engineering reviews
- release readiness decisions
- stakeholder communication
- AI quality governance

## Limitations

The MVP does not automatically understand natural language.

It does not independently detect hallucinations using an LLM or semantic model.

The current process depends on manual evaluation scores.

The automated component applies deterministic decision rules to those scores.

This limitation is intentional.

The MVP demonstrates a transparent and explainable evaluation framework before introducing more advanced AI evaluation tooling.

## Future improvements

Possible future improvements include:

- larger and more diverse datasets
- category-specific thresholds
- configurable quality gates
- severity levels
- reviewer disagreement tracking
- inter-rater reliability
- prompt regression testing
- automated LLM-as-a-judge evaluation
- Langfuse integration
- Phoenix integration
- comparison between automated and human evaluations
