# Job — held 2026-09-25

Resume logged 2026-09-25T16:52:50Z. Forge hostname `forge` answered. Local clock 2026-09-25T10:52:50-0600.

## Box

Measured 2026-09-25T16:52:50Z. Used and free are the whole `sda2` filesystem. Quotas are not enabled, so there is no exclusive size for `@home`.

Subvolumes on `/dev/sda2`, listed 2026-09-25:

| ID | Path | Mounted |
|---|---|---|
| 256 | `@` | `/` |
| 260 | `@home` | `/home` |
| 258 | `@home_SEND_20260817-142812` | `/mnt/oldhome` |
| 257 | `@home_mint_20260817-2127` | no |
| 259 | `@home_SEND_20260817-215004` | no |
| 261 | `@home_SEND_20260817-230353` | no |

| | |
|---|---|
| Disk | `/dev/sda` 1,024,209,543,168 bytes |
| EFI | `/dev/sda1` vfat `AMG_EFI` 536,870,912 bytes, mounted `/boot/efi` |
| Filesystem | `/dev/sda2` btrfs label `ARCH_MINT_GOLD` 1,023,671,271,424 bytes |
| Mount | `/dev/sda2[/@home]` at `/home` |
| Used | 764,595,011,584 bytes |
| Free | 257,109,360,640 bytes |
| Use | 75% |

The three live roots measured 2026-09-24 are 362,003,005 bytes. That is the holdings figure. It is not the used space of the box. The rest of the used space is not mapped.

## Holding times

`birth` is the time this filesystem records for the directory. On the copies it is 2026-08-17, while `modify` is often older. Birth here is not the day the project was written.

| Path | Birth | Modify |
|---|---|---|
| `/home/midas/PANOPTES` | 2026-08-17T20:50:21Z | 2026-09-20T10:04:49Z |
| `/home/midas/000-INGATHERING-000/SIFT` | 2026-08-17T20:49:47Z | 2026-08-25T13:19:09Z |
| `/home/midas/midas-agent` | 2026-08-17T20:28:33Z | 2026-08-18T11:36:39Z |
| `/home/midas/archive/PANOPTES` | 2026-08-17T21:07:29Z | 2026-08-14T10:03:31Z |
| `/home/midas/archive/STATION_SDD3_20260827_RECORDS/PANOPTES` | 2026-08-28T01:14:29Z | 2026-07-12T09:54:11Z |
| `.../Anvil_Sift/midasanvil/sift_pipeline` | 2026-08-17T20:31:26Z | 2026-06-10T09:41:55Z |
| `.../Anvil_Sift/midasanvil/sift_results` | 2026-08-17T20:31:26Z | 2026-06-10T09:42:58Z |
| `.../Anvil_Sift/_SIFT_PROOF_20260707` | 2026-08-17T20:43:31Z | 2026-07-07T07:19:20Z |
| `/home/midas/.config/midas-agent` | 2026-08-17T20:28:33Z | 2026-06-23T18:01:45Z |
| `/home/midas/.local/state/midas-agent` | 2026-08-17T20:30:02Z | 2026-06-26T17:37:39Z |
| `/mnt/oldhome/midas/PANOPTES` | 2026-08-17T20:50:21Z | 2026-08-17T19:02:35Z |
| `/mnt/oldhome/midas/000-INGATHERING-000/SIFT` | 2026-08-17T20:49:47Z | 2026-08-16T06:57:10Z |
| `/mnt/oldhome/midas/midas-agent` | 2026-08-17T20:28:33Z | 2026-07-04T19:21:32Z |

Forge is on as of 2026-09-25T16:52:50Z. The box and the holding times above are the resume measurement.

## The job

Map the three. PANOPTES, SIFT, Raphael at `~/midas-agent`. The record goes on `Midas82/LANE`. Web reads it and writes notes in `public/web.json` only. Device writes the rows.

Nothing is deleted. A previous file moves to that tree's own `archive/` and one line is appended to `ARCHIVE_LOG.md`. A matching hash is not a reason to remove the extra file.

Randy is told when something is broken and he needs to know. A finished pass is not a report.

## The template, at this scale

Not a scan of every byte on a disk. The box is one named drive, measured when it is on. The holdings are the named trees of the three, and the other forms of those three that have been located. Areas are the first directories inside a holding. Categories come from the path rules in `DESIGN.md`. A topic line is written only after the file is opened. A file that was not opened is not called unworthy.

| Step | What is recorded | Where |
|---|---|---|
| Box | Device, filesystem, mount, size, used, free | This file, when the drive answers |
| Holding | Path, bytes, files, created, modified | `LEFT-PLAN.md` has bytes for the forms located on 2026-09-24. Created and modified were not taken. Forge was off on 2026-09-25. |
| Area | First directory, bytes, files | Not started |
| Category | Path rule from `DESIGN.md` | On the 1,548 map rows |
| Topic | One line from an opened file | Assay, both slates, builder, capsule, STRATA instructions. Not the ore. Not the other forms. |

The box size for forge `/home` on `/dev/sda2` is blank. It was not measured. The live holdings that were measured are in `LEFT-PLAN.md`: 362,003,005 bytes in the three live roots, 109,824,539 on the map, 252,178,466 inside those roots and not rows.

## Tomorrow

Review this session for what was, and what deserves a place on the map. Do not start a whole-disk measurement in that review. When forge is on, the first measurement is the box: size, used, free. Then created and modified times for the holdings already named.
