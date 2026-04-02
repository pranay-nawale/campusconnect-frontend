import { useEffect, useState } from "react";
import {
  getStudents,
  updateStudentStatus,
} from "../services/studentService";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    setLoading(true);
    const data = await getStudents(filterStatus);
    setStudents(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchStudents();
  }, [filterStatus]);

  const handleStatusUpdate = async (id, status) => {
    await updateStudentStatus(id, status);
    fetchStudents();
  };

  return (
    <div className="section bg-soft min-h-screen">

      <div className="section-inner">

        {/* Title */}
        <h2 className="section-title text-center">
          Student Verification
        </h2>

        {/* Filter */}
        <div className="flex justify-end mb-4">
          <select
            className="input w-40"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="ALL">All</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>

        {/* Table Card */}
        <div className="card overflow-x-auto">

          <table className="w-full min-w-[700px] text-sm">

            <thead>
              <tr className="bg-soft text-left">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Department</th>
                <th className="p-3">Year</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center p-5">
                    Loading...
                  </td>
                </tr>
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-5">
                    No students found
                  </td>
                </tr>
              ) : (
                students.map((s, index) => (
                  <tr
                    key={s.id}
                    className="border-b border-[var(--color-border-soft)] hover:bg-soft anim-fade-0"
                  >
                    <td className="p-3 font-semibold">{s.userName}</td>
                    <td className="p-3 text-[var(--color-muted)]">
                      {s.userEmail}
                    </td>
                    <td className="p-3">{s.department}</td>
                    <td className="p-3">{s.year}</td>

                    {/* Status Badge */}
                    <td className="p-3">
                      <span
                        className={`badge ${
                          s.verificationStatus === "APPROVED"
                            ? "bg-green-100 text-green-600"
                            : s.verificationStatus === "REJECTED"
                            ? "bg-red-100 text-red-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {s.verificationStatus}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="p-3">
                      {s.verificationStatus === "PENDING" && (
                        <div className="flex gap-2">

                          <button
                            className="btn-primary text-xs px-3 py-1.5"
                            onClick={() =>
                              handleStatusUpdate(s.id, "APPROVED")
                            }
                          >
                            Approve
                          </button>

                          <button
                            className="btn-outline text-xs px-3 py-1.5"
                            onClick={() =>
                              handleStatusUpdate(s.id, "REJECTED")
                            }
                          >
                            Reject
                          </button>

                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}

            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default Students;