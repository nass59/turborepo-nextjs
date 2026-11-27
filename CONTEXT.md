# AI App Builder Starter

A showcase starter where a signed-in user describes an app in plain language and a coding agent builds it live in a cloud sandbox.

## Building

**Project**:
One app a user is building, made of the conversation that shapes it.
_Avoid_: Workspace, app, session

**Prompt**:
The plain-language request a user sends to start or continue a Project.
_Avoid_: Value, query, instruction

**Message**:
One turn in a Project's conversation, sent either by the user or by the assistant.
_Avoid_: Chat, reply

**Fragment**:
The runnable result attached to a successful assistant Message: a live preview and the generated files.
_Avoid_: Artifact, output, snapshot

**Generation**:
One run of the coding agent in response to a Prompt, ending in either a Fragment or an error Message.
_Avoid_: Job, run, task

**Sandbox**:
The isolated cloud machine where a Generation writes and serves the app.
_Avoid_: Container, VM, environment

## Access

**Plan**:
The subscription tier a user is on, either Free or Pro, which sets their Credit allowance.
_Avoid_: Tier, subscription, package

**Credit**:
The unit a user spends to start a Generation; each Plan grants a fixed number per 30-day window.
_Avoid_: Point, token, usage
