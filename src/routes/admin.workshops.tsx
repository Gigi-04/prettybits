import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Pencil, Trash2, Save, X } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { useAdminCollection } from "@/hooks/useAdminCollection";
import { createWorkshopSession, deleteDocument, updateWorkshopSession } from "@/lib/firestore-admin";
import { toJsDate, type WorkshopSession, type WorkshopItem } from "@/lib/firestore-types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/admin/workshops")({
  component: WorkshopsAdmin,
});

type Draft = {
  id?: string;
  date: string; // yyyy-mm-dd
  time: string;
  totalSlots: number;
  remainingSlots: number;
  items: WorkshopItem[];
};

const emptyDraft = (): Draft => ({
  date: format(new Date(), "yyyy-MM-dd"),
  time: "10:00",
  totalSlots: 8,
  remainingSlots: 8,
  items: [{ name: "Coaster set", price: 350 }],
});

function fromSession(s: WorkshopSession): Draft {
  const d = toJsDate(s.date) ?? new Date();
  const items = s["available items"] ?? s.availableItems ?? [];
  return {
    id: s.id,
    date: format(d, "yyyy-MM-dd"),
    time: s.time ?? "",
    totalSlots: s.totalSlots ?? 0,
    remainingSlots: s.remainingSlots ?? 0,
    items: items.map((i) => ({ name: i.name, price: Number(i.price) || 0 })),
  };
}

function WorkshopsAdmin() {
  const { data, loading, error, refetch } = useAdminCollection<WorkshopSession>("workshopSessions");
  const [draft, setDraft] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (!draft) return;
    setSaving(true);
    try {
      const payload = {
        date: new Date(draft.date + "T00:00:00"),
        time: draft.time,
        totalSlots: draft.totalSlots,
        remainingSlots: draft.remainingSlots,
        availableItems: draft.items.filter((i) => i.name.trim()),
      };
      if (draft.id) {
        await updateWorkshopSession(draft.id, payload);
        toast.success("Workshop updated");
      } else {
        await createWorkshopSession(payload);
        toast.success("Workshop created");
      }
      setDraft(null);
      await refetch();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this workshop session?")) return;
    try {
      await deleteDocument("workshopSessions", id);
      toast.success("Deleted");
      await refetch();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Delete failed");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold">Workshops</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage workshop sessions, dates and item options.</p>
        </div>
        <Button onClick={() => setDraft(emptyDraft())} className="gap-2">
          <Plus className="h-4 w-4" /> New session
        </Button>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {draft && <DraftCard draft={draft} setDraft={setDraft} onSave={save} onCancel={() => setDraft(null)} saving={saving} />}

      {loading && <p className="text-sm text-muted-foreground">Loading…</p>}

      <div className="grid gap-4 md:grid-cols-2">
        {data.map((s) => {
          const d = toJsDate(s.date);
          const items = s["available items"] ?? s.availableItems ?? [];
          return (
            <Card key={s.id}>
              <CardHeader className="flex-row items-start justify-between space-y-0">
                <div>
                  <CardTitle className="text-base">{d ? format(d, "EEE, d MMM yyyy") : "—"}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{s.time ?? ""}</p>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => setDraft(fromSession(s))}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => remove(s.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>
                  <span className="text-muted-foreground">Slots:</span> {s.remainingSlots ?? 0} / {s.totalSlots ?? 0}
                </p>
                <div>
                  <p className="text-muted-foreground mb-1">Items:</p>
                  <ul className="space-y-0.5">
                    {items.map((i, idx) => (
                      <li key={idx} className="flex justify-between">
                        <span>{i.name}</span>
                        <span className="text-muted-foreground">R{i.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function DraftCard({
  draft,
  setDraft,
  onSave,
  onCancel,
  saving,
}: {
  draft: Draft;
  setDraft: (d: Draft) => void;
  onSave: () => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const updateItem = (i: number, patch: Partial<WorkshopItem>) => {
    const items = [...draft.items];
    items[i] = { ...items[i], ...patch };
    setDraft({ ...draft, items });
  };
  return (
    <Card className="border-primary">
      <CardHeader>
        <CardTitle className="text-base">{draft.id ? "Edit session" : "New session"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label>Date</Label>
            <Input type="date" value={draft.date} onChange={(e) => setDraft({ ...draft, date: e.target.value })} />
          </div>
          <div>
            <Label>Time</Label>
            <Input value={draft.time} onChange={(e) => setDraft({ ...draft, time: e.target.value })} placeholder="10:00 – 13:00" />
          </div>
          <div>
            <Label>Total slots</Label>
            <Input type="number" min={1} value={draft.totalSlots} onChange={(e) => setDraft({ ...draft, totalSlots: Number(e.target.value) })} />
          </div>
          <div>
            <Label>Remaining slots</Label>
            <Input type="number" min={0} value={draft.remainingSlots} onChange={(e) => setDraft({ ...draft, remainingSlots: Number(e.target.value) })} />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <Label>Available items</Label>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => setDraft({ ...draft, items: [...draft.items, { name: "", price: 0 }] })}
            >
              <Plus className="h-3 w-3 mr-1" /> Add item
            </Button>
          </div>
          <div className="space-y-2">
            {draft.items.map((it, i) => (
              <div key={i} className="flex gap-2">
                <Input value={it.name} onChange={(e) => updateItem(i, { name: e.target.value })} placeholder="Item name" />
                <Input
                  type="number"
                  className="w-28"
                  value={it.price}
                  onChange={(e) => updateItem(i, { price: Number(e.target.value) })}
                  placeholder="Price"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setDraft({ ...draft, items: draft.items.filter((_, idx) => idx !== i) })}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={onCancel} disabled={saving}>
            <X className="h-4 w-4 mr-1" /> Cancel
          </Button>
          <Button onClick={onSave} disabled={saving}>
            <Save className="h-4 w-4 mr-1" /> {saving ? "Saving…" : "Save"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
