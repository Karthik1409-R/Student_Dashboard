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
  X,
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
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

  const checkActive = (href: string) =>
    pathname === href || pathname?.startsWith(`${href}/`);

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. FIXED MOBILE RESPONSIVE TOP BAR (Sticky on scroll)                     */}
      {/* ========================================================================= */}
      <header className="lg:hidden w-full h-16 bg-[#09090b] border-b border-zinc-800/80 px-4 flex items-center justify-between sticky top-0 z-40 shrink-0">
        <h1 className="text-lg font-bold bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          LearnX
        </h1>
        <button
          onClick={() => setIsMobileOpen(true)}
          aria-label="Open navigation drawer"
          className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
        >
          <Menu size={18} />
        </button>
      </header>

      {/* ========================================================================= */}
      {/* 2. MOBILE SLIDE-OUT DRAWER OVERLAY                                        */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="lg:hidden fixed top-0 bottom-0 left-0 w-72 bg-[#09090b] border-r border-zinc-800/80 p-5 flex flex-col z-50 text-zinc-400"
            >
              <header className="flex items-center justify-between h-12 mb-8 px-1">
                <h2 className="text-xl font-bold bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  LearnX
                </h2>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  aria-label="Close navigation drawer"
                  className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
                >
                  <X size={16} />
                </button>
              </header>

              <nav className="flex flex-col gap-2 flex-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = checkActive(item.href);

                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => setIsMobileOpen(false)}
                      className={`relative flex items-center gap-3.5 w-full p-3.5 rounded-xl text-sm font-medium transition-colors ${
                        isActive ? "text-white" : "hover:text-zinc-200"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="active-pill-mobile"
                          className="absolute inset-0 bg-linear-to-r from-zinc-800/80 to-zinc-950 border border-zinc-700/50 rounded-xl -z-10"
                        />
                      )}
                      <Icon
                        size={20}
                        className={isActive ? "text-indigo-400" : ""}
                      />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 3. PREMIUM FIXED DESKTOP INTERFACE (Pointers locked to view boundary)     */}
      {/* ========================================================================= */}
      <motion.aside
        aria-label="Sidebar Navigation"
        animate={{ width: isCollapsed ? 80 : 256 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        /* 
          FIXES APPLIED HERE:
          - Added 'fixed top-0 left-0 h-screen' to ensure it stays pinned globally.
          - Removed layout breaking padding classes to preserve layout alignment.
        */
        className="hidden lg:flex flex-col fixed top-0 left-0 h-screen bg-[#09090b] border-r border-zinc-800/80 p-4 text-zinc-400 select-none z-40 shrink-0"
      >
        <header className="flex items-center justify-between h-12 mb-8 px-2 w-full">
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.h1
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="text-xl font-bold bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
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

        <nav className="flex flex-col gap-1.5 flex-1 w-full">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = checkActive(item.href);

            return (
              <Link
                key={item.id}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`relative flex items-center gap-3 w-full p-3 rounded-xl text-sm font-medium transition-colors group ${
                  isActive ? "text-white" : "hover:text-zinc-200"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-pill"
                    className="absolute inset-0 bg-linear-to-r from-zinc-800/80 to-zinc-950 border border-zinc-700/50 rounded-xl -z-10"
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
    </>
  );
}
