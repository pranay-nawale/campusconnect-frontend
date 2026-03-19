import Tilt from "react-parallax-tilt";

const eventImages = {
  hackathon:
    "https://images.unsplash.com/photo-1518770660439-4636190af475",
  cultural:
    "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2",
  startup:
    "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
  workshop:
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c"
};

function EventCard({ title, college, date, category }) {
  return (

    <Tilt
      glareEnable={true}
      glareMaxOpacity={0.2}
      scale={1.05}
      className="rounded-2xl"
    >

      <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-purple-500 transition">

        <img
        src={eventImages[category]}
        alt="event"
        className="w-full h-40 object-cover"
        />
        <div className="p-5">

          <h3 className="text-xl font-semibold">
            {title}
          </h3>

          <p className="text-gray-400 mt-1">
            {college}
          </p>

          <p className="text-gray-500 text-sm">
            {date}
          </p>

          <button className="mt-4 w-full bg-purple-600 py-2 rounded-lg hover:bg-purple-700 transition">
            Register
          </button>

        </div>

      </div>

    </Tilt>

  );
}

export default EventCard;