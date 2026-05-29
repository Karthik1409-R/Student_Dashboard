"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Settings,
  User,
  ChevronLeft,
  Menu,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  id: string;
  href: string;
}

const navItems: NavItem[] = [
  {
    id: "dashboard",
    name: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  { id: "courses", name: "Courses", icon: BookOpen, href: "/courses" },
  { id: "profile", name: "Profile", icon: User, href: "/profile" },
  { id: "settings", name: "Settings", icon: Settings, href: "/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  return (
    <motion.aside
      aria-label="Sidebar Navigation"
      animate={{ width: isCollapsed ? 80 : 256 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="relative flex flex-col h-screen bg-[#09090b] border-r border-zinc-800/80 p-4 text-zinc-400 select-none mountaineer-layer z-50 shrink-0"
    >
      {/* Header Branding */}
      <header className="flex items-center justify-between h-12 mb-8 px-2 w-full">
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.h1
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="text-xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              LearnX
            </motion.h1>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="p-2 rounded-lg bg-zinc-900/50 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
        >
          {isCollapsed ? <Menu size={16} /> : <ChevronLeft size={16} />}
        </button>
      </header>

      {/* Main Navigation Links */}
      <nav className="flex flex-col gap-1.5 flex-1 w-full">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname?.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.id}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`relative flex items-center gap-3 w-full p-3 rounded-xl text-sm font-medium transition-colors group ${
                isActive ? "text-white" : "hover:text-zinc-200"
              }`}
            >
              {/* Sliding Pill Accent Indicator */}
              {isActive && (
                <motion.span
                  layoutId="active-pill"
                  className="absolute inset-0 bg-gradient-to-r from-zinc-800/80 to-zinc-950 border border-zinc-700/50 rounded-xl -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              <span
                className={`transition-transform duration-200 group-hover:scale-105 ${isActive ? "text-indigo-400" : ""}`}
              >
                <Icon size={20} />
              </span>

              <AnimatePresence mode="wait">
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -5 }}
                    className="whitespace-nowrap"
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>
    </motion.aside>
  );
}
