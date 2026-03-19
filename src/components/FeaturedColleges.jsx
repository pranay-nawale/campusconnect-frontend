function FeaturedColleges() {
   const colleges = [
    { name: "IIT Bombay", events: 20, logo: "/logos/iit-bombay.png" },
    { name: "VJTI", events: 15, logo: "/logos/vjti.jpg" },
    { name: "COEP", events: 18, logo: "/logos/coep.jpg" },
    { name: "SPIT", events: 12, logo: "/logos/spit.png" }
  ];


  return (
    <section className="mt-24 px-10">
      <h2 className="text-3xl font-bold text-center mb-10 text-white drop-shadow-lg">
        Featured Colleges
      </h2>

      <div className="grid md:grid-cols-4 gap-8">
        {colleges.map((college, index) => (
          <div 
            key={index} 
            className="group bg-gray-900/80 backdrop-blur-md p-6 rounded-xl text-center 
                       hover:scale-105 transition-transform duration-300 shadow-lg"
          >
            {/* Logo inside circular frame */}
<div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden 
                border-2 border-purple-500 shadow-md flex items-center justify-center bg-white">
  <img 
    src={college.logo} 
    alt={`${college.name} logo`} 
    className="w-full h-full object-contain p-3 transition-transform duration-500 group-hover:scale-110"
  />
</div>

            <h3 className="text-lg font-semibold text-white">{college.name}</h3>
            <p className="text-gray-400 text-sm mt-2">{college.events} Events</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedColleges;