# LLM Evaluation Rubric

## Purpose

This rubric defines how human evaluators should score LLM-generated answers in the LLM Evaluation Lab.

The objective is to make manual evaluation:

- consistent
- transparent
- repeatable
- explainable
- suitable for quality gate decisions

Each answer must be evaluated against the provided source context and user prompt.

Evaluators should not use external knowledge unless the evaluation case explicitly allows it.

## General evaluation rules

Before assigning scores:

1. Read the user prompt.
2. Read the source context.
3. Read the model answer.
4. Identify all claims made by the model.
5. Compare each claim with the source context.
6. Identify missing, unsupported, contradictory, or irrelevant information.
7. Assign scores for each quality dimension.
8. Select the most appropriate risk type.
9. Add a concise evaluation comment.

The evaluation comment should explain the main reason for the assigned scores.

## Groundedness

Groundedness measures whether the answer is supported by the source context.

### Score 1

Assign `1` when:

- all important claims are supported by the source
- no external or invented information is included
- the answer stays within the provided context

### Score 0.5

Assign `0.5` when:

- part of the answer is supported
- another part is unsupported
- the answer mixes valid and unverified information

### Score 0

Assign `0` when:

- the answer is not supported by the source
- the answer directly conflicts with the source
- the answer discusses unrelated information

## Faithfulness

Faithfulness measures whether the answer accurately preserves the meaning of the source.

### Score 1

Assign `1` when:

- the answer represents the source accurately
- conditions and restrictions are preserved
- the meaning is not distorted

### Score 0.5

Assign `0.5` when:

- the main meaning is correct
- some nuance, condition, or restriction is changed
- the answer is partially faithful

### Score 0

Assign `0` when:

- the answer contradicts the source
- the answer reverses the meaning
- the answer removes or changes a critical condition

## Relevance

Relevance measures whether the answer directly addresses the user prompt.

### Score 1

Assign `1` when:

- the answer directly responds to the question
- the content is focused on the user request
- no unrelated content replaces the requested answer

### Score 0.5

Assign `0.5` when:

- the answer partially responds to the question
- some information is relevant
- important parts of the request are not addressed

### Score 0

Assign `0` when:

- the answer responds to a different question
- the answer is unrelated
- the user request is ignored

## Completeness

Completeness measures whether the answer includes all important information required by the prompt and source context.

### Score 1

Assign `1` when:

- all important conditions are included
- all required parts of the question are answered
- no essential information is missing

### Score 0.5

Assign `0.5` when:

- the answer is partially complete
- the core answer is present
- one or more important conditions are missing

### Score 0

Assign `0` when:

- the answer does not provide the required information
- the answer misses the core of the question
- the response is unrelated

## Answer correctness

Answer correctness measures whether the final answer is correct overall.

### Score 1

Assign `1` when:

- the answer is correct
- the answer is supported
- the answer does not mislead the user

### Score 0.5

Assign `0.5` when:

- the answer contains correct information
- the answer is partially incomplete or partially unsupported
- the answer could mislead the user without clarification

### Score 0

Assign `0` when:

- the answer is incorrect
- the answer contradicts the source
- the answer fails to answer the question
- the answer contains a critical false claim

## Hallucination risk

Hallucination risk measures the severity of unsupported or invented information.

### Score 0

Assign `0` when:

- all claims are supported
- no invented information is present
- the answer stays within the source context

### Score 0.5

Assign `0.5` when:

- the answer contains a possible unsupported claim
- the unsupported information is not clearly critical
- the answer is partly grounded and partly unverified

### Score 1

Assign `1` when:

- the answer contains a clear hallucination
- the answer invents a procedure, rule, fact, or requirement
- the unsupported claim may materially mislead the user

## Risk type selection

Select one primary risk type for each evaluated answer.

### none

Use when no risk is detected.

### hallucination

Use when the model invents information that is not present in the source.

### unsupported_claim

Use when the answer contains a claim that cannot be verified from the source.

### contradiction

Use when the answer directly conflicts with the source.

### incomplete

Use when the answer is correct but misses important information.

### irrelevant

Use when the answer does not address the user prompt.

## Evaluation comments

Every manual evaluation must include a concise comment.

The comment should:

- explain the main quality issue
- identify the unsupported, missing, or contradictory information
- avoid vague wording
- avoid repeating only the numerical score

Good examples:

- `The answer matches the source context and directly answers the user's question.`
- `The answer contains an unsupported claim about contacting customer support.`
- `The answer directly contradicts the source by claiming that cancellation is only possible after 12 months.`
- `The answer provides the correct return period but omits the unused and unopened product condition.`
- `The answer is unrelated to the question and discusses returns instead of support availability.`

Poor examples:

- `Bad answer.`
- `Wrong.`
- `Needs improvement.`
- `Score is 0.5.`

## Reviewer consistency

To improve consistency:

- use the same rubric for every case
- evaluate against the source context only
- document the reason for every non-pass result
- escalate uncertain cases for human review
- avoid adjusting scores to match an expected final outcome
- score the answer first, then allow the system to calculate the final outcome
