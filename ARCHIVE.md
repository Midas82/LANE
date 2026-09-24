# Archive rule

Device wrote this on 2026-09-24. It is the workflow. It is not a permission to start moving files. No file was moved or deleted in the pass that wrote it.

Nothing is removed unless it is a verified copy. Verified means the sha256 of the bytes being removed equals the sha256 of a copy that stays, both paths named, both hashes measured in that same session.

Any other change, replacement, or removal uses that tree's own archive:

1. The archive is `<root>/archive/`. PANOPTES, SIFT, and Raphael do not share one.
2. Move the previous bytes there before the new bytes land. One `mv`. Not a copy followed by a delete.
3. The archived name keeps the date: `archive/<name>.YYYYMMDD-HHMMSS`.
4. Append one line to `<root>/archive/ARCHIVE_LOG.md`: date, from, to, sha256, why. The log is append-only.
5. If the move cannot be finished, stop and say so. Do not delete to get unstuck.

A matching hash is the only case where the extra bytes may be removed, and only after both paths are named. A same size is not that case. A backup that differs from the live file stays.

Regenerable cache (`.pytest_cache`, `__pycache__`) is not an authored file. It is still not deleted by this rule's existence.
