import { useEffect, useState } from "react";
import {
  getColleges,
  updateCollegeStatus,
} from "../services/collegeService";
import StatusBadge from "../components/StatusBadge";
import { useNavigate } from "react-router-dom";

const Colleges = () => {
  const [colleges, setColleges] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchColleges = async () => {
    setLoading(true);
    try {
      const data = await getColleges(filter);
      setColleges(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchColleges();
  }, [filter]);

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateCollegeStatus(id, status);
      fetchColleges();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className=" space-y-6">

      {/* Title */}
      <h1 className="text-2xl font-bold">
        College Verification
      </h1>

      {/* Filter */}
      <div className="flex gap-3">
        {["ALL", "PENDING", "APPROVED", "REJECTED"].map((s) => (
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
              <th className="p-3">College</th>
              <th className="p-3">University</th>
              <th className="p-3">City</th>
              {/* <th className="p-3">User Email</th> */}
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center p-5">
                  Loading...
                </td>
              </tr>
            ) : colleges.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-5">
                  No colleges found
                </td>
              </tr>
            ) : (
              colleges.map((c) => (
                <tr key={c.id} className="border-t">
                  <td className="p-3 font-medium">
                    {c.name}
                  </td>
                  <td className="p-3">
                    {c.universityName}
                  </td>
                  <td className="p-3">{c.city}</td>
                  {/* <td className="p-3">
                    {c.userEmail}
                  </td> */}

                  <td className="p-3">
                    <StatusBadge status={c.verificationStatus} />
                  </td>

                  <td className="p-3 text-center space-x-2">
                      <button
                        onClick={() => navigate(`/admin/colleges/${c.id}`)}
                        className="px-3 py-1 text-sm bg-blue-500 text-white rounded"
                      >
                        View
                      </button>
                    <button
                      onClick={() =>
                        handleStatusUpdate(c.id, "APPROVED")
                      }
                      className="px-3 py-1 text-sm bg-green-500 text-white rounded"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        handleStatusUpdate(c.id, "REJECTED")
                      }
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Colleges;