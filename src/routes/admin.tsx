import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — PrettyBits" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 min-w-0 p-6 lg:p-10">
        <Outlet />
      </div>
    </div>
  );
}
