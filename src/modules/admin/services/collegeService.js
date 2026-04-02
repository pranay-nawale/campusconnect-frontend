import API from "../../../api/axios";

const BASE = "/admin/colleges";

// Get all colleges (with optional status filter)
export const getColleges = async (status) => {
  const res = await API.get(BASE, {
    params: status && status !== "ALL" ? { status } : {},
  });
  return res.data;
};

// Get single college
export const getCollegeById = async (id) => {
  const res = await API.get(`${BASE}/${id}`);
  return res.data;
};

// Update verification status
export const updateCollegeStatus = async (id, status) => {
  const res = await API.patch(`${BASE}/${id}/status`, null, {
    params: { status },
  });
  return res.data;
};