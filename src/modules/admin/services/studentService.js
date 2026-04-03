import axios from "axios";
import API from "../../../api/axios";

const studentAPI = "/admin/students";

export const getStudents = async (status) => {
  try {
    const response = await API.get(studentAPI, {
      params: status && status !== "ALL" ? { status } : {},
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const updateStudentStatus = async (id, status) => {
  try {
    const response = await API.patch(`${studentAPI}/${id}/status`, null, {
      params: { status },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};