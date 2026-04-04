import API from "../../../api/axios";

// ✅ Get registrations for a specific event (paginated)
export const getRegistrationsByEvent = async (eventId, page = 0, size = 20) => {
  try {
    const response = await API.get("/admin/registrations", {
      params: {
        eventId,
        page,
        size,
      },
    });
    return response.data; // { content, totalElements, totalPages } if pageable
  } catch (err) {
    console.error("Error fetching registrations:", err);
    return [];
  }
};

// ✅ Get count of registrations for a specific event
export const getRegistrationsCount = async (eventId) => {
  try {
    const response = await API.get("/admin/registrations/count", {
      params: { eventId },
    });
    return response.data; // number
  } catch (err) {
    console.error("Error fetching registrations count:", err);
    return 0;
  }
};

// ✅ Get single registration by ID
export const getRegistrationById = async (registrationId) => {
  try {
    const response = await API.get(`/admin/registrations/${registrationId}`);
    return response.data;
  } catch (err) {
    console.error("Error fetching registration:", err);
    return null;
  }
};