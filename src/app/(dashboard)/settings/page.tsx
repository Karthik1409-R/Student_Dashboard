"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Lock, Bell, ShieldAlert, Eye, Save, Moon } from "lucide-react";

interface SettingSection {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
}

const settingsTabs: SettingSection[] = [
  { id: "profile", label: "Account Profile", icon: User },
  { id: "security", label: "Security & Keys", icon: Lock },
  { id: "notifications", label: "Preferences", icon: Bell },
  { id: "privacy", label: "Privacy Guard", icon: ShieldAlert },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<string>("profile");
  const [emailAlerts, setEmailAlerts] = useState<boolean>(true);
  const [twoFactor, setTwoFactor] = useState<boolean>(false);

  return (
    <main className="w-full bg-[#09090b] border border-zinc-800/80 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col md:flex-row gap-8 text-zinc-400 font-sans max-w-5xl mx-auto">
      {/* 1. INTERNAL CONFIGURATION SIDEBAR */}
      <aside
        className="w-full md:w-64 flex flex-col gap-1 shrink-0"
        aria-label="Settings Categories"
      >
        <header className="mb-4 px-3">
          <h2 className="text-white text-lg font-bold tracking-tight">
            Settings
          </h2>
          <p className="text-zinc-500 text-xs mt-0.5">
            Manage your system credentials
          </p>
        </header>

        <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 list-none">
          {settingsTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSection === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`relative flex items-center gap-3 px-4 py-3 rounded-xl text-xs md:text-sm font-medium transition-colors whitespace-nowrap group w-full ${
                  isActive ? "text-white" : "hover:text-zinc-200"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-settings-tab"
                    className="absolute inset-0 bg-zinc-900 border border-zinc-800/60 rounded-xl -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon
                  size={18}
                  className={
                    isActive
                      ? "text-cyan-400"
                      : "text-zinc-500 group-hover:text-zinc-400"
                  }
                />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* 2. DYNAMIC WORKSPACE PANEL */}
      <section className="flex-1 bg-zinc-950/40 border border-zinc-900/80 rounded-2xl p-6 shadow-inner relative overflow-hidden">
        <AnimatePresence mode="wait">
          {activeSection === "profile" && (
            <motion.form
              key="profile"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-5 h-full justify-between"
            >
              <fieldset className="border-none p-0 m-0 flex flex-col gap-5">
                <legend className="text-white text-base font-semibold mb-2">
                  Account Profile
                </legend>
                <div className="flex flex-col gap-1.5 w-full">
                  <label className="text-xs font-semibold text-zinc-500">
                    DISPLAY NAME
                  </label>
                  <input
                    type="text"
                    defaultValue="Karthik"
                    className="w-full bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5 w-full">
                  <label className="text-xs font-semibold text-zinc-500">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    placeholder="karthik@example.com"
                    className="w-full bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                  />
                </div>
              </fieldset>
              <footer className="pt-4 border-t border-zinc-900 flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500 hover:text-black font-semibold text-sm transition-all shadow-md"
                >
                  <Save size={16} />
                  <span>Save Profile</span>
                </button>
              </footer>
            </motion.form>
          )}

          {activeSection === "security" && (
            <motion.form
              key="security"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-5 h-full justify-between"
            >
              <fieldset className="border-none p-0 m-0 flex flex-col gap-5">
                <legend className="text-white text-base font-semibold mb-2">
                  Security & Keys
                </legend>
                <div className="flex flex-col gap-1.5 w-full">
                  <label className="text-xs font-semibold text-zinc-500">
                    CURRENT PASSWORD
                  </label>
                  <input
                    type="password"
                    className="w-full bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5 w-full">
                  <label className="text-xs font-semibold text-zinc-500">
                    NEW PASSWORD
                  </label>
                  <input
                    type="password"
                    className="w-full bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-zinc-900/30 border border-zinc-800/50 rounded-2xl mt-2">
                  <div>
                    <span className="block text-sm font-medium text-white">
                      Two-Factor Authentication
                    </span>
                    <span className="block text-xs text-zinc-500 mt-0.5">
                      Secure your updates via authenticator tokens
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setTwoFactor(!twoFactor)}
                    className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${twoFactor ? "bg-cyan-500" : "bg-zinc-800"}`}
                  >
                    <motion.span
                      layout
                      className="bg-zinc-950 w-4 h-4 rounded-full shadow-md"
                    />
                  </button>
                </div>
              </fieldset>
              <footer className="pt-4 border-t border-zinc-900 flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 hover:bg-purple-500 hover:text-black font-semibold text-sm transition-all shadow-md"
                >
                  <Lock size={16} />
                  <span>Update Password</span>
                </button>
              </footer>
            </motion.form>
          )}

          {activeSection === "notifications" && (
            <motion.div
              key="notifications"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-4"
            >
              <h3 className="text-white text-base font-semibold mb-2">
                System Preferences
              </h3>
              <div className="flex items-center justify-between p-4 bg-zinc-900/30 border border-zinc-800/50 rounded-2xl">
                <div>
                  <span className="block text-sm font-medium text-white">
                    Email Digest Logs
                  </span>
                  <span className="block text-xs text-zinc-500 mt-0.5">
                    Receive weekly reports on class activity tracking
                  </span>
                </div>
                <button
                  onClick={() => setEmailAlerts(!emailAlerts)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${emailAlerts ? "bg-cyan-500" : "bg-zinc-800"}`}
                >
                  <motion.span
                    layout
                    className="bg-zinc-950 w-4 h-4 rounded-full shadow-md"
                  />
                </button>
              </div>
              <div className="flex items-center justify-between p-4 bg-zinc-900/30 border border-zinc-800/50 rounded-2xl">
                <div>
                  <span className="block text-sm font-medium text-white">
                    Interface Highlighting
                  </span>
                  <span className="block text-xs text-zinc-500 mt-0.5">
                    Use cinema colors with neon status tracks
                  </span>
                </div>
                <span className="text-zinc-500 text-xs flex items-center gap-1.5 font-medium bg-zinc-900 px-2.5 py-1 rounded-md border border-zinc-800">
                  <Moon size={12} /> Active Dark
                </span>
              </div>
            </motion.div>
          )}

          {activeSection === "privacy" && (
            <motion.div
              key="privacy"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-4"
            >
              <h3 className="text-white text-base font-semibold mb-2">
                Privacy Guard
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Configure visibility parameters regarding metrics dashboards. By
                default, your completion analytics indices are shared securely
                with system admins.
              </p>
              <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/10 text-orange-400 text-xs flex gap-3 items-start mt-2">
                <Eye size={16} className="shrink-0 mt-0.5" />
                <span>
                  Modifying token configurations can sign you out of active
                  browser contexts globally. Handle API keys with care.
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}
