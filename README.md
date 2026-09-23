# LANE

Held card. Four seats. Measured rows only.

Four seats, in the words relayed. Randy is the operator and the relay. He is not the seam chair.

> A seat card is not a map of the disks. These counts are not the whole disk.

If this page and [`public/lane.json`](public/lane.json) ever disagree, the JSON wins. This page was written from that file. It is not a second look.

Web holds this lane card and draws the bars from the table only. The assay stays unread until Randy relays that slice.

## Report as relayed

| | |
| --- | --- |
| SEAT | two |
| RAN | No new forge read. This is the lane correction Randy asked both seats to lock. Counts below were measured look-only on the prior turn. |
| FOUND | Agreement from the device seat. |
| RELAY | Randy is the operator and the relay. He pastes. He carries reports. He says go or no-go. |

Relayed report only. No assay body, no Grok v0.1 spec, and no other session was read to draw this card.

## Seats

Not renamed. Randy is the operator and the relay. The seam chair is the CLI repair role on forge. Device looks. Web reads what was looked at. These seats are not the three systems, and they are not the disks.

1. **Randy** — Operator and relay. He pastes. He carries reports. He says go or no-go. He is not the seam chair.
2. **Seam chair** — CLI repair on forge. It repairs, updates, closes gaps, and works the slate. It stays cold until he relays a repair.
3. **Device** — Build on two. Eyes and hands. It looks, measures, and boots work on the box. It acts on a repair only after he relays it.
4. **Web** — Intel. After a body has been read, web says what is vital, what is noise, and what should be improved, updated, or left. Multiples get a paper hybrid, not a silent merge. Web flags a closer look. Device does that look. Visuals are drawn from measured rows. A seat card is not a map of the disks.

## Systems

Three systems, not three brains.

### PANOPTES

The workflow: law, rule, guardrail, structure. It changes when reviewed findings say it changes.

Measured root: `PANOPTES`. The card does not add a path that was not in the table.

### SIFT

Excavates saved sessions. It witnesses, records, and preserves. A dug file is often evidence of a path. It does not take over the live file by being found.

Measured root: `~/000-INGATHERING-000/SIFT`. `~/SIFT` does not exist.

### Raphael

Local intelligence that uses that workflow. It is not a second copy of the workflow.

No measured root on this card. `~/midas-agent` is a measured root. This card does not call it Raphael.

### INGOT

Outside the three. Builder plus capsule is one seal tool.

## Measured

As relayed. Not sorted. Bar length is **files**. Bytes are labels. `.git` and virtualenvs were skipped. `~/SIFT` is absent. No total row. Four roots are not the disk.

| root | files | bytes | md | py | bak | other |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| PANOPTES | 635 | 36404133 | 375 | 12 | 64 | 184 |
| ~/000-INGATHERING-000/SIFT | 832 | 66967579 | 551 | 1 | 33 | 247 |
| ~/midas-agent | 81 | 6452827 | 16 | 27 | 0 | 38 |
| ~/PROTOCOLS | 167 | 2174250 | 96 | 10 | 5 | 56 |

File-count bars. Scale is files, not bytes. `█` is 40 files, rounded down. The table is the authority.

```text
PANOPTES        635  ███████████████
SIFT            832  ████████████████████
midas-agent      81  ██
PROTOCOLS       167  ████
```

Every row’s parts sum to its file count: 635, 832, 81, 167.

Read off the table. Not a new look.

- Longest file-count bar: `~/000-INGATHERING-000/SIFT` at 832 files.
- Largest byte label: the same row, 66967579 bytes. The bytes are still not the bar.
- py greater than md: `~/midas-agent` (27 py, 16 md).
- bak is 0 on `~/midas-agent`.

## Open

Relayed as open. This repo does not close them.

- Assay body still unread.
- Grok v0.1 specs still unread.
- No structure written.
- No memory directory made.
- No HTML.
- No winners.
- No sda-send.
- These counts are not the whole disk.

## STRATA

Status: `not-run`. No hash rows. SHA256 was not relayed. Duplicates and which files are larger are not known from this card.

## Append

The seam chair adds objects to `findings` in [`public/lane.json`](public/lane.json). It does not edit `measured.rows`, `seats`, or `systems`.

- A number enters only from a look that was relayed. Do not invent counts.
- STRATA hashes enter only from a STRATA run. `status` stays `not-run` until those rows exist.
- Two claims about the same thing are a paper hybrid: keep both, set `conflictsWith`, do not silent-merge.
- A dug file is evidence of a path. It does not replace the live file.
- Drafts saved in a browser are not measurements and are not on the card until written into `findings`.
- Do not sum the four roots into a disk total.

Finding shape:

| field | |
| --- | --- |
| id | string, unique |
| addedBy | operator \| cli-seam \| device \| web |
| relayed | boolean |
| at | ISO-8601 or null |
| kind | look \| measure \| strata \| reading \| flag \| hybrid \| correction |
| subject | string |
| body | string |
| measured | boolean. false unless the numbers came from a relayed look |
| numbers | null, or one measured row only when measured is true |
| hashes | null, or `{path, sha256, bytes}` only from STRATA |
| conflictsWith | null, or finding ids |
| status | open \| held \| closed |
| draft | boolean |

`findings` is empty on this first commit.

## Web reading

Not a new look.

1. This card is the visual. `public/lane.json` is the file a CLI agent appends and web reads. Same words, same rows.
2. Bars are file counts. Bytes are labels. Bar length is not size on disk.
3. Do not bind `~/midas-agent` to Raphael. No row was given for Raphael.
4. Do not open the assay or the Grok v0.1 specs from this card. They stay unread until relayed.
5. STRATA is the right next tool for duplicates and which files are larger. It has not been run. The slot stays empty.
6. Multiples get a paper hybrid in `findings`. There are no winners, and this card does not pick one.
7. Depth is the next relayed slice, appended here. It is not a redraw of these four rows.
8. This repo does not close the open list. No HTML on the forge lane is still what was relayed. A web visual is not that HTML.

## What is in this repo

- `README.md` — this reading.
- `public/lane.json` — the card. Append here.
- `src/lane/` — the preview that draws bars from that JSON only.
- `src/styles.css`, `public/favicon.svg` — the preview’s type and mark.

The preview shell that serves the card is not in this repo. The numbers are.
