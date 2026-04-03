import { useEffect, useState } from "react";
import {
  getEvents,
  updateEventStatus,
} from "../services/eventService";
import StatusBadge from "../components/StatusBadge";
import AssignVendorModal from "../components/AssignVendorModal";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);

  const [selectedService, setSelectedService] = useState(null);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const data = await getEvents(filter);
      setEvents(data);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, [filter]);

  return (
    <div className="p-6 space-y-6">

      {/* Title */}
      <h1 className="text-2xl font-bold">
        Event Management
      </h1>

      {/* Filter */}
      <div className="flex gap-3">
        {["ALL", "PENDING", "PLANNED", "REJECTED"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-lg border ${
              filter === s
                ? "bg-indigo-500 text-white"
                : "bg-white"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-xl">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-sm">
            <tr>
              <th className="p-3">Event Name</th>
              <th className="p-3">Organizer</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center p-5">
                  Loading...
                </td>
              </tr>
            ) : events.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-5">
                  No events found
                </td>
              </tr>
            ) : (
              events.map((e) => (
                <tr key={e.id} className="border-t">

                  <td className="p-3 font-medium">
                    {e.title}
                  </td>

                  <td className="p-3">
                    {e.collegeName}
                  </td>

                  <td className="p-3">
                    {e.eventDate}
                  </td>

                  <td className="p-3">
                    <StatusBadge status={e.status} />
                  </td>

                  <td className="p-3 text-center space-x-2">

                    <button
                      onClick={() =>
                        updateEventStatus(e.id, "PLANNED")
                      }
                      className="px-3 py-1 bg-green-500 text-white rounded text-sm"
                    >
                      Planned
                    </button>

                    <button
                      onClick={() =>
                        updateEventStatus(e.id, "REJECTED")
                      }
                      className="px-3 py-1 bg-red-500 text-white rounded text-sm"
                    >
                      Reject
                    </button>

                    {/* Assign vendor for first service (simplified) */}
                    {e.services?.length > 0 && (
                      <button
                        onClick={() =>
                          setSelectedService({
                            eventId: e.id,
                            serviceId: e.services[0].id,
                          })
                        }
                        className="px-3 py-1 bg-indigo-500 text-white rounded text-sm"
                      >
                        Assign Vendor
                      </button>
                    )}

                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <AssignVendorModal
        open={!!selectedService}
        eventId={selectedService?.eventId}
        serviceId={selectedService?.serviceId}
        onClose={() => setSelectedService(null)}
      />

    </div>
  );
};

export default Events;