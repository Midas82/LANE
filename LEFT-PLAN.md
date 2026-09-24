# Left graph — build spec

Device wrote this on 2026-09-24 from counts already on the map and from `du -sb` / STRATA indexes read the same day. Web builds the graph from the tables below. Web does not invent a byte, a file count, or a root. Web does not edit `public/cli.json`.

This graph is the three systems in the forms that were located. The rest of the disk is not this graph. That pass is later.

## What “left” means

Left is bytes of the three that are not a row on the current map, plus other forms of the three that are not the live roots.

A form is one directory that is that system, or a dated copy of it. A container that merely holds a copy is not the system. `~/000-CLAUDE-SPACE-000/Anvil_Sift` is 23,450,469,821 bytes. It is a copied home. It is not SIFT. Only the three paths inside it that are named below are SIFT forms.

Do not add the live total and the other-forms total. A send snapshot is the same tree at an older time. Adding it to the live bar double-counts.

## Live roots, one scan each

STRATA runs `lane-panoptes-20260924`, `lane-sift-20260924`, `lane-raphael-20260924`. Status complete. `du -sb` a few hours later differs by tens of bytes on PANOPTES and Raphael. The graph uses the scan totals. The drift is recorded, not “fixed.”

| System | Live path | Scan files | Scan bytes | On the map, files | On the map, bytes | Inside the root, not on the map, files | Inside the root, not on the map, bytes |
|---|---|---:|---:|---:|---:|---:|---:|
| PANOPTES | `/home/midas/PANOPTES` | 9,865 | 174,330,499 | 635 | 36,404,133 | 9,230 | 137,926,366 |
| SIFT | `/home/midas/000-INGATHERING-000/SIFT` | 832 | 66,967,579 | 832 | 66,967,579 | 0 | 0 |
| Raphael | `/home/midas/midas-agent` | 6,579 | 120,704,927 | 81 | 6,452,827 | 6,498 | 114,252,100 |
| Sum |  | 17,276 | 362,003,005 | 1,548 | 109,824,539 | 15,728 | 252,178,466 |

The off-map files are inside the live roots. The map walk skipped `.git`, `__pycache__`, `.venv`, `venv`, `node_modules`, and `.venv.arch-py314-20260818`. STRATA did not skip them. SIFT had nothing in those skips, so its two columns match.

`du -sb` after the scan: PANOPTES 174,330,570. Raphael 120,705,000. SIFT unchanged at 66,967,579.

## Other forms located, not on the chart

`/mnt/oldhome` is btrfs subvolume `@home_SEND_20260817-142812` on `/dev/sda2`. It is not `/home`.

| Form | Path | Bytes | Files | Class |
|---|---|---:|---:|---|
| PANOPTES at the 2026-08-17 send | `/mnt/oldhome/midas/PANOPTES` | 163,799,028 | not counted | send snapshot |
| SIFT at the 2026-08-17 send | `/mnt/oldhome/midas/000-INGATHERING-000/SIFT` | 42,903,751 | not counted | send snapshot |
| Raphael at the 2026-08-17 send | `/mnt/oldhome/midas/midas-agent` | 76,705,160 | not counted | send snapshot |
| SIFT origin pipeline | `/home/midas/000-CLAUDE-SPACE-000/Anvil_Sift/midasanvil/sift_pipeline` | 743,420 | not counted | origin |
| SIFT origin results | `/home/midas/000-CLAUDE-SPACE-000/Anvil_Sift/midasanvil/sift_results` | 4,862,443 | not counted | origin |
| SIFT proof bundle | `/home/midas/000-CLAUDE-SPACE-000/Anvil_Sift/_SIFT_PROOF_20260707` | 66,764 | not counted | proof |
| PANOPTES archive tree | `/home/midas/archive/PANOPTES` | 106,361 | not counted | archive |
| PANOPTES station record | `/home/midas/archive/STATION_SDD3_20260827_RECORDS/PANOPTES` | 49,401 | not counted | archive |
| Raphael config | `/home/midas/.config/midas-agent` | 299,066 | not counted | state |
| Raphael state | `/home/midas/.local/state/midas-agent` | 71,819 | not counted | state |
| SIFT on host two | `/home/midas/000-MIDAS-000/000-INGATHERING-000/SIFT` | 4,472,102 | 164 | other host |

Sum of these eleven rows: 294,079,315 bytes. That sum is a list total. It is not a fourth system and it is not added to 362,003,005.

Host two was searched to depth 6 for the same directory names. The only hit was the SIFT row above. No PANOPTES directory and no `midas-agent` directory on that machine in that search.

## The graph

One page section, title `Left`. Two charts. They do not share an axis and they do not share a total.

Chart 1, title `Live roots`. Three stacked bars, unit bytes.

- Bottom segment: on the map.
- Top segment: inside the root, not on the map.
- Label on the bar: file counts for both segments.
- SIFT’s top segment is 0. Draw the bar as one segment. Do not invent a second color with a zero that looks like missing data. Print `0`.
- Caption under the chart: `362,003,005 bytes in the three live roots. 109,824,539 on the map. 252,178,466 inside the roots and not on the map.`

Chart 2, title `Other forms`. Eleven bars, one per row in the table above, unit bytes. Sorted by the table order, not by size. Color is one color. Class is a text label, not a stack. No sum line that adds them to chart 1.

Under chart 2, one line: `Anvil_Sift as a whole is 23,450,469,821 bytes and is not a bar. The SIFT forms inside it are the three bars already listed.`

Table under the charts: the two tables above, copied, no added column.

## Not on this graph

- The rest of the disk.
- `~/PROTOCOLS` (167 files, 2,174,250 bytes). It stays a recommendation.
- `.git` and virtualenvs as their own named systems. They are the off-map segment of chart 1, not a new root.
- A winner among copies. Same path at two times is two rows. No merge.
- File counts in the “not counted” cells. Leave them blank. Do not estimate.

## Device, after this page exists

Count files in the eleven other forms. Stamp those counts into this file’s table, replacing `not counted`. Do not start that count in the same pass as drawing the graph. Hashes of the other forms are a later pass. The archive rule in `ARCHIVE.md` still holds: nothing is removed unless it is a verified copy.
