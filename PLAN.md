# Full map plan

Device wrote this on 2026-09-24. Web reads it. Web does not fill in the hashes, the counts, or the file rows. Notes stay in `public/web.json`. Proposals stay under **Web additions** in `DESIGN.md`.

A finished map row is `path`, `bytes`, `kind`, `category`, `review`, and `sha256`. A row is not a reading of the body. Unread stays unread until that file is opened and the note says how far the read went.

1,548 files are on the map. 64 of them have a sha256. The other 1,484 do not.

## Done

- The three roots are listed. `~/SIFT` is not a directory. SIFT is `~/000-INGATHERING-000/SIFT`. Raphael’s tree is `~/midas-agent`.
- Categories and the review rules are in `DESIGN.md`. The memory-index check is 17, not 11.
- Eight cross-system filenames were compared by size. Different sizes are not the same file.
- Four same-size pairs and the two 37-byte pytest `.gitignore` files were hashed. Each pair is the same bytes. Nothing was deleted.
- `SIFT/prompts/` is 20 files. The 13 that are not bak each have a different hash. Live `SONNET_SIFT_PROMPT_v2.8.md` is `96e7b415043bcf72c1fa0eda899df281afa489bebab3d786889e1739623305dc`. None of its 6 bak files match it. That hash matches the sidecar on two. The body was not copied.
- 36 top files now have hashes: the PANOPTES slate and law files, the 7 SIFT doctrine files, the 10 Raphael plan files. No bak matches its live file.

## What full means

Every file already on the map gets a sha256 on its row. That is the identity layer. It can be done without opening the body.

Reading is a second layer, and only for rows already marked `unread`, or for a file Randy names. The ore under `results/` is 764 files. Those get hashes so copies inside the ore can be seen. They do not get summarized into law.

`~/PROTOCOLS` stays off the charts until Randy relays it. `.git` and virtualenvs stay skipped. No winners. No merge by date. No new memory directory. No `sda` send.

## STRATA

Read 2026-09-24 on forge `~/STRATA` and on two at `~/000-MIDAS-000/STRATA`. It is the old fsck-ai-context-engine, renamed 2026-06-11. Phase 1 inventories every file and writes sha256 via `sha256_of_file` in `src/util.py` (hashlib, streamed, full bytes). It does not write inside the scanned target. A run lands in `runs/<id>/` as `inventory.jsonl`, `manifest.sqlite`, and `context_bundle/files_manifest.tsv` (relpath, type, size, sha256, mtime). Duplicate edges are a later phase.

18 run indexes were read. Their targets are Anvil mounts, `/mnt/bridge`, `/mnt/library` (inventory hashed, later phases not finished), `/mnt/usb/home/midas`, `/home/midas/CORPUS`, and one found-not-grok folder. None is `~/PANOPTES`, `~/000-INGATHERING-000/SIFT`, or `~/midas-agent`. The live v2.8 hash `96e7b415043bcf72c1fa0eda899df281afa489bebab3d786889e1739623305dc` is not in those manifests. Those runs are not a source for the current rows.

The next hash pass can be one STRATA scan of the three roots, output only under `~/STRATA/runs/`. Device then stamps sha256 from that manifest onto `public/cli.json`. The scan was not started in this pass.

## Order

1. STRATA-scan the rest of PANOPTES outside `offsite/` and outside `trees/HOME/`, or scan the three roots in one run and stamp only this slice first. Say how many bak files match a live hash. Do not delete a match. Do not import hashes from the June runs.
2. Hash `trees/HOME/`. Stamp the rows. The prefix counts stay the category rules. Do not invent a new memory type from a filename.
3. Hash `midas_agent/` and `tests/`. Stamp the rows. The June plan files are already hashed. They are not the package.
4. Hash `SIFT` outside `prompts/` and outside `results/`. `prompts/` is done. Stamp `COLD/`, `inputs/`, and `IN/`.
5. Hash `results/`. Record unique hashes against file count. Do not open the transcripts in that pass.
6. Open only the unread marks: `assay/INGOT_ASSAY_v1.md`, and `PAN_SLATE_B.md` from line 161. Write how far the read went. Do not turn that read into a new design.
7. Stop. The map is full at the identity layer. A body that was not opened is still unread.

Web can propose a change under **Web additions**. Device does the next numbered step. Randy says if the order changes.
