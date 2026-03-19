function FeaturedEvents() {
  const events = [
    {
      title: "Global AI Hackathon",
      college: "IIT Bombay",
      date: "April 12",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475"
    },
    {
      title: "Startup Pitch Fest",
      college: "VJTI",
      date: "May 2",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7"
    },
    {
      title: "Cultural Night",
      college: "SPIT",
      date: "June 10",
      image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91"
    },
    {
      title: "Tech Workshop",
      college: "COEP",
      date: "June 20",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c"
    }
  ];

  return (
    <section className="relative px-10 mt-24">
      {/* Background gradient + glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-900 via-black to-blue-900"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-600 rounded-full blur-3xl opacity-20"></div>

      <h2 className="text-3xl font-bold mb-10 text-white drop-shadow-lg">
         Featured Events
      </h2>

      <div className="grid md:grid-cols-2 gap-8 h-[420px]">
        {/* LEFT SIDE SMALL EVENTS */}
        <div className="grid grid-rows-3 gap-6">
          {events.slice(1).map((event, index) => (
            <div
              key={index}
              className="group flex bg-gray-900/80 backdrop-blur-md rounded-xl overflow-hidden 
                         transition-transform duration-300 hover:scale-[1.03] shadow-lg"
            >
              <div className="relative w-40 h-full">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-40 h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 
                                flex items-center justify-center transition-opacity duration-500">
                  <span className="text-white text-sm font-semibold">View Details</span>
                </div>
              </div>
              <div className="p-4 flex flex-col justify-center">
                <h4 className="text-lg font-semibold text-white">{event.title}</h4>
                <p className="text-gray-300 text-sm">{event.college}</p>
                <p className="text-gray-400 text-xs">{event.date}</p>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE BIG EVENT */}
        <div className="group bg-gray-900/80 backdrop-blur-md rounded-2xl overflow-hidden flex flex-col 
                        transition-transform duration-300 hover:scale-[1.02] shadow-xl">
          <div className="relative">
            <img
              src={events[0].image}
              alt={events[0].title}
              className="h-[240px] w-full object-cover transform transition-transform duration-500 group-hover:scale-105"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 
                            flex items-center justify-center transition-opacity duration-500">
              <span className="text-white font-semibold">Register Now</span>
            </div>
          </div>
          <div className="p-6 flex flex-col justify-between flex-1">
            <div>
              <h3 className="text-2xl font-bold text-white">{events[0].title}</h3>
              <p className="text-gray-300 mt-2">{events[0].college}</p>
              <p className="text-gray-400 text-sm">{events[0].date}</p>
            </div>
            <button className="mt-6 bg-gradient-to-r from-purple-600 to-pink-600 
                               px-6 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 
                               transition-transform duration-300 transform hover:scale-105 shadow-md w-fit">
              Register
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedEvents;

// function FeaturedEvents() {
//   const events = [
//     {
//       title: "Global AI Hackathon",
//       college: "IIT Bombay",
//       date: "April 12",
//       image: "https://images.unsplash.com/photo-1518770660439-4636190af475"
//     },
//     {
//       title: "Startup Pitch Fest",
//       college: "VJTI",
//       date: "May 2",
//       image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7"
//     },
//     {
//       title: "Cultural Night",
//       college: "SPIT",
//       date: "June 10",
//       image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91"
//     },
//     {
//       title: "Tech Workshop",
//       college: "COEP",
//       date: "June 20",
//       image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c"
//     }
//   ];

//   return (
//     <section className="px-10 mt-24">

//       <h2 className="text-3xl font-bold mb-10">
//         ⭐ Featured Events
//       </h2>

//       <div className="grid md:grid-cols-2 gap-8 h-[420px]">

//         {/* LEFT SIDE SMALL EVENTS */}

//         <div className="grid grid-rows-3 gap-6">

//           {events.slice(1).map((event, index) => (
//             <div
//               key={index}
//               className="flex bg-gray-900 rounded-xl overflow-hidden hover:scale-[1.02] transition"
//             >

//               <img
//                 src={event.image}
//                 alt={event.title}
//                 className="w-40 h-full object-cover"
//               />

//               <div className="p-4 flex flex-col justify-center">

//                 <h4 className="text-lg font-semibold">
//                   {event.title}
//                 </h4>

//                 <p className="text-gray-400 text-sm">
//                   {event.college}
//                 </p>

//                 <p className="text-gray-500 text-xs">
//                   {event.date}
//                 </p>

//               </div>

//             </div>
//           ))}

//         </div>

//         {/* RIGHT SIDE BIG EVENT */}

//         <div className="bg-gray-900 rounded-2xl overflow-hidden flex flex-col hover:scale-[1.02] transition">

//           <img
//             src={events[0].image}
//             alt={events[0].title}
//             className="h-[240px] w-full object-cover"
//           />

//           <div className="p-6 flex flex-col justify-between flex-1">

//             <div>

//               <h3 className="text-2xl font-bold">
//                 {events[0].title}
//               </h3>

//               <p className="text-gray-400 mt-2">
//                 {events[0].college}
//               </p>

//               <p className="text-gray-500 text-sm">
//                 {events[0].date}
//               </p>

//             </div>

//             <button className="mt-6 bg-purple-600 px-6 py-2 rounded-lg hover:bg-purple-700 transition w-fit">
//               Register
//             </button>

//           </div>

//         </div>

//       </div>

//     </section>
//   );
// }

// export default FeaturedEvents;