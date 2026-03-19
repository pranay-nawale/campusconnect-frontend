import { useEffect, useState } from "react";

function Counter({ end }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const stepTime = Math.abs(Math.floor(duration / end));

    const timer = setInterval(() => {
      start += Math.ceil(end / 100);

      if (start >= end) {
        start = end;
        clearInterval(timer);
      }

      setCount(start);
    }, stepTime);

    return () => clearInterval(timer);
  }, [end]);

  return <span>{count}</span>;
}

function Stats() {
  return (
    <section className="relative mt-24 px-10 text-center">
      {/* Background gradient + glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-900 via-black to-blue-900"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-600 rounded-full blur-3xl opacity-20"></div>

      <h2 className="text-3xl font-bold mb-10 text-white drop-shadow-lg">
        CampusConnect Impact
      </h2>

      <div className="grid md:grid-cols-3 gap-10">
        {/* Card 1 */}
        <div className="group bg-gray-900/80 backdrop-blur-md p-8 rounded-xl shadow-lg 
                        transition-transform duration-300 hover:scale-105 hover:shadow-purple-500/30">
          <h3 className="text-4xl font-bold text-purple-400 transition-colors duration-300 group-hover:text-pink-400">
            <Counter end={120}/>+
          </h3>
          <p className="text-gray-300 mt-2">Events Hosted</p>
        </div>

        {/* Card 2 */}
        <div className="group bg-gray-900/80 backdrop-blur-md p-8 rounded-xl shadow-lg 
                        transition-transform duration-300 hover:scale-105 hover:shadow-purple-500/30">
          <h3 className="text-4xl font-bold text-purple-400 transition-colors duration-300 group-hover:text-pink-400">
            <Counter end={50}/>+
          </h3>
          <p className="text-gray-300 mt-2">Colleges</p>
        </div>

        {/* Card 3 */}
        <div className="group bg-gray-900/80 backdrop-blur-md p-8 rounded-xl shadow-lg 
                        transition-transform duration-300 hover:scale-105 hover:shadow-purple-500/30">
          <h3 className="text-4xl font-bold text-purple-400 transition-colors duration-300 group-hover:text-pink-400">
            <Counter end={10000}/>+
          </h3>
          <p className="text-gray-300 mt-2">Students Joined</p>
        </div>
      </div>
    </section>
  );
}

export default Stats;