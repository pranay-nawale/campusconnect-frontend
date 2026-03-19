import { motion } from "framer-motion";

function Hero() {
  return (
    <section className="relative text-center pt-40 pb-32 px-6 overflow-hidden 
                        bg-gradient-to-tr from-rose-200 via-amber-100 to-indigo-200">
      
      {/* Abstract Glow Shapes */}
      <div className="absolute top-10 left-0 w-72 h-72 bg-pink-300 rounded-full blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute top-1/3 left-1/2 w-80 h-80 bg-amber-200 rounded-full blur-3xl opacity-25 animate-ping"></div>

      {/* Decorative Overlay (soft waves) */}
      <div className="absolute inset-0 bg-[url('/patterns/waves.svg')] bg-cover opacity-10"></div>

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="inline-block px-6 py-2 rounded-full 
                   bg-gradient-to-r from-amber-300 via-pink-300 to-indigo-300 
                   text-gray-800 text-sm mb-6 shadow-md"
      >
        ✨ Celebrate Campus Life
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-6xl md:text-7xl font-extrabold 
                   bg-gradient-to-r from-indigo-600 via-pink-500 to-amber-500 
                   bg-clip-text text-transparent drop-shadow-lg"
      >
        Discover Joyful Events
        <br />
        Technical • Sports • Cultural
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-gray-700 mt-6 text-lg max-w-xl mx-auto leading-relaxed"
      >
        Hackathons ⚡ • Sports Meets 🏆 • Cultural Nights 🎭 • Workshops 📚  
        <br /> CampusConnect makes every celebration vibrant and memorable.
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="mt-10 flex justify-center gap-6"
      >
        <button className="px-8 py-3 rounded-xl 
                           bg-gradient-to-r from-pink-400 via-amber-300 to-indigo-400 
                           hover:scale-110 transition-transform shadow-lg font-semibold text-gray-800">
          🌸 Explore Events
        </button>

        <button className="px-8 py-3 rounded-xl border-2 border-indigo-300 
                           hover:bg-indigo-200 hover:text-gray-800 
                           transition-transform hover:scale-110 font-semibold  text-gray-800">
          🎉 Host Event
        </button>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16"
      >
        {[
          { value: "120+", label: "Events" },
          { value: "50+", label: "Colleges" },
          { value: "10k+", label: "Students" },
        ].map((stat, i) => (
          <div
            key={i}
            className="px-6 py-4 rounded-xl 
                       bg-gradient-to-r from-rose-100 via-amber-50 to-indigo-100 
                       shadow-md hover:scale-105 transition-transform"
          >
            <p className="text-3xl text-gray-800 font-bold">{stat.value}</p>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

export default Hero;