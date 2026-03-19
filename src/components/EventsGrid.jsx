import EventCard from "./EventCard";

function EventsGrid() {

  const events = [
  {
    title: "AI Hackathon",
    college: "IIT Bombay",
    date: "April 12",
    category: "hackathon"
  },
  {
    title: "Cultural Fest",
    college: "VJTI",
    date: "May 3",
    category: "cultural"
  },
  {
    title: "Startup Summit",
    college: "SPIT",
    date: "June 8",
    category: "startup"
  },
  {
    title: "Tech Workshop",
    college: "COEP",
    date: "June 20",
    category: "workshop"
  }
];

  return (
    <section className="px-12 mt-24">

  <h2 className="text-4xl font-bold mb-12 text-center">
    Trending Events
  </h2>

  <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">

    {events.map((event, index) => (
        <EventCard
        key={index}
        title={event.title}
        college={event.college}
        date={event.date}
        category={event.category}
        />
    ))}

  </div>

</section>
  );
}

export default EventsGrid;