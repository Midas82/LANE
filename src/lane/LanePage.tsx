import { useEffect, useState } from "react";
import { Archive, Eye, Hexagon, Scale, ScrollText, Waypoints, Wrench } from "lucide-react";
import { Ledger } from "./Ledger";
import { Measured } from "./Measured";
import { laneCard, SECTIONS } from "./model";

const SEAT_ICON = {
  operator: ScrollText,
  seam: Wrench,
  device: Eye,
  web: Waypoints,
} as const;

function useActive(ids: readonly string[]) {
  const [active, setActive] = useState<string>(ids[0] ?? "");
  useEffect(() => {
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);
    if (nodes.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.1, 0.25, 0.5] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

export function LanePage() {
  const active = useActive(SECTIONS.map((section) => section.id));
  const { provenance } = laneCard;

  return (
    <div className="min-h-screen bg-bg text-fg">
      <header>
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
          <p className="font-mono text-xs text-muted">Held card · four seats · measured rows only</p>
          <h1 className="mt-3 text-5xl text-fg">LANE</h1>
          <p className="mt-4 max-w-xl text-xl text-fg">{laneCard.confirmation.text}</p>
          <p className="mt-4 max-w-xl border-l-2 border-brass pl-4 text-muted">{laneCard.warning}</p>
        </div>
      </header>
      <nav aria-label="Card sections" className="sticky top-0 z-10 border-y border-line bg-bg/95">
          <ul className="mx-auto flex max-w-3xl gap-1 overflow-x-auto px-2 sm:px-4">
            {SECTIONS.map((section) => {
              const on = active === section.id;
              return (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    aria-current={on ? "true" : undefined}
                    className={
                      on
                        ? "inline-flex h-11 items-center border-b-2 border-brass px-3 font-mono text-xs text-fg"
                        : "inline-flex h-11 items-center border-b-2 border-transparent px-3 font-mono text-xs text-muted"
                    }
                  >
                    {section.label}
                  </a>
                </li>
              );
            })}
          </ul>
      </nav>

      <main className="mx-auto max-w-3xl px-4 sm:px-6">
        <section id="hold" aria-labelledby="hold-title" className="scroll-mt-16 py-12">
          <p className="font-mono text-xs text-muted">Report as relayed</p>
          <h2 id="hold-title" className="mt-2 text-3xl text-fg">
            The look that was already done.
          </h2>
          <dl className="mt-6 grid gap-3 border border-line bg-surface px-4 py-4">
            <ReportRow label="SEAT" value={provenance.seat} />
            <ReportRow label="RAN" value={provenance.ran} />
            <ReportRow label="FOUND" value={provenance.found} />
            <ReportRow label="RELAY" value={provenance.relay} />
          </dl>
          <p className="mt-4 text-muted">{laneCard.source}</p>
          <p className="mt-4 text-fg">{laneCard.next}</p>
        </section>

        <section id="seats" aria-labelledby="seats-title" className="scroll-mt-16 border-t border-line py-12">
          <p className="font-mono text-xs text-muted">Seats</p>
          <h2 id="seats-title" className="mt-2 text-3xl text-fg">
            Four seats. Not renamed.
          </h2>
          <p className="mt-4 text-muted">
            Randy is the operator and the relay. The seam chair is the CLI repair role on forge.
            Device looks. Web reads what was looked at. Three systems are not these seats, and
            these seats are not the disks.
          </p>
          <ol className="mt-6 grid gap-3">
            {laneCard.seats.map((seat, index) => {
              const Icon = SEAT_ICON[seat.id as keyof typeof SEAT_ICON] ?? ScrollText;
              return (
                <li key={seat.id} className="border border-line bg-surface px-4 py-4">
                  <div className="flex items-start gap-3">
                    <Icon className="mt-1 size-5 shrink-0 text-muted" aria-hidden="true" />
                    <div>
                      <p className="font-mono text-xs text-muted">
                        {index + 1} · {seat.role}
                      </p>
                      <h3 className="mt-1 text-2xl text-fg">{seat.name}</h3>
                      <p className="mt-2 text-lg italic text-fg">{seat.words}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        <section id="systems" aria-labelledby="systems-title" className="scroll-mt-16 border-t border-line py-12">
          <p className="font-mono text-xs text-muted">Systems</p>
          <h2 id="systems-title" className="mt-2 text-3xl text-fg">
            {laneCard.systems.law}
          </h2>
          <ol className="mt-6 grid gap-3">
            {laneCard.systems.three.map((system) => (
              <li key={system.id} className="border border-line px-4 py-4">
                <div className="flex items-start gap-3">
                  <SystemMark id={system.id} />
                  <div>
                    <h3 className="text-2xl text-fg">{system.name}</h3>
                    <p className="mt-2 italic text-fg">{system.words}</p>
                    <p className="mt-3 font-mono text-sm text-muted">
                      {system.measuredRoot
                        ? `Measured root: ${system.measuredRoot}`
                        : "No measured root on this card."}
                    </p>
                    <p className="mt-1 text-muted">{system.bindNote}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
          <article className="mt-3 border border-dashed border-line px-4 py-4">
            <div className="flex items-start gap-3">
              <Hexagon className="mt-1 size-5 shrink-0 text-muted" aria-hidden="true" />
              <div>
                <p className="font-mono text-xs text-muted">Outside the three</p>
                <h3 className="mt-1 text-2xl text-fg">{laneCard.systems.outside.name}</h3>
                <p className="mt-2 italic text-fg">{laneCard.systems.outside.words}</p>
              </div>
            </div>
          </article>
        </section>

        <Measured />

        <section id="open" aria-labelledby="open-title" className="scroll-mt-16 border-t border-line py-12">
          <p className="font-mono text-xs text-muted">Open</p>
          <h2 id="open-title" className="mt-2 text-3xl text-fg">
            Still unread. Still not done.
          </h2>
          <p className="mt-4 text-muted">
            Relayed as open. This preview does not close them. The assay stays unread until Randy
            relays that slice.
          </p>
          <ul className="mt-6 grid gap-2">
            {laneCard.not.map((item) => (
              <li
                key={item.id}
                className="border border-dashed border-line px-4 py-3 font-mono text-sm text-fg"
              >
                {item.text}
              </li>
            ))}
          </ul>
        </section>

        <Ledger />

        <section id="reading" aria-labelledby="reading-title" className="scroll-mt-16 border-t border-line py-12">
          <p className="font-mono text-xs text-muted">Web reading</p>
          <h2 id="reading-title" className="mt-2 text-3xl text-fg">
            What to do with the card. Not a new look.
          </h2>
          <ol className="mt-6 grid gap-3">
            {laneCard.webReading.map((line, index) => (
              <li key={line} className="flex gap-3 border border-line px-4 py-3">
                <span className="font-mono text-sm text-muted">{index + 1}</span>
                <p className="text-fg">{line}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 mb-4 font-mono text-xs text-muted">
            Navigate by the section bar. Machine copy is /lane.json. Words on this page are that
            file.
          </p>
        </section>
      </main>
    </div>
  );
}

function ReportRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
      <dt className="w-20 shrink-0 font-mono text-xs text-muted">{label}</dt>
      <dd className="font-mono text-sm text-fg">{value}</dd>
    </div>
  );
}

function SystemMark({ id }: { id: string }) {
  const className = "mt-1 size-5 shrink-0 text-muted";
  if (id === "panoptes") return <Scale className={className} aria-hidden="true" />;
  if (id === "sift") return <Archive className={className} aria-hidden="true" />;
  return <Waypoints className={className} aria-hidden="true" />;
}
