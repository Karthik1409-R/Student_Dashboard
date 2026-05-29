"use client";

import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import * as Icons from "lucide-react";

interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  created_at: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // States to persist state changes locally per course ID
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});
  const [cart, setCart] = useState<Record<string, boolean>>({});

  useEffect(() => {
    async function fetchCoursesViaAPI() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/courses", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "HTTP pipeline request failed.");
        }

        const data = await response.json();
        const courseList = Array.isArray(data) ? data : data?.data;

        if (!Array.isArray(courseList)) {
          throw new Error("Invalid course payload received from the server.");
        }

        setCourses(courseList as Course[]);
      } catch (err: any) {
        console.error("API Router Fetch Error:", err);
        setError(
          err.message || "Failed to communicate with internal route handlers.",
        );
      } finally {
        setLoading(false);
      }
    }

    fetchCoursesViaAPI();
  }, []);

  // Handler functions to intercept click parameters safely
  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleCart = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCart((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading) {
    return (
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl w-full mx-auto auto-rows-[200px]">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div
            key={n}
            className={`bg-zinc-950 border border-zinc-900/80 rounded-3xl animate-pulse ${
              n === 1 || n === 4 || n === 5 ? "md:col-span-2" : "md:col-span-1"
            }`}
          />
        ))}
      </section>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto p-4 rounded-xl bg-red-500/5 border border-red-500/10 text-red-400 text-sm font-medium">
        Error synchronizing data matrix: {error}
      </div>
    );
  }

  return (
    <main className="w-full max-w-5xl mx-auto flex flex-col gap-6">
      <header className="px-2">
        <h2 className="text-white text-xl font-bold tracking-tight">
          Your Course Matrix
        </h2>
        <p className="text-zinc-500 text-xs mt-0.5">
          Explore your ongoing learning milestones in an interactive Bento view
        </p>
      </header>

      {/* PARENT MOTIVATOR */}
      <motion.ul
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full auto-rows-[200px] list-none p-0 m-0"
      >
        {courses.map((course, index) => {
          const LucideIcon = (Icons[course.icon_name as keyof typeof Icons] ||
            Icons.BookOpen) as React.ComponentType<{
            className?: string;
            size?: number;
          }>;
          const isWideCard = index === 0 || index === 3 || index === 4;

          const isWishlisted = !!wishlist[course.id];
          const isInCart = !!cart[course.id];

          const formattedDate = new Date(course.created_at).toLocaleDateString(
            "en-US",
            {
              month: "short",
              day: "numeric",
              year: "numeric",
            },
          );

          return (
            /* CHILD CARD HOOK */
            <motion.li
              key={course.id}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              className={`w-full h-full ${isWideCard ? "md:col-span-2" : "md:col-span-1"}`}
            >
              <article className="relative w-full h-full overflow-hidden bg-zinc-950 border border-zinc-800/60 rounded-3xl p-6 flex flex-col justify-between group shadow-xl shadow-black/20 hover:border-zinc-700/80 transition-colors duration-300">
                <span className="absolute -top-12 -right-12 w-32 h-32 bg-purple-500/5 group-hover:bg-purple-500/10 blur-2xl rounded-full pointer-events-none transition-colors duration-500" />
                <span className="absolute -bottom-12 -left-12 w-32 h-32 bg-cyan-500/5 group-hover:bg-cyan-500/10 blur-2xl rounded-full pointer-events-none transition-colors duration-500" />

                <div
                  className={`w-full flex flex-col gap-3 ${isWideCard ? "md:grid md:grid-cols-3 md:items-start md:gap-4" : ""}`}
                >
                  <header
                    className={`flex flex-col gap-3 ${isWideCard ? "md:col-span-2" : ""}`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="inline-flex bg-zinc-900 border border-zinc-800 text-purple-400 group-hover:text-cyan-400 p-2.5 rounded-xl transition-colors duration-300 w-fit">
                        <LucideIcon size={18} />
                      </span>
                      {!isWideCard && (
                        <time className="text-[10px] font-medium text-zinc-600 font-sans tracking-wide">
                          {formattedDate}
                        </time>
                      )}
                    </div>
                    <h3 className="text-white text-base md:text-lg font-semibold tracking-tight leading-snug group-hover:text-zinc-100 transition-colors">
                      {course.title}
                    </h3>
                  </header>

                  {isWideCard && (
                    <aside className="hidden md:flex flex-col items-end gap-1.5 md:col-span-1 text-right ml-auto">
                      <time className="text-[10px] font-semibold text-zinc-500 bg-zinc-900/50 border border-zinc-800/40 px-2.5 py-1 rounded-md tracking-wide">
                        Added {formattedDate}
                      </time>
                      <span className="font-mono text-[9px] text-zinc-600 truncate max-w-25">
                        {course.id.slice(0, 8)}
                      </span>
                    </aside>
                  )}
                </div>

                {/* COMBINED INTERACTIVE ACTION FOOTER */}
                <footer className="relative z-10 w-full mt-auto flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-4">
                    {/* Progress tracking bar sub-panel */}
                    <div className="flex flex-col flex-1">
                      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider mb-1.5">
                        <span className="text-zinc-500 group-hover:text-zinc-400 transition-colors">
                          Progress
                        </span>
                        <span className="font-mono text-zinc-400 group-hover:text-cyan-400 transition-colors">
                          {course.progress}%
                        </span>
                      </div>
                      <span className="block w-full h-2 bg-zinc-900 border border-zinc-800/50 rounded-full overflow-hidden relative">
                        <motion.span
                          initial={{ width: 0 }}
                          animate={{ width: `${course.progress}%` }}
                          transition={{
                            duration: 1.4,
                            ease: [0.16, 1, 0.3, 1],
                            delay: 0.45,
                          }}
                          className="absolute left-0 top-0 h-full bg-linear-to-r from-purple-500 via-indigo-500 to-cyan-500 rounded-full shadow-lg shadow-purple-500/10"
                        />
                      </span>
                    </div>

                    {/* Quick Utilities Button Panel Container */}
                    <div className="flex items-center gap-1.5 shrink-0 pt-4">
                      {/* Wishlist/Like Action Toggle Trigger */}
                      <motion.button
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.94 }}
                        onClick={(e) => toggleWishlist(course.id, e)}
                        className={`p-2 rounded-xl border transition-all duration-300 ${
                          isWishlisted
                            ? "bg-rose-500/10 border-rose-500/30 text-rose-400 shadow-lg shadow-rose-950/20"
                            : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700"
                        }`}
                        aria-label={
                          isWishlisted
                            ? "Remove from wishlist"
                            : "Add to wishlist"
                        }
                      >
                        <Icons.Heart
                          size={15}
                          fill={isWishlisted ? "currentColor" : "none"}
                        />
                      </motion.button>

                      {/* Add to Cart Action Toggle Trigger */}
                      <motion.button
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.94 }}
                        onClick={(e) => toggleCart(course.id, e)}
                        className={`p-2 rounded-xl border transition-all duration-300 ${
                          isInCart
                            ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400 shadow-lg shadow-cyan-950/20"
                            : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700"
                        }`}
                        aria-label={
                          isInCart ? "Remove from cart" : "Add to cart"
                        }
                      >
                        <Icons.ShoppingBag
                          size={15}
                          fill={isInCart ? "currentColor" : "none"}
                        />
                      </motion.button>
                    </div>
                  </div>
                </footer>
              </article>
            </motion.li>
          );
        })}
      </motion.ul>
    </main>
  );
}
