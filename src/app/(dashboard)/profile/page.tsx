"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  BookOpen,
  Calendar,
  Clock,
  Flame,
  GraduationCap,
  Mail,
  MapPin,
  ShieldCheck,
  Trophy,
} from "lucide-react";

const profileTabs = [
  { id: "overview", label: "Overview", icon: GraduationCap },
  { id: "certificates", label: "Certificates", icon: Award },
  { id: "badges", label: "Badges", icon: Trophy },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<string>("overview");

  return (
    <main className="w-full bg-[#09090b] border border-zinc-800/80 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col gap-8 max-w-5xl mx-auto">
      {/* PROFILE HEADER HERO */}
      <header className="relative overflow-hidden bg-zinc-950 border border-zinc-900/80 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 w-full">
        <span className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/10 blur-[80px] rounded-full" />
        <figure className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 p-[2px] shrink-0 shadow-xl">
          <span className="flex items-center justify-center w-full h-full bg-zinc-950 rounded-2xl text-2xl font-bold text-white">
            K
          </span>
          <span className="absolute -bottom-1 -right-1 p-1 rounded-lg bg-emerald-500 border-2 border-zinc-950 block" />
        </figure>

        <section className="flex-1 text-center md:text-left relative z-10">
          <fieldset className="border-none p-0 m-0 flex flex-col md:flex-row md:items-center gap-2.5">
            <h2 className="text-xl font-bold text-white tracking-tight">
              Karthik Kumar
            </h2>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 w-fit mx-auto md:mx-0">
              <ShieldCheck size={12} /> PRO STUDENT
            </span>
          </fieldset>
          <address className="not-italic flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-1.5 mt-3 text-xs font-medium text-zinc-500">
            <span className="flex items-center gap-1.5">
              <Mail size={14} /> karthik@example.com
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={14} /> Chennai, India
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} /> Joined May 2024
            </span>
          </address>
        </section>

        <footer className="shrink-0 flex items-center gap-2.5 px-4 py-2 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 font-semibold text-sm">
          <Flame size={18} fill="currentColor" />
          <span>7 Day Streak</span>
        </footer>
      </header>

      {/* HORIZONTAL INTERACTIVE NAVIGATION TABS */}
      <nav className="flex gap-2 border-b border-zinc-900 pb-px list-none overflow-x-auto">
        {profileTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2 px-4 py-2.5 text-xs md:text-sm font-medium transition-colors pb-3 ${
                isActive ? "text-white" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
              {isActive && (
                <motion.span
                  layoutId="active-profile-tab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* PROFILE VIEWS MOUNT CONTAINER */}
      <section className="flex-1" aria-live="polite">
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.section
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <article className="bg-zinc-950/50 border border-zinc-900 rounded-2xl p-5 flex items-center gap-4 group hover:border-zinc-800 transition-colors">
                <span className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                  <BookOpen size={20} />
                </span>
                <fieldset className="border-none p-0 m-0">
                  <span className="block text-2xl font-bold text-white tracking-tight">
                    4
                  </span>
                  <span className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mt-0.5">
                    Active Courses
                  </span>
                </fieldset>
              </article>
              <article className="bg-zinc-950/50 border border-zinc-900 rounded-2xl p-5 flex items-center gap-4 group hover:border-zinc-800 transition-colors">
                <span className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <Clock size={20} />
                </span>
                <fieldset className="border-none p-0 m-0">
                  <span className="block text-2xl font-bold text-white tracking-tight">
                    32.5h
                  </span>
                  <span className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mt-0.5">
                    Learning Time
                  </span>
                </fieldset>
              </article>
              <article className="bg-zinc-950/50 border border-zinc-900 rounded-2xl p-5 flex items-center gap-4 group hover:border-zinc-800 transition-colors">
                <span className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <Award size={20} />
                </span>
                <fieldset className="border-none p-0 m-0">
                  <span className="block text-2xl font-bold text-white tracking-tight">
                    88%
                  </span>
                  <span className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mt-0.5">
                    Average Score
                  </span>
                </fieldset>
              </article>
            </motion.section>
          )}

          {activeTab === "certificates" && (
            <motion.ol
              key="certificates"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col gap-3 list-none p-0 m-0"
            >
              <li className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-zinc-950/50 border border-zinc-900 hover:border-zinc-800 rounded-2xl gap-4">
                <fieldset className="border-none p-0 m-0 flex items-center gap-3">
                  <span className="text-amber-400">
                    <Award size={22} />
                  </span>
                  <div>
                    <span className="block text-sm font-semibold text-white">
                      Advanced Next.js Architecture
                    </span>
                    <span className="block text-xs text-zinc-500 mt-0.5">
                      Issued September 2025 • ID: NX-99210
                    </span>
                  </div>
                </fieldset>
                <button className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 transition-colors self-end sm:self-auto">
                  View Credentials
                </button>
              </li>
            </motion.ol>
          )}

          {activeTab === "badges" && (
            <motion.ul
              key="badges"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 list-none p-0 m-0"
            >
              {[
                {
                  title: "Fast Learner",
                  desc: "Completed 2 lessons in one day",
                  color: "text-amber-400 bg-amber-500/5 border-amber-500/10",
                },
                {
                  title: "Code Warrior",
                  desc: "100% scores on project tasks",
                  color: "text-purple-400 bg-purple-500/5 border-purple-500/10",
                },
                {
                  title: "Night Owl",
                  desc: "Studied after midnight",
                  color: "text-indigo-400 bg-indigo-500/5 border-indigo-500/10",
                },
                {
                  title: "Unstoppable",
                  desc: "Maintained a 7-day streak",
                  color: "text-orange-400 bg-orange-500/5 border-orange-500/10",
                },
              ].map((badge) => (
                <li
                  key={badge.title}
                  className={`p-4 rounded-2xl border text-center flex flex-col items-center justify-center gap-2 ${badge.color}`}
                >
                  <Trophy size={24} />
                  <span className="block text-xs font-bold text-white tracking-tight mt-1">
                    {badge.title}
                  </span>
                  <span className="block text-[10px] text-zinc-500 leading-normal max-w-[120px]">
                    {badge.desc}
                  </span>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}
