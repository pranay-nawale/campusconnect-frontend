import API from "../../../api/axios";

const BASE = "/admin/events";

// Get all events
export const getEvents = async (status) => {
  const res = await API.get(BASE, {
    params: status && status !== "ALL" ? { status } : {},
  });
  return res.data;
};

// Update event status
export const updateEventStatus = async (id, status) => {
  const res = await API.patch(`${BASE}/${id}`, null, {
    params: { status },
  });
  return res.data;
};

// Get vendors for a service
export const getServiceVendors = async (serviceId) => {
  const res = await API.get(`${BASE}/service/${serviceId}/vendors`);
  return res.data;
};

// Assign vendor
export const assignVendor = async (eventId, serviceId, vendorId) => {
  const res = await API.patch(
    `${BASE}/service-vendor/${eventId}/${serviceId}`,
    null,
    {
      params: { vendorId },
    }
  );
  return res.data;
};