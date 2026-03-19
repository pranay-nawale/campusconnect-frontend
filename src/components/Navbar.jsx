function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-4 
                    bg-gradient-to-r from-rose-100 via-amber-50 to-indigo-100 
                    backdrop-blur-md text-gray-800 shadow-md ">
      
      {/* Logo */}
      <h1 className="text-3xl font-extrabold 
                     bg-gradient-to-r from-indigo-600 via-pink-500 to-amber-500 
                     bg-clip-text text-transparent drop-shadow-sm">
        CampusConnect
      </h1>

      {/* Links */}
      <div className="hidden md:flex gap-10 text-gray-700 font-medium">
        <a href="#" className="relative group">
          Events
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-pink-400 transition-all group-hover:w-full"></span>
        </a>
        <a href="#" className="relative group">
          Colleges
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-pink-400 transition-all group-hover:w-full"></span>
        </a>
        <a href="#" className="relative group">
          About
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-pink-400 transition-all group-hover:w-full"></span>
        </a>
      </div>

      {/* Button */}
      <button className="px-6 py-2 rounded-lg 
                         bg-gradient-to-r from-pink-400 via-amber-300 to-indigo-400 
                         hover:scale-105 transition-transform shadow-md font-semibold text-gray-800">
        Login
      </button>
    </nav>
  );
}

export default Navbar;