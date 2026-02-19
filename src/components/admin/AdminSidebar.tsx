"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "◆" },
  { href: "/admin/projects", label: "Projects", icon: "▦" },
  { href: "/admin/articles", label: "Articles", icon: "▤" },
  { href: "/admin/testimonials", label: "Testimonials", icon: "❝" },
  { href: "/admin/experiences", label: "Experiences", icon: "◉" },
  { href: "/admin/translations", label: "Translations", icon: "⇄" },
  { href: "/admin/seo", label: "Page SEO", icon: "◎" },
  { href: "/admin/settings", label: "Settings", icon: "⚙" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <aside className="flex w-56 flex-col border-r border-white/10 bg-[#0f0f12]">
      <div className="border-b border-white/10 px-5 py-5">
        <h1 className="text-sm font-semibold tracking-wider uppercase text-white/70">
          Portfolio CMS
        </h1>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                isActive
                  ? "bg-white/10 text-white"
                  : "text-white/50 hover:bg-white/5 hover:text-white/80"
              }`}
            >
              <span className="text-xs">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-3">
        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/50 transition-colors hover:bg-white/5 hover:text-white/80"
        >
          <span className="text-xs">⏻</span>
          Sign Out
        </button>
      </div>
    </aside>
  );
}
