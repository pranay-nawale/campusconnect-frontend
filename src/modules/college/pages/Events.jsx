import { useEffect, useState } from "react";
import {
  getEventRequests,
  deleteEventRequest,
  confirmEvent,
  rejectEvent,
  rescheduleEvent,
} from "../services/collegeService";
import { useNavigate } from "react-router-dom";

export default function Events() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const res = await getEventRequests();
      setEvents(res.data);
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  const handleDelete = async (id) => {
    await deleteEventRequest(id);
    loadEvents();
  };

  const handleReschedule = async (id) => {
    const newDate = prompt("Enter new date (YYYY-MM-DDTHH:mm:ss)");
    if (!newDate) return;

    await rescheduleEvent(id, newDate);
    loadEvents();
  };

  // 🎨 status badge styles
  const getStatusStyle = (status) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-100 text-green-700 border-green-200";
      case "PENDING":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "PLANNED":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "REJECTED":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  return (
    <div className="p-6 bg-soft min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Events</h1>
          <p className="text-sm text-gray-500">
            Manage and track all your college events
          </p>
        </div>

        <button
          className="btn-primary shadow-md hover:scale-105 transition"
          onClick={() => navigate("/college/create-event")}
        >
          + Create Event
        </button>
      </div>

      {/* CARD */}
      <div className="bg-white rounded-2xl shadow-sm border p-5">

        {events.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg">🚀 No events yet</p>
            <p className="text-sm">Start by creating your first event</p>
          </div>
        ) : (
          <div className="overflow-hidden">

            <table className="w-full text-sm">

              {/* HEADER */}
              <thead>
                <tr className="text-gray-500 border-b">
                  <th className="py-3 text-left">Event</th>
                  <th className="text-left">Date</th>
                  <th>Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody>
                {events.map((e) => (
                  <tr
                    key={e.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    {/* TITLE */}
                    <td className="py-4">
                      <div className="font-semibold">{e.title}</div>
                      <div className="text-xs text-gray-400">
                        {e.category}
                      </div>
                    </td>

                    {/* DATE */}
                    <td>
                      {new Date(e.eventDate).toLocaleDateString()}
                    </td>

                    {/* STATUS */}
                    <td>
                      <span
                        className={`px-3 py-1 text-xs rounded-full border font-medium ${getStatusStyle(
                          e.status
                        )}`}
                      >
                        {e.status}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td className="text-right space-x-2">

                      <button
                        onClick={() =>
                          navigate(`/college/events/${e.id}`)
                        }
                        className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
                      >
                        View
                      </button>

                      {/* PENDING */}
                      {e.status === "PENDING" && (
                        <button
                          onClick={() => handleDelete(e.id)}
                          className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200"
                        >
                          Delete
                        </button>
                      )}

                      {/* CONFIRMED */}
                      {e.status === "CONFIRMED" && (
                        <button
                          onClick={() => handleReschedule(e.id)}
                          className="px-3 py-1 text-sm bg-purple-100 text-purple-600 rounded hover:bg-purple-200"
                        >
                          Reschedule
                        </button>
                      )}

                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </div>
    </div>
  );
}