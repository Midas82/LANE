# LANE design

Device wrote this from the file list already in `public/cli.json` (commit `91f6782`, still the live map). Web builds the page from this spec.

Web may add to the design. Append under **Web additions** at the bottom. Do not rewrite the measured counts, the category rules, or the header prompt. If a better layout is needed, add it as a proposal there. Device folds an accepted proposal back into the rules only after Randy relays it.

The current `index.html` is a directory tree. That is the thing to replace. Randy asked for graphs, charts, and a map that is useful: each file categorized, some marked for review, detail that was actually measured. Not a prettier file manager.

## Header prompt

Put this in the page header, always visible, and in `public/cli.json` → `instruction.body`. It is the role lock. An AI reading the page reads this before it acts.

```
GROUND. Read this before you act. Stay in the seat you were given.

Randy is the operator and the relay. He pastes, carries reports, and says go or no-go. He is not the seam chair. Do not give him another job title.

Device is eyes and hands on the box. It measures. It writes public/cli.json. A path and a byte size are not a reading of the file. Unread stays unread. Device does not guess what a file means.

Web is intel. It reads the map. It writes notes, marks, and plans only in public/web.json. It does not edit the map, the counts, the categories, or this prompt. It does not wander into a new system, a new root, or a winner.

Seam chair is the CLI repair role on forge. It stays cold until Randy relays a repair.

Three systems, not three brains. PANOPTES is the workflow: law, rule, guardrail, structure. SIFT excavates saved sessions. A listed file is often evidence of a path traveled. It does not take over the live file. Raphael is local intelligence at ~/midas-agent. It uses the workflow. It is not a second workflow. INGOT builder plus capsule is one seal tool and it is outside these three.

Do not assume. Do not guess. Do not leave the lane. If two claims disagree, keep both. No winners. No merge by date. No new memory directory. No sda-send.
```

## Who writes what

| File | Who | Rule |
|---|---|---|
| `public/cli.json` | Device | File rows, counts, categories, review flags, this prompt, device messages |
| `public/web.json` | Web | Notes and per-file marks. Append only |
| `DESIGN.md` sections above **Web additions** | Device | The spec |
| `DESIGN.md` → **Web additions** | Web | Proposals. Do not edit above |
| `index.html` | Whoever Randy relays to build | Draws the spec. Does not invent rows |

A web note stays:

```json
{
  "id": "web-1",
  "at": "2026-09-23T00:00:00Z",
  "mark": "vital",
  "path": "optional/path/from/the/map",
  "subject": "short title",
  "body": "what web concluded from the row"
}
```

`mark` is `vital`, `noise`, `improve`, `flag`, or `plan`. If `path` matches a file row, the page shows web’s mark on that row. The row’s device review flag stays. Web’s mark does not replace it.

## What a file row is allowed to say

Already measured, on every row: `path`, `bytes`, `kind` (`md`, `py`, `bak`, `other`).

Added by rule, not by reading the body:

- `category` — one bucket from the rules below
- `review` — `none`, `bak`, `duplicate`, or `unread`
- `note` — one line, and only when a rule fired

Do not write a summary of a file that was not opened. The page must say, near the charts: these categories come from the path. The body was not read unless `review` is `unread` and the note says which part was read earlier.

1548 files are on the map. PANOPTES 635 / 36,404,133 bytes. SIFT 832 / 66,967,579 bytes. Raphael (`~/midas-agent`) 81 / 6,452,827 bytes. `.git` and virtualenvs are not in the list. `~/SIFT` does not exist.

## Screens

One page. The header prompt is sticky. Under it, this order:

1. **Scale.** Two charts, not one. Chart A is file count for the three systems. Chart B is bytes. Do not plot both on the same axis. Label the unit on each. Bar length for bytes is not the file-count bar.
2. **Category.** One chart per system. Horizontal bars, file count, category name, and the byte total as a label beside the bar. Clicking a bar filters the table to that category.
3. **Review.** Three numbers, then a bar: bak 97, basenames that occur more than once 52 (711 extra paths), cross-system basenames 8. Clicking one filters the table.
4. **Table.** Default filter is `review != none`, not all 1548 rows. Columns: system, category, path, kind, bytes, device review, web mark if any. A search box filters paths. A system select and a category select narrow it. Expanding a row shows the note and nothing else.
5. **Recommendations.** The three already in `cli.json`. They are not roots on the chart.
6. **Board.** Device messages from `cli.json`. Web notes from `web.json`. Two columns.

Folder trees are not the front page. A category drill-down may group the filtered rows by the first directory, as a second step, after the chart has been chosen.

## Category rules

Apply in order. First match wins. Check the resulting counts against the folder totals below. If they disagree, the walk is wrong and the chart does not ship.

### PANOPTES (`~/PANOPTES`, 635 files)

| Order | If the path | Category | Check |
|---|---|---|---|
| 1 | starts `offsite/` | snapshot | 221 |
| 2 | starts `assay/` | assay | 82 |
| 3 | starts `agents/` | lanes | 14 |
| 4 | starts `.panoptes/` or `tools/` or `skills/` | machinery | 40 + 4 + 1 = 45 |
| 5 | starts `Sessions/` | sessions | 26 |
| 6 | starts `trees/HOME/` and the filename starts `feedback_` | law-feedback | 58 |
| 7 | starts `trees/HOME/` and the filename starts `finding_` | memory-finding | 56 |
| 8 | starts `trees/HOME/` and the filename starts `project_` | memory-project | 36 |
| 9 | starts `trees/HOME/` and the filename starts `reference_` | memory-reference | 19 |
| 10 | starts `trees/HOME/` and the filename starts `user_` | memory-user | 6 |
| 11 | starts `trees/HOME/` and the filename starts `MEMORY` | memory-index | 11 |
| 12 | starts `trees/HOME/` and the filename starts `hardware_` | hardware | 3 |
| 13 | starts `trees/` and was not matched above | registry | the rest of `trees/` (199 total in `trees/`, 196 of them under `trees/HOME/`) |
| 14 | filename is `THE_SLATE.md`, `PAN_SLATE_B.md`, `THE_SLATE_CHAOS.md`, `SLATE_CLEARED.md`, `SLATE_RETRACTED.md`, or the same name with `.bak` in it | slate | top of the tree |
| 15 | starts `chaos/` | chaos | 5 |
| 16 | starts `roundtable/` | roundtable | 9 |
| 17 | starts `.remember/` | remember | 12 |
| 18 | else | other | top files that are not slates: `CLAUDE.md`, `HOME.md`, `README.md`, `THE_MAP.md`, `REPAIR_QUEUE.md`, `REBOOT_FORGE_2026-08-17.md`, `REBUILD_PLAN_2026-08-17.md`, and their `.bak` twins |

`trees/HOME/` is the memory tree. The prefixes are the organization PANOPTES already uses. Do not invent new memory types.

### SIFT (`~/000-INGATHERING-000/SIFT`, 832 files)

| Order | If the path | Category | Check |
|---|---|---|---|
| 1 | starts `results/the-309/` | ore-309 | 689 |
| 2 | starts `results/cli-forge/` | ore-cli-forge | 66 |
| 3 | starts `results/anvil-legacy/` | ore-anvil | 5 |
| 4 | starts `results/` | ore-other | 4 |
| 5 | starts `prompts/` | prompts | 20 |
| 6 | starts `COLD/` | cold | 21 |
| 7 | starts `inputs/` | inputs | 19 |
| 8 | starts `IN/` | in-queue | 1 |
| 9 | no slash, and kind is `md` | doctrine | 6 md at the top, plus 1 bak of `FOREVER_SIFT_v1.md` which is still doctrine and also review `bak` |
| 10 | else | other | |

Ore is the mass. 764 of 832 files are under `results/`. The chart has to show that, or the page hides the system.

### Raphael (`~/midas-agent`, 81 files)

| Order | If the path | Category | Check |
|---|---|---|---|
| 1 | starts `midas_agent/` | package | 24 |
| 2 | starts `tests/` | tests | 7 |
| 3 | starts `wheels/` | wheels | 20 |
| 4 | starts `.pytest_cache/` | cache | 5 |
| 5 | starts `archive/` | archive | 5 |
| 6 | starts `config/` or `docs/` | config | 2 |
| 7 | no slash, kind `md` | plans | the top markdown: blueprint, capabilities, phase plans, roadmap, gate ledger, omnis report, recommended improvements |
| 8 | else | other | `install.sh`, `requirements.txt`, `session_end_xx`, `session_one`, yaml, gitignore |

The plans are June documents sitting next to an August tree. The chart lists them as plans. It does not call them the current code. The package is `midas_agent/`.

## Review rules

Set `review` after the category. A file can have one review flag. Priority: `unread`, then `bak`, then `duplicate`, else `none`.

- `unread` only for these paths, because a person opened part of them and the rest is known unread:
  - `assay/INGOT_ASSAY_v1.md` — body not read
  - `PAN_SLATE_B.md` — lines 1–160 were read, 161–1042 were not
- `bak` when `.bak` is in the filename. 97 files. Note: “Alternate kept. Do not merge by date.”
- `duplicate` when the filename occurs on more than one path in the three trees. 52 filenames, 711 extra paths. Note the count, and `cross-system` when the copies are not all in one system. 8 filenames cross systems. Same byte size is a copy candidate, not a winner. Known same-size pairs from this list: `OPUS_ARCHITECT_PROMPT_v1.0.md` 17167 bytes in PANOPTES and SIFT; `SONNET_SIFT_PROMPT_v2.3.md` 12351 bytes in both. Record them. Do not delete either.

The default table is the review set, so the page opens on work, not on 1548 equal rows.

## Recommendations

Leave these off the charts.

- `~/PROTOCOLS` — 167 files, 2,174,250 bytes. `INGOT_BUILDER_v2.md` and `INGOT_FORGE_CAPSULE_v2.1.md` live here. Outside the three. Add the root only when Randy relays it.
- Assay body — the path is already in the PANOPTES list. Listing it is not reading it.
- Skipped mass — `.git` and virtualenvs are not in the counts. The charts are not the whole disk.

## Build order

1. Keep `public/cli.json` as the only source of file rows. Compute `category` and `review` in the page from the rules, or write them back into `cli.json` in one commit that does not drop a path.
2. Replace the front page. Charts first, table second, folders only inside a chosen category.
3. Put the header prompt on the page before any chart.
4. Join `web.json` notes onto rows by `path`. Do not copy web text into `cli.json`.
5. Check the category totals against the tables in this file. If a bucket is short, stop and say which rule failed.
6. Do not open forge. Do not read file bodies to invent a better category. Do not enable a new root.

## Out of scope

No winners. No hybrid that deletes a file. No memory directory. No `sda` send. No read of the Grok v0.1 specs. No HTML written onto forge. The seam chair does not run.

## Web additions

Web appends below this line. Proposals only. The measured rules above stay until Randy relays a change.

- The page in front of you, and `index.html` on this repo (commit after `d7ee9fa`), are drawn from this spec and from `public/cli.json`. The header is the GROUND block above. It was not rewritten. `public/cli.json` → `instruction.body` is still the shorter seat lock. That field was not edited.

- Category totals were checked against the tables above. One miss. PANOPTES rule 11, filename starts `MEMORY`, is 17 paths, all direct children of `trees/HOME/`: `MEMORY.md` and 5 `.bak`, `MEMORY_B.md` and 2 `.bak`, `MEMORY_SIFT.md` and 7 `.bak`. The check column says 11. The bar shows 17 and is marked failed. It is not relabeled. The other numbered PANOPTES checks matched, including `trees/` 199, `trees/HOME/` 196, and machinery 40 + 4 + 1. Proposal: do not tighten the rule from this seat. If 11 meant a different cut, device has to name the paths. Until Randy relays that, the bar stays 17.

- PANOPTES `other` is 13. The example list does not name `machines/forge.md` or `news/NEWS.md`. Both matched `else`. No number was given for `other`. `registry` is 4. `slate` is 9.

- SIFT numbered checks matched. 764 of 832 files are under `results/`. Rule 9 says kind `md`. The check column says the `FOREVER_SIFT_v1.md` bak is still doctrine. The page counts that bak as doctrine, so doctrine is 7 and `other` is 0. That is a reading of the check column. The rule sentence was not rewritten.

- Raphael numbered checks matched: package 24, tests 7, wheels 20, cache 5, archive 5, config 2. Plans are 10. Other is 8. Those two had no numeric check. They are listed. They are not called a passed number, and the plans are not called the current code.

- Review on this map: 97 filenames contain `.bak`. 52 basenames occur more than once (711 extra paths, 763 paths involved). 8 of those basenames cross systems. `OPUS_ARCHITECT_PROMPT_v1.0.md` is 17167 bytes in PANOPTES `offsite/.../PROTOCOLS/` and in SIFT `prompts/`. `SONNET_SIFT_PROMPT_v2.3.md` is 12351 bytes in both. Same size is a copy candidate. Neither was deleted. The table opens on `review != none` (862 rows). A category click shows that whole bucket, then the first directory. `~/PROTOCOLS` stays off the charts, in recommendations.

- `index.html` was the directory tree. It now reads `public/cli.json` and `public/web.json` and draws this spec. It does not write either file. Note `web-1` in `public/web.json` is the rule 11 flag. It has no path. It does not replace a device review flag.
