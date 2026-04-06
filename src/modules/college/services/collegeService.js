import API from "../../../api/axios";

/* =========================
   PROFILE
========================= */
export const getCollegeProfile = () =>
  API.get("/college/profile");

export const updateCollegeProfile = (data) =>
  API.patch("/college/update", data);

/* =========================
   COLLEGE REGISTRATION
========================= */
export const registerCollege = (data) =>
  API.post("/college/register", data);

/* =========================
   EVENT REQUEST
========================= */

export const createEvent = (data) =>
  API.post("/college/event-request", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getEventRequests = () =>
  API.get("/college/event-requests");

export const deleteEventRequest = (id) =>
  API.delete(`/college/event-requests/${id}`);

export const updateEventRequest = (id, data) =>
  API.put(`/college/event-requests/${id}`, data);

/* =========================
   EVENT ACTIONS
========================= */
export const confirmEvent = (id, payment) =>
  API.post(`/college/events/${id}/confirm`, payment);

export const rejectEvent = (id) =>
  API.post(`/college/events/${id}/reject`);

export const rescheduleEvent = (id, newDate) =>
  API.put(`/college/events/${id}/reschedule`, null, {
    params: { newDate },
  });

/* =========================
   FILE UPLOAD (COMMON)
========================= */
/* ✅ COMMON UPLOAD */
export const uploadDocument = (file, type) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", type);

  return API.post("/college/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getEventCategories = () =>
  API.get("/college/event-categories");

export const getServices = () =>
  API.get("/college/services");

