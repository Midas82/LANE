import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  axisName,
  groupInt,
  holds,
  laneCard,
  leader,
  measuredRows,
  parts,
  type MeasuredRow,
} from "./model";

const PARTS = [
  { key: "md", label: "md", fill: "var(--color-md)" },
  { key: "py", label: "py", fill: "var(--color-py)" },
  { key: "bak", label: "bak", fill: "var(--color-bak)" },
  { key: "other", label: "other", fill: "var(--color-other)" },
] as const;

type PartKey = (typeof PARTS)[number]["key"];

function Tip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: ReadonlyArray<{ payload?: MeasuredRow & { name: string } }>;
}) {
  const row = payload?.[0]?.payload;
  if (!active || !row) return null;
  return (
    <div className="max-w-xs border border-line bg-surface px-3 py-2 font-mono text-xs text-fg">
      <p>{row.root}</p>
      <p className="mt-1 text-muted">{groupInt(row.files)} files</p>
      <p className="text-muted">{groupInt(row.bytes)} bytes, label only</p>
      <p className="mt-1">
        md {row.md} · py {row.py} · bak {row.bak} · other {row.other}
      </p>
    </div>
  );
}

function Count({ label, value }: { label: string; value: number }) {
  return (
    <div className="min-w-0">
      <p className="font-mono text-xs text-muted">{label}</p>
      <p className="font-mono text-lg tabular-nums text-fg">{groupInt(value)}</p>
    </div>
  );
}

export function Measured() {
  const [draw, setDraw] = useState(false);
  useEffect(() => setDraw(true), []);

  const chartRows = measuredRows.map((row) => ({
    ...row,
    name: axisName(row.root),
  }));
  const fileLeader = leader(measuredRows, "files");
  const byteLeader = leader(measuredRows, "bytes");
  const pyOverMd = measuredRows.filter((row) => row.py > row.md);
  const zeroBak = measuredRows.filter((row) => row.bak === 0);
  const allHold = measuredRows.every(holds);

  return (
    <section id="measured" aria-labelledby="measured-title" className="scroll-mt-16 border-t border-line py-12">
      <p className="font-mono text-xs text-muted">Measured</p>
      <h2 id="measured-title" className="mt-2 text-3xl text-fg">
        Four roots. File counts are the bars.
      </h2>
      <p className="mt-4 text-muted">
        {laneCard.measured.order} Bar length is <span className="text-fg">files</span>. Bytes
        are labels. {laneCard.warning}
      </p>
      <p className="mt-3 font-mono text-sm text-muted">
        Skipped: {laneCard.measured.skipped.join(", ")}. Absent:{" "}
        {laneCard.measured.absent.join(", ")}.
      </p>

      <div className="mt-8 grid gap-3">
        {measuredRows.map((row) => {
          const ok = holds(row);
          return (
            <article key={row.root} className="border border-line bg-surface px-4 py-4">
              <h3 className="break-all font-mono text-sm text-fg">{row.root}</h3>
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                <Count label="files" value={row.files} />
                <Count label="bytes" value={row.bytes} />
                <Count label="parts sum" value={parts(row)} />
              </div>
              <dl className="mt-4 grid grid-cols-4 gap-2">
                {PARTS.map((part) => (
                  <div key={part.key}>
                    <dt className="flex items-center gap-2 font-mono text-xs text-muted">
                      <span
                        className="inline-block size-2"
                        style={{ background: part.fill }}
                        aria-hidden="true"
                      />
                      {part.label}
                    </dt>
                    <dd className="font-mono text-sm tabular-nums text-fg">
                      {groupInt(row[part.key as PartKey])}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 font-mono text-xs text-muted">
                {ok
                  ? "md + py + bak + other equals the file count."
                  : "Parts do not equal the file count. Left as relayed. Not smoothed."}
              </p>
            </article>
          );
        })}
      </div>

      <div className="mt-8 hidden md:block">
        <table className="w-full border-collapse font-mono text-sm">
          <caption className="sr-only">
            Measured roots. Columns are root, files, bytes, md, py, bak, other.
            Bytes are labels. Bars elsewhere use the files column only.
          </caption>
          <thead>
            <tr className="border-b border-line text-left text-xs text-muted">
              <th scope="col" className="py-2 pr-3 font-medium">
                root
              </th>
              <th scope="col" className="px-3 py-2 text-right font-medium">
                files
              </th>
              <th scope="col" className="px-3 py-2 text-right font-medium">
                bytes
              </th>
              <th scope="col" className="px-3 py-2 text-right font-medium">
                md
              </th>
              <th scope="col" className="px-3 py-2 text-right font-medium">
                py
              </th>
              <th scope="col" className="px-3 py-2 text-right font-medium">
                bak
              </th>
              <th scope="col" className="py-2 pl-3 text-right font-medium">
                other
              </th>
            </tr>
          </thead>
          <tbody>
            {measuredRows.map((row) => (
              <tr key={row.root} className="border-b border-line text-fg">
                <th scope="row" className="max-w-xs py-3 pr-3 text-left font-normal break-all">
                  {row.root}
                </th>
                <td className="px-3 py-3 text-right tabular-nums">{groupInt(row.files)}</td>
                <td className="px-3 py-3 text-right tabular-nums">{groupInt(row.bytes)}</td>
                <td className="px-3 py-3 text-right tabular-nums">{groupInt(row.md)}</td>
                <td className="px-3 py-3 text-right tabular-nums">{groupInt(row.py)}</td>
                <td className="px-3 py-3 text-right tabular-nums">{groupInt(row.bak)}</td>
                <td className="py-3 pl-3 text-right tabular-nums">{groupInt(row.other)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-3 font-mono text-xs text-muted">
          No total row. Four roots are not the disk.
        </p>
      </div>

      <div className="mt-8 border border-line bg-plot px-3 py-4">
        <p className="px-1 font-mono text-xs text-muted">
          File-count bars. Axis names are the last path segment. The table keeps the full root.
        </p>
        <div className="mt-3 h-64 w-full">
          {draw ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={chartRows}
                margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
              >
                <XAxis
                  type="number"
                  tick={{ fill: "var(--color-muted)", fontSize: 12 }}
                  axisLine={{ stroke: "var(--color-line)" }}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={108}
                  tick={{ fill: "var(--color-fg)", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<Tip />} cursor={{ fill: "var(--color-surface-2)" }} />
                {PARTS.map((part) => (
                  <Bar
                    key={part.key}
                    dataKey={part.key}
                    name={part.label}
                    stackId="files"
                    fill={part.fill}
                    isAnimationActive={false}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="px-1 font-mono text-sm text-muted">Bars draw with the table above.</p>
          )}
        </div>
        <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-2 px-1" aria-hidden="true">
          {PARTS.map((part) => (
            <li key={part.key} className="flex items-center gap-2 font-mono text-xs text-muted">
              <span className="inline-block size-2" style={{ background: part.fill }} />
              {part.label}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 border border-line px-4 py-4">
        <p className="font-mono text-xs text-muted">Read off the table. Not a new look.</p>
        <ul className="mt-3 grid gap-2 text-fg">
          <li>
            Longest file-count bar: <span className="font-mono">{fileLeader.root}</span> at{" "}
            <span className="font-mono tabular-nums">{groupInt(fileLeader.files)}</span> files.
          </li>
          <li>
            Largest byte label: <span className="font-mono">{byteLeader.root}</span> at{" "}
            <span className="font-mono tabular-nums">{groupInt(byteLeader.bytes)}</span> bytes.
            {byteLeader.root === fileLeader.root
              ? " Same row. The bytes are still not the bar."
              : " Different row from the file-count leader. Do not treat them as one ranking."}
          </li>
          {pyOverMd.map((row) => (
            <li key={row.root}>
              py greater than md: <span className="font-mono">{row.root}</span> ({row.py} py,{" "}
              {row.md} md).
            </li>
          ))}
          {zeroBak.map((row) => (
            <li key={row.root}>
              bak is 0 on <span className="font-mono">{row.root}</span>.
            </li>
          ))}
          <li>{allHold ? "Every row's parts sum to its file count." : "A row does not sum. See the card."}</li>
        </ul>
      </div>
    </section>
  );
}
