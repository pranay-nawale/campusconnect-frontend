import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getEventCategories,
  getServices,
  createEvent,
} from "../services/collegeService";

export default function CreateEvent() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    eventDate: "",
    maxParticipants: "",
    category: "",
    isPaid: false,
    price: "",
    serviceIds: [],
    banner: null,
  });

useEffect(() => {
  console.log("PAGE LOADED 🚀"); // ✅ DEBUG
  loadMeta();
}, []);

  const loadMeta = async () => {
  console.log("FETCHING DATA 🔥");

  try {
    const catRes = await getEventCategories();
    console.log("CATEGORIES:", catRes.data);

    const servRes = await getServices();
    console.log("SERVICES:", servRes.data);

    setCategories(catRes.data);
    setServices(servRes.data);
  } catch (err) {
    console.log("ERROR:", err);
  }
};

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleServiceToggle = (id) => {
    setForm((prev) => ({
      ...prev,
      serviceIds: prev.serviceIds.includes(id)
        ? prev.serviceIds.filter((s) => s !== id)
        : [...prev.serviceIds, id],
    }));
  };

  const handleFile = (e) => {
    setForm({ ...form, banner: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("description", form.description);

    // ✅ FIXED DATE
    formData.append("eventDate", form.eventDate + ":00");

    formData.append("maxParticipants", form.maxParticipants);
    formData.append("category", form.category);

    // ✅ FIXED BOOLEAN
    formData.append("isPaid", form.isPaid ? "true" : "false");

    // ✅ FIXED PRICE
    formData.append("price", String(form.isPaid ? form.price : 0));

    // ✅ SERVICES
    form.serviceIds.forEach((id) => {
      formData.append("serviceIds", id);
    });

    // ✅ FILE
    if (form.banner) {
      formData.append("banner", form.banner);
    }

    // 🔥 DEBUG
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    await createEvent(formData);

    alert("Event Created 🎉");
  } catch (err) {
    console.log("ERROR:", err.response?.data);
  }
};

  return (
    <div className="p-6 bg-soft min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Create Event</h1>

      <form className="card p-6 max-w-2xl space-y-4" onSubmit={handleSubmit}>

        <input
          type="text"
          name="title"
          placeholder="Event Title"
          className="input"
          value={form.title}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          className="input"
          value={form.description}
          onChange={handleChange}
        />

        <input
          type="datetime-local"
          name="eventDate"
          className="input"
          value={form.eventDate}
          onChange={handleChange}
        />

        <input
          type="number"
          name="maxParticipants"
          placeholder="Max Participants"
          className="input"
          value={form.maxParticipants}
          onChange={handleChange}
        />

        <select
          name="category"
          className="input"
          value={form.category}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* SERVICES */}
        <div>
          <label className="font-medium">Select Services</label>

          <div className="flex flex-wrap gap-2 mt-2">
            {services.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => handleServiceToggle(s.id)}
                className={`px-3 py-1 rounded-full border text-sm ${
                  form.serviceIds.includes(s.id)
                    ? "bg-purple-500 text-white"
                    : "bg-white"
                }`}
              >
                {s.service}
              </button>
            ))}
          </div>
        </div>

        {/* PAID */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isPaid"
            checked={form.isPaid}
            onChange={handleChange}
          />
          <label>Paid Event</label>
        </div>

        {form.isPaid && (
          <input
            type="number"
            name="price"
            placeholder="Price"
            className="input"
            value={form.price}
            onChange={handleChange}
          />
        )}
        
        <div className="mt-4">
  <label className="font-medium">Event Banner</label>

  <div
    className="mt-2 border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:bg-gray-50 transition"
    onClick={() => document.getElementById("bannerInput").click()}
  >
    {form.banner ? (
      <div>
        <img
          src={URL.createObjectURL(form.banner)}
          alt="preview"
          className="mx-auto h-40 object-cover rounded-lg mb-3"
        />
        <p className="text-sm text-purple-600 font-medium">
          Change Banner
        </p>
      </div>
    ) : (
      <div>
        <p className="text-lg font-semibold text-gray-700">
          📤 Upload Event Banner
        </p>
        <p className="text-sm text-gray-400">
          Click to upload image
        </p>
      </div>
    )}
  </div>

  {/* hidden input */}
  <input
    id="bannerInput"
    type="file"
    accept="image/*"
    className="hidden"
    onChange={handleFile}
  />
</div>

        <button className="btn-primary w-full">
          Create Event
        </button>
      </form>
    </div>
  );
}