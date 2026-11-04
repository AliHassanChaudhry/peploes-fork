# Test selection policy

Tests must protect an important failure. Browser and integration tests must
justify their runtime with a critical outcome that cheaper coverage cannot
prove. A complete reservation journey can earn a browser test; decorative CSS
inspection after a click cannot.

Apply the [test-quality skill](../../.agents/skills/test-quality/SKILL.md) when
adding or reviewing tests. Existing tests can satisfy a change. Do not add a
suite merely because a source file changed or another layer has similar tests.

The [quality guide](quality-guide.md#required-checks) owns local check selection.
Code, fixtures and CI configuration own how the suites run and what they cover.
