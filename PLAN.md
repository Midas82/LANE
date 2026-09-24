# Full map plan — phases

Device wrote this on 2026-09-24. It replaces the earlier order in this file.

Status after phase 4, partial: every map row has a sha256. Phase 3 groups and bak siblings are in public/cli.json. `assay/INGOT_ASSAY_v1.md` was read, lines 1–766, on 2026-09-24. It is doctrine, not a gate run of the three trees. `PAN_SLATE_B.md` was read through line 341. Lines 342–1042 were not read line by line. Phase 5 is not done. Web reads it. Web does not write file rows, hashes, or counts. Notes stay in `public/web.json`. Proposals stay under **Web additions** in `DESIGN.md`.

A finished row is `path`, `bytes`, `kind`, `category`, `review`, and `sha256`. A hash is not a reading of the body.

## Where it stands

1,548 files are on the map. 64 have a sha256. Those 64 are the identical pairs, the 20 SIFT prompt files, and the 36 doctrine and plan files. No backup in that set matches its live file.

STRATA at `~/STRATA` on forge is the hasher. Phase 1 streams each file through sha256 and writes only under `runs/<id>/`. Eighteen older runs were read. None target `~/PANOPTES`, `~/000-INGATHERING-000/SIFT`, or `~/midas-agent`. Their hashes are not copied onto these rows.

`scan` has no inventory-only switch. One scan runs inventory, structure, extract, graph, and export. Output stays under `~/STRATA/runs/`. The scanned tree is not modified.

## Phases

### Phase 0 — Plan on the repo

Write this file and a device message in `public/cli.json`. Do not edit `public/web.json`.

### Phase 1 — Scan the three roots

On forge, from `~/STRATA`:

```
./scripts/run.sh scan ~/PANOPTES --out ~/STRATA/runs --run-id lane-panoptes-20260924
./scripts/run.sh scan ~/000-INGATHERING-000/SIFT --out ~/STRATA/runs --run-id lane-sift-20260924
./scripts/run.sh scan ~/midas-agent --out ~/STRATA/runs --run-id lane-raphael-20260924
```

Read each `context_bundle/INDEX.md` before stamping. If a run is not `complete`, do not stamp it.

### Phase 2 — Stamp

Join `files_manifest.tsv` onto `public/cli.json` by relative path. Write `sha256` only when the path matches a row. Count stamped, unmatched manifest lines, and rows still without a hash. A manifest line that is not on the map stays off the map. Do not import the June runs.

### Phase 3 — Duplicates from the scan

From the graph phase, record duplicate groups whose sha256 matches. Say which are bak-versus-live. Do not delete a match.

### Phase 4 — The two unread files

Open `assay/INGOT_ASSAY_v1.md` and `PAN_SLATE_B.md` from line 161. Write how far the read went. Do not turn that read into a new design.

### Phase 5 — Stop

The identity layer is full when every row on the map has a sha256 from its own scan. `results/` is hashed, not summarized into law. `~/PROTOCOLS` stays off the charts until Randy relays it. `.git` and virtualenvs were skipped in the map walk. STRATA skips nothing inside the target it is given, so its file count may be higher. The extra paths are reported. They are not added as rows unless Randy relays that.

## Not in these phases

No winners. No merge by date. No new memory directory. No `sda` send. No HTML on forge. The seam chair stays cold.
