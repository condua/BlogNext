"use client";

import { motion } from "framer-motion";
import "./button.css";
export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#e0f7fa] via-[#f1f8ff] to-[#fff3e0] flex items-center justify-center px-6">
      <section className="text-center max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-extrabold text-gray-800 drop-shadow-md mb-6"
        >
          Welcome to <span className="text-teal-600">MLPA Blog</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-lg md:text-xl text-gray-700 mb-8"
        >
          Sharing stories, tutorials, and thoughts on web development, tech, and
          life.
        </motion.p>

        <motion.a
          href="/blog"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="relative overflow-hidden inline-block bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition duration-300 group"
        >
          <span className="relative z-10">🚀 Read the Blog</span>

          {/* Lớp ánh sáng */}
          <span className="shine-effect absolute top-0 left-[-75%] w-[50%] h-full bg-white opacity-30 transform -skew-x-20 group-hover:animate-shine-loop pointer-events-none"></span>
        </motion.a>
      </section>
    </main>
  );
}
