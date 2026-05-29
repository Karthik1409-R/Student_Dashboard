"use client";

import { Flame } from "lucide-react";
import { motion } from "framer-motion";

const weeklyData = [
  { day: "Monday", percentage: 40 },
  { day: "Tuesday", percentage: 80 },
  { day: "Wednesday", percentage: 30 },
  { day: "Thursday", percentage: 90 },
  { day: "Friday", percentage: 60 },
  { day: "Saturday", percentage: 70 },
  { day: "Sunday", percentage: 50 },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 max-w-5xl w-full mx-auto">
      {/* HERO CARD */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-br from-zinc-950 via-[#0e0e11] to-zinc-900 rounded-3xl p-8 border border-zinc-800/80 shadow-xl"
      >
        <span className="absolute -top-24 -right-24 w-48 h-48 bg-orange-500/10 blur-[80px] rounded-full pointer-events-none" />
        <header className="relative z-10 flex flex-col gap-2">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Welcome back, Karthik 👋
          </h2>
          <p className="text-zinc-400 text-sm md:text-base font-medium max-w-md">
            You are doing great this week! Ready to smash today's learning
            objectives?
          </p>
        </header>
        <footer className="relative z-10 mt-6 flex">
          <span className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-400 font-semibold text-sm">
            <Flame size={18} fill="currentColor" />7 Day Learning Streak
          </span>
        </footer>
      </motion.section>

      {/* PERFORMANCE METRICS LIST CARD */}
      <section className="w-full bg-zinc-950 border border-zinc-800/80 rounded-3xl p-6 shadow-xl flex flex-col">
        <header className="flex justify-between items-start mb-6 w-full">
          <fieldset className="border-none p-0 m-0">
            <h2 className="text-white text-base font-semibold tracking-tight">
              Weekly Performance
            </h2>
            <p className="text-zinc-500 text-xs mt-0.5">
              Daily breakdown of focus milestones
            </p>
          </fieldset>
          <span className="text-[11px] font-bold px-2 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            60% Avg
          </span>
        </header>

        <ol className="flex flex-col gap-4 list-none w-full m-0 p-0">
          {weeklyData.map((item, index) => (
            <li key={item.day} className="group flex flex-col gap-2 w-full">
              <label className="flex justify-between items-center text-xs font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors">
                <span>{item.day}</span>
                <span className="font-bold text-zinc-500 group-hover:text-cyan-400">
                  {item.percentage}%
                </span>
              </label>
              <span className="relative w-full h-2 bg-zinc-900 border border-zinc-800/50 rounded-full overflow-hidden block">
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: `${item.percentage}%` }}
                  transition={{
                    type: "spring",
                    stiffness: 65,
                    damping: 14,
                    delay: index * 0.04,
                  }}
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                />
              </span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
