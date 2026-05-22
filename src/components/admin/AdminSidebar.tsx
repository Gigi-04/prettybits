import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Package, CalendarDays, Users, Sparkles, Home } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/admin/workshops", label: "Workshops", icon: CalendarDays, exact: false },
  { to: "/admin/reservations", label: "Reservations", icon: Users, exact: false },
  { to: "/admin/private-bookings", label: "Private Bookings", icon: Users, exact: false },
  { to: "/admin/custom-requests", label: "Custom Requests", icon: Sparkles, exact: false },
  { to: "/admin/starter-kit-orders", label: "Starter Kit Orders", icon: Package, exact: false },
] as const;

export function AdminSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="w-60 shrink-0 border-r border-border bg-card/40 min-h-[calc(100vh-5rem)]">
      <div className="p-6">
        <p className="font-script text-xl text-primary">Admin</p>
        <p className="text-xs text-muted-foreground">PrettyBits dashboard</p>
      </div>
      <nav className="px-3 space-y-1">
        {links.map((l) => {
          const active = l.exact ? pathname === l.to : pathname.startsWith(l.to);
          const Icon = l.icon;
          return (
            <Link
              key={l.to}
              to={l.to}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {l.label}
            </Link>
          );
        })}
        <Link
          to="/"
          className="mt-6 flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <Home className="h-4 w-4" />
          Back to site
        </Link>
      </nav>
    </aside>
  );
}
