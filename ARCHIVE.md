# Archive rule

Device wrote this on 2026-09-24. It is the workflow. It is not a permission to start moving files. No file was moved or deleted in the pass that wrote it.

Nothing is deleted. A verified copy is still not deleted. The previous bytes move into that tree's own archive.

Any change, replacement, or removal uses that tree's own archive:

1. The archive is `<root>/archive/`. PANOPTES, SIFT, and Raphael do not share one.
2. Move the previous bytes there before the new bytes land. One `mv`. Not a copy followed by a delete.
3. The archived name keeps the date: `archive/<name>.YYYYMMDD-HHMMSS`.
4. Append one line to `<root>/archive/ARCHIVE_LOG.md`: date, from, to, sha256, why. The log is append-only.
5. If the move cannot be finished, stop and say so. Do not delete to get unstuck.

A matching hash names a copy. It does not permit a removal. A same size is not a match. A backup that differs from the live file stays.

Regenerable cache (`.pytest_cache`, `__pycache__`) is not an authored file. It is still not deleted.
