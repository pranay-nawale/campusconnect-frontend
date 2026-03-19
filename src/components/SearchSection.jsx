import { useState } from "react";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";

function SearchSection() {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState(null);

  const categories = ["Hackathon", "Workshop", "Cultural", "Sports", "Tech Talk"];

  return (
    <section className="px-6 mt-16 flex flex-col items-center">
      
      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-3xl relative"
      >
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
        <input
          type="text"
          placeholder="Search events, colleges, or categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          className="w-full pl-12 p-4 rounded-xl bg-gray-900 text-white 
                     border border-gray-700 focus:outline-none 
                     focus:border-purple-500 focus:ring-2 focus:ring-purple-500 
                     transition shadow-md"
        />
      </motion.div>

      {/* Category Filters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="flex gap-4 mt-8 flex-wrap justify-center"
      >
        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => setActive(cat)}
            className={`px-5 py-2 rounded-lg transition-transform transform hover:scale-105 
              ${active === cat 
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md" 
                : "bg-gray-800 text-gray-300 hover:bg-purple-600 hover:text-white"}`}
          >
            {cat}
          </button>
        ))}
      </motion.div>
    </section>
  );
}

export default SearchSection;