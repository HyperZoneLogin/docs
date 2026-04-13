# AGENT Notes

## Sidebar Scope Requirement

When a user switches the top-left documentation group, the sidebar must only show navigation for the selected group.

### Expected behavior

- On `/manual/en/*`, show only EN manual sidebar group.
- On `/manual/ru/*`, show only RU manual sidebar group.
- On `/manual/zh/*` (and zh alias paths), show only ZH manual sidebar group.
- On `/developer/*`, show only Developer Docs sidebar group.
- On non-doc-group routes (for example `/`), show only the `Navigation` group.

### Why this rule exists

Mixing all groups in one sidebar after selecting RU/ZH is confusing and inconsistent with EN/Developer behavior. Group selection should define sidebar scope.

## Implementation Rule

Filter by a stable route key derived from `Astro.url.pathname`.

- `en` -> `/manual/en/*`
- `ru` -> `/manual/ru/*`
- `zh` -> `/manual/zh/*` and zh alias paths
- `developer` -> `/developer/*`
- `navigation` -> all other routes

Then map the key to allowed sidebar group labels.

- This keeps behavior explicit and easy to review.
- It also supports localized labels and temporary compatibility labels.

Current implementation is in:

- `src/components/overrides/Sidebar.astro`

It derives an active group key from `Astro.url.pathname`, then keeps only groups whose labels are allowed for that key.

Important fallback rule:

- If the expected group is not found, fallback must be `Navigation` only.
- Never fallback to full `sidebar` (this would reintroduce the "show everything" regression).

## Regression Checklist

When editing sidebar labels, language names, or group titles:

1. Verify `Sidebar.astro` still uses route-key filtering and does not fallback to full sidebar.
2. Run a build and manually check:
   - `/manual/en/`
   - `/manual/ru/`
   - `/manual/zh/`
   - `/developer/`
3. Confirm each route only shows its own sidebar group.

If a new top-level doc group is added, update root matching in:

- `src/components/overrides/Sidebar.astro`
- `src/components/overrides/PageFrame.astro` (group switcher list)

