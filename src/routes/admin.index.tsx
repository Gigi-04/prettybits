import { createFileRoute } from "@tanstack/react-router";
import { useAdminCollection } from "@/hooks/useAdminCollection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CalendarDays, Sparkles, Package } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: AdminOverview,
});

function StatCard({ label, value, icon: Icon, loading }: { label: string; value: number; icon: React.ElementType; loading: boolean }) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-display font-semibold">{loading ? "—" : value}</div>
      </CardContent>
    </Card>
  );
}

function AdminOverview() {
  const reservations = useAdminCollection<unknown>("reservations", "createdAt");
  const privateBookings = useAdminCollection<unknown>("privateBookings", "createdAt");
  const custom = useAdminCollection<unknown>("customInquiries", "createdAt");
  const orders = useAdminCollection<unknown>("starterKitOrders", "createdAt");
  const workshops = useAdminCollection<unknown>("workshopSessions");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Quick overview of what's coming in.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Reservations" value={reservations.data.length} icon={Users} loading={reservations.loading} />
        <StatCard label="Private Bookings" value={privateBookings.data.length} icon={Users} loading={privateBookings.loading} />
        <StatCard label="Custom Requests" value={custom.data.length} icon={Sparkles} loading={custom.loading} />
        <StatCard label="Starter Kit Orders" value={orders.data.length} icon={Package} loading={orders.loading} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base"><CalendarDays className="h-4 w-4" /> Active workshop sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-display font-semibold">{workshops.loading ? "—" : workshops.data.length}</p>
        </CardContent>
      </Card>
    </div>
  );
}
