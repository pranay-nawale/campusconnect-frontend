import { useEffect, useState } from "react";
import { getCollegeProfile, getEventRequests } from "../services/collegeService";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const profileRes = await getCollegeProfile();
      setProfile(profileRes.data);

      try {
        const eventRes = await getEventRequests();
        setEvents(eventRes.data);
      } catch (err) {
        console.log("Event error:", err.response?.data);
        setEvents([]);
      }

    } catch (err) {
      console.log("Profile error:", err.response?.data);
      navigate("/college/register");
    }
  };

  if (!profile) return <div className="section">Loading...</div>;

  // ✅ Stats
  const stats = {
    total: events.length,
    pending: events.filter(e => e.status === "PENDING").length,
    planned: events.filter(e => e.status === "PLANNED").length,
    confirmed: events.filter(e => e.status === "CONFIRMED").length,
    rejected: events.filter(e => e.status === "REJECTED").length,
  };

  // ✅ Status color helper
  const getStatusColor = (status) => {
    switch (status) {
      case "CONFIRMED":
        return "text-green-600";
      case "PENDING":
        return "text-yellow-600";
      case "PLANNED":
        return "text-blue-600";
      case "REJECTED":
        return "text-red-600";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="section bg-soft">
      <div className="section-inner">

        {/* HEADER */}
        <div className="mb-6">
          <h2 className="section-title text-grad-primary">
            Welcome {profile?.name}
          </h2>

          <span
            className={`badge mt-2 ${
              profile.verificationStatus === "APPROVED"
                ? "bg-green-100 text-green-600"
                : "bg-yellow-100 text-yellow-600"
            }`}
          >
            {profile.verificationStatus}
          </span>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-4 gap-4 mb-6">

          <div className="card p-4 text-center">
            <p className="text-lg font-bold">{stats.total}</p>
            <p className="text-sm text-gray-500">Total</p>
          </div>

          <div className="card p-4 text-center">
            <p className="text-lg font-bold">{stats.pending}</p>
            <p className="text-sm text-gray-500">Pending</p>
          </div>

          <div className="card p-4 text-center">
            <p className="text-lg font-bold">{stats.planned}</p>
            <p className="text-sm text-gray-500">Planned</p>
          </div>

          <div className="card p-4 text-center">
            <p className="text-lg font-bold">{stats.confirmed}</p>
            <p className="text-sm text-gray-500">Confirmed</p>
          </div>

        </div>

        {/* ACTION */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Your Events</h3>

          <button
            onClick={() => navigate("/college/create-event")}
            className="btn-primary"
          >
            + Create Event
          </button>
        </div>

        {/* EVENTS LIST */}
        {events.length === 0 ? (
          <div className="card p-6 text-center">
            <p className="text-gray-500">No events yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">

            {events.map((event) => (
              <div key={event.id} className="card p-4">

                <h4 className="font-semibold">{event.title}</h4>

                <p className="text-sm text-gray-500">
                  {event.description}
                </p>

                <div className="flex justify-between mt-3">

                  <span className="text-xs text-gray-400">
                    {event.category}
                  </span>

                  <span
                    className={`text-xs font-semibold ${getStatusColor(event.status)}`}
                  >
                    {event.status}
                  </span>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}