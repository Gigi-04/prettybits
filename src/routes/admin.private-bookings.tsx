import { createFileRoute } from "@tanstack/react-router";
import { format } from "date-fns";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useAdminCollection } from "@/hooks/useAdminCollection";
import { deleteDocument, updateDocument } from "@/lib/firestore-admin";
import { toJsDate, type PrivateBooking } from "@/lib/firestore-types";
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

export const Route = createFileRoute("/admin/private-bookings")({
  component: PrivateBookingsAdmin,
});

type Row = PrivateBooking & { id: string; status?: string };

function PrivateBookingsAdmin() {
  const { data, loading, error, refetch } = useAdminCollection<Row>("privateBookings", "createdAt");

  const setStatus = async (id: string, status: string) => {
    await updateDocument("privateBookings", id, { status });
    toast.success("Status updated");
    await refetch();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this booking?")) return;
    await deleteDocument("privateBookings", id);
    toast.success("Deleted");
    await refetch();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold">Private Bookings</h1>
        <p className="text-sm text-muted-foreground mt-1">Custom private session enquiries.</p>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      {loading && <p className="text-sm text-muted-foreground">Loading…</p>}
      {!loading && data.length === 0 && <p className="text-sm text-muted-foreground">No private bookings yet.</p>}

      <div className="space-y-4">
        {data.map((b) => {
          const d = toJsDate(b.date);
          return (
            <Card key={b.id}>
              <CardHeader className="flex-row items-start justify-between space-y-0">
                <div>
                  <CardTitle className="text-base">{b.contactName}</CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">{b.email} · {b.phone}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{d ? format(d, "d MMM yyyy") : "—"}</Badge>
                  <Select value={b.status ?? "new"} onValueChange={(v) => setStatus(b.id, v)}>
                    <SelectTrigger className="w-32 h-8"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="declined">Declined</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="ghost" size="icon" onClick={() => remove(b.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p><span className="text-muted-foreground">Guests:</span> {b.guestCount}</p>
                <div>
                  <p className="text-muted-foreground mb-1">Guest preferences:</p>
                  <ul className="space-y-1">
                    {(b.guests ?? []).map((g, i) => (
                      <li key={i}>{g.name} — {g.workshop}</li>
                    ))}
                  </ul>
                </div>
                {b.notes && <p className="text-muted-foreground italic">"{b.notes}"</p>}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
