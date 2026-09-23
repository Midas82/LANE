import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  ADDED_BY,
  exportDocument,
  heldFindings,
  KINDS,
  laneCard,
  loadDrafts,
  saveDrafts,
  type AddedBy,
  type Finding,
  type FindingKind,
} from "./model";

const EMPTY = {
  kind: "reading" as FindingKind,
  addedBy: "web" as AddedBy,
  subject: "",
  body: "",
  relayed: false,
  conflicts: "",
};

export function Ledger() {
  const [drafts, setDrafts] = useState<Finding[]>([]);
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");

  useEffect(() => {
    setDrafts(loadDrafts());
  }, []);

  const exportJson = useMemo(
    () => JSON.stringify(exportDocument(drafts), null, 2),
    [drafts],
  );
  const cardJson = useMemo(() => JSON.stringify(laneCard, null, 2), []);

  function persist(next: Finding[]) {
    setDrafts(next);
    saveDrafts(next);
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const subject = form.subject.trim();
    const body = form.body.trim();
    if (!subject || !body) {
      setError("Subject and body are required. A draft with no words is not a finding.");
      return;
    }
    const conflictsWith =
      form.kind === "hybrid"
        ? form.conflicts
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        : null;
    if (form.kind === "hybrid" && (!conflictsWith || conflictsWith.length === 0)) {
      setError("A paper hybrid names the other finding ids. No silent merge.");
      return;
    }
    const next: Finding = {
      id: `draft-${crypto.randomUUID()}`,
      addedBy: form.addedBy,
      relayed: form.relayed,
      at: new Date().toISOString(),
      kind: form.kind,
      subject,
      body,
      measured: false,
      numbers: null,
      hashes: null,
      conflictsWith,
      status: "open",
      draft: true,
    };
    persist([next, ...drafts]);
    setForm(EMPTY);
    setError("");
  }

  async function copyText(label: string, text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
    } catch {
      setCopied("");
      setError("Clipboard was blocked. Use the text box and copy from there.");
    }
  }

  function download() {
    const blob = new Blob([exportJson + "\n"], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "lane-with-drafts.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  const numberKinds = form.kind === "measure" || form.kind === "strata";

  return (
    <section id="append" aria-labelledby="append-title" className="scroll-mt-16 border-t border-line py-12">
      <p className="font-mono text-xs text-muted">Append</p>
      <h2 id="append-title" className="mt-2 text-3xl text-fg">
        CLI writes findings. This page does not rewrite the rows.
      </h2>
      <p className="mt-4 text-muted">
        The file is <span className="font-mono text-fg">{laneCard.append.file}</span>. It is also
        served raw at <span className="font-mono text-fg">/lane.json</span>. Add to{" "}
        <span className="font-mono text-fg">findings</span>. Leave{" "}
        <span className="font-mono text-fg">measured.rows</span> alone.
      </p>

      <ol className="mt-6 grid gap-3">
        {laneCard.append.rules.map((rule) => (
          <li key={rule} className="border border-line px-4 py-3 text-fg">
            {rule}
          </li>
        ))}
      </ol>

      <div className="mt-8 border border-dashed border-line px-4 py-4">
        <p className="font-mono text-xs text-muted">
          {laneCard.strata.tool} · {laneCard.strata.status}
        </p>
        <p className="mt-2 text-fg">{laneCard.strata.what}</p>
        <p className="mt-2 text-muted">
          {laneCard.strata.rows.length === 0
            ? "No hash rows. None were relayed. Duplicates and larger files are not known from this card."
            : `${laneCard.strata.rows.length} hash rows on the card.`}
        </p>
      </div>

      <h3 className="mt-10 text-2xl text-fg">On the card</h3>
      {heldFindings.length === 0 ? (
        <p className="mt-3 text-muted">No findings yet. The measured rows are the whole hold.</p>
      ) : (
        <ul className="mt-4 grid gap-3">
          {heldFindings.map((finding) => (
            <FindingCard key={finding.id} finding={finding} />
          ))}
        </ul>
      )}

      <h3 className="mt-10 text-2xl text-fg">Browser draft</h3>
      <p className="mt-3 text-muted">
        Stays in this browser. It cannot carry counts or hashes. Download a copy if the seam chair
        should write it into the file, and only after a go.
      </p>

      <form onSubmit={onSubmit} className="mt-4 grid gap-4 border border-line bg-surface px-4 py-4">
        <label className="grid gap-2">
          <span className="font-mono text-xs text-muted">Kind</span>
          <select
            className="h-11 border border-line bg-bg px-3 font-mono text-sm text-fg"
            value={form.kind}
            onChange={(event) =>
              setForm({ ...form, kind: event.target.value as FindingKind })
            }
          >
            {KINDS.map((kind) => (
              <option key={kind} value={kind}>
                {kind}
              </option>
            ))}
          </select>
        </label>
        {numberKinds ? (
          <p className="font-mono text-sm text-muted">
            This draft cannot carry counts or hashes. Point at the look or the STRATA run in words.
            The seam chair writes numbers into the file from the relay.
          </p>
        ) : null}
        <fieldset className="grid gap-2">
          <legend className="font-mono text-xs text-muted">Added by</legend>
          <div className="grid grid-cols-2 gap-2">
            {ADDED_BY.map((seat) => (
              <label
                key={seat.id}
                className="flex min-h-11 items-center gap-2 border border-line px-3 font-mono text-sm text-fg"
              >
                <input
                  type="radio"
                  name="addedBy"
                  value={seat.id}
                  checked={form.addedBy === seat.id}
                  onChange={() => setForm({ ...form, addedBy: seat.id })}
                />
                {seat.label}
              </label>
            ))}
          </div>
        </fieldset>
        <label className="grid gap-2">
          <span className="font-mono text-xs text-muted">Subject</span>
          <input
            id="draft-subject"
            className="h-11 border border-line bg-bg px-3 text-fg"
            value={form.subject}
            maxLength={200}
            onChange={(event) => setForm({ ...form, subject: event.target.value })}
          />
        </label>
        <label className="grid gap-2">
          <span className="font-mono text-xs text-muted">Body</span>
          <textarea
            id="draft-body"
            className="min-h-28 border border-line bg-bg px-3 py-2 text-fg"
            value={form.body}
            maxLength={4000}
            onChange={(event) => setForm({ ...form, body: event.target.value })}
          />
        </label>
        {form.kind === "hybrid" ? (
          <label className="grid gap-2">
            <span className="font-mono text-xs text-muted">Other finding ids, comma separated</span>
            <input
              className="h-11 border border-line bg-bg px-3 font-mono text-sm text-fg"
              value={form.conflicts}
              onChange={(event) => setForm({ ...form, conflicts: event.target.value })}
            />
          </label>
        ) : null}
        <label className="flex min-h-11 items-center gap-3 text-fg">
          <input
            type="checkbox"
            checked={form.relayed}
            onChange={(event) => setForm({ ...form, relayed: event.target.checked })}
          />
          Relayed by the operator
        </label>
        {error ? <p className="font-mono text-sm text-fg">{error}</p> : null}
        <button
          type="submit"
          className="h-11 border border-brass bg-bg px-4 font-mono text-sm text-fg"
        >
          Hold draft in this browser
        </button>
      </form>

      {drafts.length === 0 ? (
        <p className="mt-4 text-muted">No drafts in this browser.</p>
      ) : (
        <ul className="mt-4 grid gap-3">
          {drafts.map((finding) => (
            <li key={finding.id}>
              <FindingCard finding={finding} />
              <button
                type="button"
                className="mt-2 h-11 px-1 font-mono text-sm text-muted"
                onClick={() => persist(drafts.filter((item) => item.id !== finding.id))}
              >
                Drop this draft
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8 flex flex-wrap gap-2">
        <button
          type="button"
          className="h-11 border border-line px-4 font-mono text-sm text-fg"
          onClick={download}
        >
          Download copy with drafts
        </button>
        <button
          type="button"
          className="h-11 border border-line px-4 font-mono text-sm text-fg"
          onClick={() => copyText("export", exportJson)}
        >
          Copy that JSON
        </button>
        <button
          type="button"
          className="h-11 border border-line px-4 font-mono text-sm text-fg"
          onClick={() => copyText("card", cardJson)}
        >
          Copy the card only
        </button>
      </div>
      {copied ? (
        <p className="mt-3 font-mono text-sm text-muted">Copied {copied}.</p>
      ) : null}

      <details className="mt-6 border border-line px-4 py-3">
        <summary className="min-h-11 cursor-pointer font-mono text-sm text-fg">
          Finding shape and card JSON
        </summary>
        <pre className="mt-3 overflow-x-auto font-mono text-xs leading-relaxed text-muted">
          {JSON.stringify(laneCard.append.finding, null, 2)}
        </pre>
        <label className="mt-4 block">
          <span className="font-mono text-xs text-muted">Card JSON, measured rows unchanged</span>
          <textarea
            readOnly
            className="mt-2 h-64 w-full border border-line bg-bg p-3 font-mono text-xs text-fg"
            value={cardJson}
          />
        </label>
      </details>
    </section>
  );
}

function FindingCard({ finding }: { finding: Finding }) {
  return (
    <article className="border border-line px-4 py-4">
      <p className="font-mono text-xs text-muted">
        {finding.kind} · {finding.addedBy} · {finding.draft ? "draft" : "on card"} ·{" "}
        {finding.relayed ? "relayed" : "not relayed"}
      </p>
      <h4 className="mt-2 text-xl text-fg">{finding.subject}</h4>
      <p className="mt-2 text-fg">{finding.body}</p>
      {finding.conflictsWith && finding.conflictsWith.length > 0 ? (
        <p className="mt-2 font-mono text-xs text-muted">
          Paper hybrid with {finding.conflictsWith.join(", ")}. Not merged.
        </p>
      ) : null}
    </article>
  );
}
