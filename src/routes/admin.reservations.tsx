import { createFileRoute } from "@tanstack/react-router";
import { format } from "date-fns";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useAdminCollection } from "@/hooks/useAdminCollection";
import { deleteDocument, updateDocument } from "@/lib/firestore-admin";
import { toJsDate, type Reservation } from "@/lib/firestore-types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/admin/reservations")({
  component: ReservationsAdmin,
});

type Row = Reservation & { id: string };

function ReservationsAdmin() {
  const { data, loading, error, refetch } = useAdminCollection<Row>("reservations", "createdAt");

  const setStatus = async (id: string, status: string) => {
    try {
      await updateDocument("reservations", id, { status });
      toast.success("Status updated");
      await refetch();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Update failed");
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this reservation?")) return;
    await deleteDocument("reservations", id);
    toast.success("Deleted");
    await refetch();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold">Workshop Reservations</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage incoming workshop bookings.</p>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      {loading && <p className="text-sm text-muted-foreground">Loading…</p>}
      {!loading && data.length === 0 && <p className="text-sm text-muted-foreground">No reservations yet.</p>}

      <div className="space-y-4">
        {data.map((r) => {
          const d = toJsDate(r.date);
          return (
            <Card key={r.id}>
              <CardHeader className="flex-row items-start justify-between space-y-0">
                <div>
                  <CardTitle className="text-base">{r.contactName}</CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">
                    {r.email} · {r.phone}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{d ? format(d, "d MMM yyyy") : "—"}</Badge>
                  <Select value={r.status ?? "pending"} onValueChange={(v) => setStatus(r.id, v)}>
                    <SelectTrigger className="w-36 h-8"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="ghost" size="icon" onClick={() => remove(r.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Guests ({r.guestCount}):</p>
                  <ul className="space-y-1">
                    {(r.guests ?? []).map((g, i) => (
                      <li key={i} className="flex justify-between border-b border-border/40 pb-1 last:border-0">
                        <span>{g.name} — {g.workshopName}</span>
                        <span className="text-muted-foreground">R{g.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>R{r.totalAmount}</span>
                </div>
                {r.notes && <p className="text-muted-foreground italic">"{r.notes}"</p>}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
