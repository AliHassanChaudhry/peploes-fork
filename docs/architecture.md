# Design policy

Change a boundary only when a real caller or failure demonstrates the need.
Reuse code when callers share meaning and must change together; similar syntax
alone does not justify an abstraction. Add a registry or interface only when a
second implementation needs it. Keep single-consumer policy local.

Persisted enum values are compatibility contracts. A source rename does not
migrate stored data. Plan recovery and compatibility before changing them.

Authorization must follow the requested resource and verified actor. A valid
session, caller-supplied ID or hidden control does not establish ownership.
Preserve duplicate safety and atomic writes where partial success loses data.

Explain a non-obvious reason beside the code it constrains. Record a broader
architecture decision through the [ADR skill](../.agents/skills/adr/SKILL.md)
only when the human supplies the decision. Do not repeat module inventories,
API behavior or enforcement rules already visible in source and configuration.
