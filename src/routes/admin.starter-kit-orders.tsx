import { createFileRoute } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useAdminCollection } from "@/hooks/useAdminCollection";
import { deleteDocument, updateDocument } from "@/lib/firestore-admin";
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

export const Route = createFileRoute("/admin/starter-kit-orders")({
  component: StarterKitOrdersAdmin,
});

type Row = {
  id: string;
  itemName?: string;
  colours?: string[];
  glitter?: string;
  quantity?: number;
  total?: number;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  notes?: string;
  status?: string;
};

function StarterKitOrdersAdmin() {
  const { data, loading, error, refetch } = useAdminCollection<Row>("starterKitOrders", "createdAt");

  const setStatus = async (id: string, status: string) => {
    await updateDocument("starterKitOrders", id, { status });
    toast.success("Updated");
    await refetch();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this order?")) return;
    await deleteDocument("starterKitOrders", id);
    toast.success("Deleted");
    await refetch();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold">Starter Kit Orders</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage incoming starter kit orders.</p>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      {loading && <p className="text-sm text-muted-foreground">Loading…</p>}
      {!loading && data.length === 0 && <p className="text-sm text-muted-foreground">No orders yet.</p>}

      <div className="space-y-4">
        {data.map((o) => (
          <Card key={o.id}>
            <CardHeader className="flex-row items-start justify-between space-y-0">
              <div>
                <CardTitle className="text-base">{o.name} — {o.itemName} × {o.quantity ?? 1}</CardTitle>
                <p className="text-xs text-muted-foreground mt-1">{o.email} · {o.phone}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge>R{o.total}</Badge>
                <Select value={o.status ?? "new"} onValueChange={(v) => setStatus(o.id, v)}>
                  <SelectTrigger className="w-36 h-8"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="packed">Packed</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="ghost" size="icon" onClick={() => remove(o.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p><span className="text-muted-foreground">Colours:</span> {(o.colours ?? []).join(", ")}</p>
              <p><span className="text-muted-foreground">Glitter:</span> {o.glitter}</p>
              <p><span className="text-muted-foreground">Address:</span> {o.address}</p>
              {o.notes && <p className="text-muted-foreground italic">"{o.notes}"</p>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
