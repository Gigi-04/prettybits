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

export const Route = createFileRoute("/admin/custom-requests")({
  component: CustomRequestsAdmin,
});

type Row = {
  id: string;
  occasion?: string;
  itemType?: string;
  size?: string;
  photoCount?: number;
  name?: string;
  email?: string;
  phone?: string;
  deadline?: string;
  vision?: string;
  status?: string;
};

function CustomRequestsAdmin() {
  const { data, loading, error, refetch } = useAdminCollection<Row>("customInquiries", "createdAt");

  const setStatus = async (id: string, status: string) => {
    await updateDocument("customInquiries", id, { status });
    toast.success("Updated");
    await refetch();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this request?")) return;
    await deleteDocument("customInquiries", id);
    toast.success("Deleted");
    await refetch();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold">Custom Piece Requests</h1>
        <p className="text-sm text-muted-foreground mt-1">Bespoke piece enquiries from customers.</p>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      {loading && <p className="text-sm text-muted-foreground">Loading…</p>}
      {!loading && data.length === 0 && <p className="text-sm text-muted-foreground">No custom requests yet.</p>}

      <div className="space-y-4">
        {data.map((r) => (
          <Card key={r.id}>
            <CardHeader className="flex-row items-start justify-between space-y-0">
              <div>
                <CardTitle className="text-base">{r.name ?? "Unknown"} — {r.itemType}</CardTitle>
                <p className="text-xs text-muted-foreground mt-1">{r.email} · {r.phone}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{r.occasion}</Badge>
                <Select value={r.status ?? "new"} onValueChange={(v) => setStatus(r.id, v)}>
                  <SelectTrigger className="w-36 h-8"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="quoted">Quoted</SelectItem>
                    <SelectItem value="in_progress">In progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="declined">Declined</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="ghost" size="icon" onClick={() => remove(r.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="grid sm:grid-cols-3 gap-2 text-muted-foreground">
                <p><span className="font-medium text-foreground">Size:</span> {r.size}</p>
                <p><span className="font-medium text-foreground">Photos:</span> {r.photoCount ?? 0}</p>
                <p><span className="font-medium text-foreground">Deadline:</span> {r.deadline || "—"}</p>
              </div>
              {r.vision && <p className="text-muted-foreground italic">"{r.vision}"</p>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
