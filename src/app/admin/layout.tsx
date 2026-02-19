import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { ToastProvider } from "@/components/admin/ui/Toast";

export const metadata: Metadata = {
  title: "Admin | Portfolio CMS",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider>
      <AdminShell>{children}</AdminShell>
    </ToastProvider>
  );
}
