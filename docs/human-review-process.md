# Human Review Process

## Purpose

This document defines the human review process used in the LLM Evaluation Lab.

Human review is a control mechanism for LLM outputs that are uncertain, incomplete, unsupported, contradictory, or otherwise unsuitable for automatic acceptance.

The process supports:

- consistent evaluation
- transparent decisions
- release readiness
- escalation of critical risks
- AI quality governance
- human oversight

## When human review is required

Human review is required when at least one of the following conditions is true:

- the final outcome is `fail`
- hallucination risk score is greater than `0`
- detected risk type is not `none`

This means that human review may be required for both failed and warning-level cases.

## Why human review is necessary

LLM output quality cannot always be determined through deterministic rules alone.

Human judgment is required when:

- context is ambiguous
- the answer is partially correct
- the source is incomplete
- the impact of an error depends on the use case
- the answer contains a possible unsupported claim
- the answer may mislead the user
- the evaluator is uncertain

Human review prevents uncertain outputs from being accepted automatically.

## Reviewer responsibilities

The reviewer should:

- read the user prompt
- read the source context
- read the model answer
- review the assigned quality scores
- review the detected risk type
- review the evaluation comment
- confirm or challenge the automated final outcome
- document the final review decision
- identify required remediation
- escalate high-impact cases when needed

## Review inputs

The reviewer should receive:

- case identifier
- category
- user prompt
- source context
- model answer
- groundedness score
- faithfulness score
- relevance score
- completeness score
- answer correctness score
- hallucination risk score
- detected risk type
- automated final outcome
- evaluation reason

## Review procedure

The reviewer should follow these steps.

### Step 1 - Validate the source context

Confirm that the source context:

- is relevant to the user prompt
- contains the expected source of truth
- is sufficiently complete
- does not contain conflicting instructions

If the source itself is incomplete or incorrect, the case should be escalated rather than judged only as a model failure.

### Step 2 - Review the model answer

Check whether the answer:

- uses only supported information
- preserves the meaning of the source
- directly answers the user prompt
- includes required conditions
- avoids fabricated claims
- avoids contradictions
- avoids unrelated content

### Step 3 - Review the scores

Confirm whether each score is consistent with the rubric.

Review:

- groundedness
- faithfulness
- relevance
- completeness
- answer correctness
- hallucination risk

The reviewer should update scores if the original manual evaluation is inconsistent with the rubric.

### Step 4 - Review the risk type

Confirm that the selected risk type is the most appropriate primary risk.

Available risk types:

- `none`
- `hallucination`
- `unsupported_claim`
- `contradiction`
- `incomplete`
- `irrelevant`

If multiple risks are present, document the most critical risk and mention secondary issues in the review comment.

### Step 5 - Confirm the outcome

The reviewer should confirm whether the automated outcome is appropriate.

Possible outcomes:

- `pass`
- `warning`
- `fail`

The reviewer should not downgrade a critical risk only to improve the overall dataset result.

### Step 6 - Record the decision

The reviewer should record:

- final review decision
- review comment
- identified risk
- required action
- escalation status
- reviewer name or identifier
- review date

## Review decisions

### Approve

Use when:

- the answer is acceptable
- no unresolved critical risk remains
- the output can proceed

### Approve with warning

Use when:

- the answer is usable
- a non-critical issue remains
- the issue is documented
- release owners accept the risk

### Reject

Use when:

- a critical issue exists
- the answer may mislead the user
- the answer contains hallucinated or contradictory information
- remediation is required before release

### Escalate

Use when:

- the source context is unclear
- the business rule is ambiguous
- the reviewer lacks domain authority
- the case belongs to a high-risk domain
- the potential user impact is significant
- reviewers disagree

## Required remediation

Possible remediation actions include:

- correct the model answer
- improve the source context
- improve retrieval quality
- update the prompt
- add explicit constraints
- add a new regression case
- update the rubric
- consult a domain expert
- block release
- monitor the issue after release

## Escalation criteria

Escalation is required when:

- the answer affects a high-risk decision
- the source of truth is disputed
- the issue has legal, financial, safety, or compliance impact
- multiple reviewers disagree
- the risk cannot be resolved using the current rubric
- the same failure appears repeatedly
- the issue may affect many users

## Reviewer comments

Review comments should be:

- specific
- evidence-based
- linked to the source context
- concise
- actionable

Good examples:

- `The answer adds a contact requirement that is not present in the source context. Reject and update the prompt constraints.`
- `The answer provides the correct return period but omits the unused and unopened condition. Approve with warning after correction.`
- `The source context does not define the cancellation process. Escalate to the policy owner.`
- `The answer contradicts the approved subscription policy and should block release.`

Poor examples:

- `Looks wrong.`
- `Not good enough.`
- `Needs work.`
- `I do not like the answer.`

## Reviewer consistency

To support consistent decisions:

- use the same rubric for every case
- evaluate against the provided source
- do not rely on assumptions
- document every non-pass decision
- escalate ambiguous cases
- avoid changing scores to match a preferred outcome
- separate evidence from opinion

## Review auditability

The review process should make decisions traceable.

Each reviewed case should retain:

- original evaluation data
- original automated outcome
- reviewer decision
- reviewer comment
- remediation action
- final status

This supports:

- auditability
- regression analysis
- governance reporting
- release accountability
- continuous improvement

## Current MVP limitations

The MVP does not yet include:

- reviewer identity fields
- review timestamps
- approval workflow automation
- multi-reviewer comparison
- reviewer disagreement metrics
- escalation tracking
- audit log storage
- role-based permissions

The current document defines the intended process for future implementation.

## Future improvements

Future versions may include:

- reviewer assignment
- approval states
- escalation workflows
- reviewer disagreement tracking
- inter-rater reliability
- audit logs
- evidence attachments
- risk acceptance records
- domain owner approval
- compliance sign-off
- production feedback loops
