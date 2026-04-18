import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import API from "../../../api/axios";
import {
  getEventRequests,
  rescheduleEvent,
  rejectEvent,
} from "../services/collegeService";

export default function EventDetails() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [newDate, setNewDate] = useState("");

  // 🔄 Load Event
  const loadEvent = async () => {
    try {
      const res = await getEventRequests();
      const found = res.data.find((e) => e.id === Number(id));
      setEvent(found);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvent();

    const interval = setInterval(loadEvent, 10000);
    return () => clearInterval(interval);
  }, []);

  // 🔥 RAZORPAY PAYMENT
  const handleConfirm = async () => {
  try {
    const res = await API.post(`/payments/create-order/${event.id}`);
    const order = res.data;

    const options = {
  key: order.key,
  amount: order.amount,
  currency: "INR",
  name: "CampusConnect",
  description: "Event Payment",
  order_id: order.orderId,

  handler: async function (response) {
    await API.post("/payments/verify", response);
    alert("Payment Successful 🎉");
    loadEvent();
  },

  

  prefill: {
    name: "Test User",
    email: "test@gmail.com",
    contact: "9653445209",
  },

  notes: {
    eventId: event.id,
  },

  theme: {
    color: "#6366f1",
  },

  modal: {
    ondismiss: function () {
      console.log("Payment popup closed");
    },
  },
};
console.log("Opening Razorpay...");
    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (err) {
    console.error(err);
    alert("Payment failed");
  }
};

  // 🔄 Reschedule
  const handleReschedule = async () => {
    if (!newDate) return alert("Select date");

    try {
      await rescheduleEvent(event.id, newDate);
      setShowModal(false);
      setNewDate("");
      loadEvent();
    } catch (err) {
      console.error(err);
    }
  };

  // ❌ Reject
  const handleReject = async () => {
    if (!window.confirm("Reject this event?")) return;

    try {
      await rejectEvent(event.id);
      loadEvent();
    } catch (err) {
      console.error(err);
    }
  };

  // 🎨 Status style
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
      case "RESCHEDULED":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!event) return <div className="p-6">Event not found</div>;

  return (
    <div className="p-6">
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

        {/* 📄 PLAN */}
        {["PLANNED", "CONFIRMED", "RESCHEDULED"].includes(event.status) &&
          event.eventPlanUrl && (
            <button
              onClick={() => window.open(event.eventPlanUrl)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              View Plan
            </button>
          )}

        {/* ACTIONS */}
        <div className="flex gap-3 mt-6 flex-wrap">

          {event.status === "PLANNED" && (
            <button
              onClick={handleConfirm}
              className="px-4 py-2 bg-green-500 text-white rounded-lg"
            >
              Accept & Confirm
            </button>
          )}

          {event.status === "PLANNED" && (
            <button
              onClick={handleReject}
              className="px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              Reject
            </button>
          )}

          {event.status === "PLANNED" && (
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg"
            >
              Reschedule
            </button>
          )}
        </div>
      </div>

      {/* 🔄 RESCHEDULE MODAL ONLY */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-96">

            <h3 className="mb-4 font-semibold">Reschedule Event</h3>

            <input
              type="datetime-local"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="w-full border p-2 mb-4"
            />

            <div className="flex justify-end gap-2">
              <button onClick={() => setShowModal(false)}>Cancel</button>

              <button
                onClick={handleReschedule}
                className="bg-purple-500 text-white px-3 py-1 rounded"
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