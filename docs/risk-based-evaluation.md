# Risk-Based LLM Evaluation

## Purpose

This document defines the risk-based evaluation approach used in the LLM Evaluation Lab.

The objective is to ensure that LLM outputs are not assessed only through average scores.

The evaluation process gives priority to risks that can mislead users, contradict approved information, or require human oversight.

The project applies a Quality Engineering principle:

- not every defect has the same impact
- critical AI risks must remain visible
- high average scores must not hide serious failures
- release decisions should reflect risk, not only performance

## Risk-based evaluation principles

The risk-based approach is based on the following principles:

- critical failures take priority over average quality
- unsupported and contradictory claims are treated as release risks
- incomplete answers may be acceptable only with review
- irrelevant answers reduce usability and trust
- uncertain outputs should be escalated
- human review is part of the control model
- quality gates should support release decisions

## Risk categories

The project currently supports the following risk types:

- `none`
- `hallucination`
- `unsupported_claim`
- `contradiction`
- `incomplete`
- `irrelevant`

Each risk type represents a different quality problem and should not be treated as equally severe.

## Critical risks

Critical risks can directly mislead the user or conflict with the approved source of truth.

Critical risks include:

- hallucination
- unsupported claim
- contradiction

These risks result in a failed evaluation outcome.

### Hallucination

A hallucination occurs when the model invents information that is not present in the source context.

Examples include:

- fabricated procedures
- fabricated facts
- fabricated requirements
- fabricated guarantees
- fabricated recommendations

Hallucinations are critical because they may appear confident and credible even when they are false.

### Unsupported claim

An unsupported claim is information that may be plausible but cannot be verified using the provided source context.

Examples include:

- adding a tracking process that is not documented
- describing a contact method that is not present in the source
- promising an outcome that is not confirmed

Unsupported claims are treated as critical because users may act on information that has not been approved.

### Contradiction

A contradiction occurs when the model directly conflicts with the source context.

Examples include:

- saying a subscription cannot be cancelled when the source says it can
- changing a refund condition
- reversing a policy rule
- removing an important restriction

Contradictions are critical because they present incorrect information as authoritative.

## Moderate risks

Moderate risks reduce answer quality but may not always require an automatic release block.

Moderate risks include:

- incomplete
- irrelevant

### Incomplete

An incomplete answer contains correct information but omits an important condition, restriction, or part of the requested answer.

Examples include:

- providing the return period but omitting eligibility conditions
- answering only one part of a multi-part question
- omitting a required limitation

Incomplete answers normally receive a warning when no critical condition is present.

They require human review because missing information may still affect the user decision.

### Irrelevant

An irrelevant answer does not address the user prompt.

Examples include:

- answering a refund question with shipping information
- discussing returns instead of support availability
- responding to a different user intent

Irrelevant answers can be classified as failed when they result in:

- relevance score of `0`
- answer correctness score of `0`
- groundedness score of `0`

## No detected risk

The `none` risk type is used when:

- the answer is fully supported
- the answer preserves the meaning of the source
- the answer is relevant
- the answer is complete
- the answer is correct
- hallucination risk is absent

A `none` risk type does not automatically guarantee a pass.

The final outcome is still determined by all evaluation scores.

## Score-based risk signals

The evaluation framework uses the following score signals.

### Groundedness

- `1` - fully supported
- `0.5` - partially supported
- `0` - unsupported or unrelated

### Faithfulness

- `1` - meaning preserved
- `0.5` - partially faithful
- `0` - meaning contradicted or distorted

### Relevance

- `1` - directly relevant
- `0.5` - partially relevant
- `0` - irrelevant

### Completeness

- `1` - complete
- `0.5` - partially complete
- `0` - missing the core answer

### Answer correctness

- `1` - correct
- `0.5` - partially correct
- `0` - incorrect

### Hallucination risk

- `0` - no hallucination risk
- `0.5` - possible unsupported claim
- `1` - clear hallucination

## Risk-to-outcome mapping

The current MVP applies deterministic outcome rules.

### Fail

The result is `fail` when at least one critical condition is present.

Critical conditions include:

- hallucination risk score equals `1`
- groundedness score equals `0`
- faithfulness score equals `0`
- answer correctness score equals `0`
- detected risk type is `hallucination`
- detected risk type is `unsupported_claim`
- detected risk type is `contradiction`

### Warning

The result is `warning` when:

- no critical fail condition is present
- at least one quality score equals `0.5`

Typical warning scenarios include:

- incomplete answer
- partial correctness
- partial groundedness
- partial faithfulness
- partial relevance
- possible low-severity unsupported information

### Pass

The result is `pass` when:

- no critical fail condition is present
- no partial score is present
- hallucination risk is `0`
- detected risk type is `none`

## Why average scores are not enough

Average scores can hide important risks.

For example:

- five answers may pass
- one answer may contain a clear hallucination
- the overall average may still look acceptable

The project therefore uses outcome-based quality gates.

A single failed case results in a failed dataset quality gate.

This prevents critical AI risks from being diluted by stronger results in other cases.

## Human review as a risk control

Human review is required when:

- final outcome is `fail`
- hallucination risk is greater than `0`
- detected risk type is not `none`

Human review supports:

- validation of uncertain decisions
- investigation of failed outputs
- escalation of high-impact risks
- documentation of release decisions
- accountability for AI-assisted systems

## Release decision guidance

### Pass

A pass result indicates that the output meets the current quality requirements.

The output may proceed to the next release stage.

### Warning

A warning result indicates that the output may be usable but requires review.

The reviewer should decide whether:

- the issue is acceptable
- the answer should be corrected
- the source context should be improved
- the prompt should be adjusted
- additional testing is required

### Fail

A fail result indicates that the output should not be released without remediation.

Typical remediation actions include:

- correcting the model answer
- improving the source context
- updating the prompt
- adding constraints
- adding regression coverage
- escalating to a product or domain owner

## Governance relevance

The risk-based approach supports AI Governance by providing:

- explicit risk definitions
- documented decision rules
- traceable evaluation results
- release blocking conditions
- human oversight requirements
- transparent limitations
- repeatable review criteria

The framework demonstrates how Quality Engineering can support governance without training or modifying the model.

## Limitations

The current MVP has several limitations:

- one primary risk type is assigned per case
- severity levels are not configurable
- domain-specific risk thresholds are not implemented
- reviewer disagreement is not measured
- the framework depends on manual scores
- all critical failures have the same blocking impact

These limitations are intentional for the MVP.

## Future improvements

Future versions may include:

- risk severity levels
- risk probability and impact scoring
- category-specific controls
- high-risk domain rules
- configurable thresholds
- reviewer agreement metrics
- risk acceptance workflow
- mitigation tracking
- production monitoring
- trend analysis
- regression risk reporting
