import type { EditionEventAction } from "../../contracts/types";
import type { EditionEventView } from "../../features/get-edition/types";
import { formatDateTime } from "../../shared/ui/status-badge";

const ACTION_LABELS: Record<EditionEventAction, string> = {
  created: "criou a lista",
  saved: "salvou alterações",
  submitted: "enviou para aprovação",
  approved: "aprovou",
  rejected: "devolveu para ajustes",
  published: "publicou o PDF",
};

export function HistoryTab({ events }: { events: EditionEventView[] }) {
  if (events.length === 0) return <p className="text-sm text-muted-foreground">Sem registros.</p>;
  return (
    <ol className="space-y-3">
      {events.map((event) => (
        <li key={event.id} className="border-l-2 border-border pl-3 text-sm">
          <p>
            <span className="font-medium">{event.actorName}</span> {ACTION_LABELS[event.action]}
            <span className="text-muted-foreground"> · {formatDateTime(event.createdAt)}</span>
          </p>
          {event.note && <p className="mt-0.5 whitespace-pre-line text-muted-foreground">{event.note}</p>}
        </li>
      ))}
    </ol>
  );
}
