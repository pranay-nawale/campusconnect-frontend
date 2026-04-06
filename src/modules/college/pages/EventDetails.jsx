import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventRequests, rescheduleEvent } from "../services/collegeService";

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newDate, setNewDate] = useState("");

  useEffect(() => {
    loadEvent();
  }, []);

  const loadEvent = async () => {
    const res = await getEventRequests();
    const found = res.data.find(e => e.id === Number(id));
    setEvent(found);
  };

  const handleReschedule = async () => {
    await rescheduleEvent(event.id, newDate);
    setShowModal(false);
    loadEvent();
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-100 text-green-700";
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "PLANNED":
        return "bg-blue-100 text-blue-700";
      case "REJECTED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  if (!event) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">

      {/* CARD */}
      <div className="bg-white rounded-2xl shadow p-6 max-w-2xl mx-auto">

        <h2 className="text-2xl font-bold mb-2">{event.title}</h2>

        <p className="text-gray-500 mb-4">{event.description}</p>

        <div className="flex justify-between mb-4">
          <span className="text-sm text-gray-400">
            {new Date(event.eventDate).toLocaleString()}
          </span>

          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(event.status)}`}>
            {event.status}
          </span>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-3 mt-4">

          {event.status === "CONFIRMED" && (
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
            >
              Reschedule Event
            </button>
          )}

        </div>
      </div>

      {/* 🔥 MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white p-6 rounded-xl w-96 shadow-lg">

            <h3 className="text-lg font-semibold mb-4">
              Reschedule Event
            </h3>

            <input
              type="datetime-local"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="w-full border p-2 rounded mb-4"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleReschedule}
                className="px-3 py-1 bg-purple-500 text-white rounded"
              >
                Confirm
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}