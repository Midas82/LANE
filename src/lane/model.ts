import lane from "../../public/lane.json";

export type FindingKind =
  | "look"
  | "measure"
  | "strata"
  | "reading"
  | "flag"
  | "hybrid"
  | "correction";

export type AddedBy = "operator" | "cli-seam" | "device" | "web";

export type FindingStatus = "open" | "held" | "closed";

export interface MeasuredRow {
  root: string;
  files: number;
  bytes: number;
  md: number;
  py: number;
  bak: number;
  other: number;
}

export interface HashRow {
  path: string;
  sha256: string;
  bytes: number;
}

export interface Finding {
  id: string;
  addedBy: AddedBy;
  relayed: boolean;
  at: string | null;
  kind: FindingKind;
  subject: string;
  body: string;
  measured: boolean;
  numbers: MeasuredRow | null;
  hashes: HashRow[] | null;
  conflictsWith: string[] | null;
  status: FindingStatus;
  draft?: boolean;
}

export const laneCard = lane;

export const measuredRows = lane.measured.rows;

export const heldFindings = lane.findings as Finding[];

export const KINDS: FindingKind[] = [
  "look",
  "measure",
  "strata",
  "reading",
  "flag",
  "hybrid",
  "correction",
];

export const ADDED_BY: { id: AddedBy; label: string }[] = [
  { id: "operator", label: "Operator" },
  { id: "cli-seam", label: "Seam chair" },
  { id: "device", label: "Device" },
  { id: "web", label: "Web" },
];

export const SECTIONS = [
  { id: "hold", label: "Card" },
  { id: "seats", label: "Seats" },
  { id: "systems", label: "Systems" },
  { id: "measured", label: "Measured" },
  { id: "open", label: "Open" },
  { id: "append", label: "Append" },
  { id: "reading", label: "Reading" },
] as const;

export function parts(row: MeasuredRow): number {
  return row.md + row.py + row.bak + row.other;
}

export function holds(row: MeasuredRow): boolean {
  return parts(row) === row.files;
}

export function groupInt(n: number): string {
  return new Intl.NumberFormat("en-US").format(n);
}

/** Last path segment for the chart axis only. The root string is not changed. */
export function axisName(root: string): string {
  const cut = root.split("/");
  return cut[cut.length - 1] || root;
}

export function leader(
  rows: MeasuredRow[],
  key: "files" | "bytes",
): MeasuredRow {
  return rows.reduce((best, row) => (row[key] > best[key] ? row : best));
}

const DRAFT_KEY = "lane.drafts.v1";

export function loadDrafts(): Finding[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isDraft);
  } catch {
    return [];
  }
}

export function saveDrafts(drafts: Finding[]): void {
  window.localStorage.setItem(DRAFT_KEY, JSON.stringify(drafts));
}

function isDraft(value: unknown): value is Finding {
  if (!value || typeof value !== "object") return false;
  const row = value as Partial<Finding>;
  return (
    typeof row.id === "string" &&
    typeof row.subject === "string" &&
    typeof row.body === "string" &&
    row.draft === true &&
    row.measured === false &&
    row.numbers === null &&
    row.hashes === null
  );
}

export function exportDocument(drafts: Finding[]) {
  return {
    ...laneCard,
    findings: [...heldFindings, ...drafts],
    exportNote:
      "Browser drafts are included with draft true. They are not measurements. measured.rows were not edited by the export.",
  };
}
