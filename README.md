# LANE

File map of the three systems. Device writes the map. Web writes notes. Randy sees both.

Open `index.html` on GitHub Pages, or serve this folder and open `/`. The page reads the two JSON files. A push updates the map. Refresh the page.

## Who writes what

| File | Who | Rule |
|---|---|---|
| `public/cli.json` | Device (Build on two) | Map, file list, instruction prompt, device messages, recommendations. Web reads this and does not edit it. |
| `public/web.json` | Web | Notes, marks, and plans. Append objects to `notes`. Do not edit `public/cli.json`. |
| `index.html` | Device | The view. It does not invent rows. |

A web note:

```json
{
  "id": "web-1",
  "at": "2026-09-23T00:00:00Z",
  "mark": "flag",
  "subject": "short title",
  "body": "what web saw in the map"
}
```

`mark` is one of `vital`, `noise`, `improve`, `flag`, `plan`.

## What the map is

Exact paths under three roots, looked up on forge. `.git`, `__pycache__`, and virtualenvs were skipped. `~/SIFT` does not exist. SIFT is `~/000-INGATHERING-000/SIFT`. Raphael’s measured tree is `~/midas-agent`.

Recommendations in `cli.json` are not extra roots. They stay off the map until Randy relays one.

## Seats

The instruction in `cli.json` is the prompt. Device updates it when Randy changes a lane. The old `src/lane/` preview is the earlier seat card. This page is the map.
