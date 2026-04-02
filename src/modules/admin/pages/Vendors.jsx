import { useEffect, useState } from "react";
import {
  getVendors,
  updateVendorStatus,
} from "../services/vendorService";
import StatusBadge from "../components/StatusBadge";
import { useNavigate } from "react-router-dom";

const Vendors = () => {
  const [vendors, setVendors] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchVendors = async () => {
    setLoading(true);
    try {
      const data = await getVendors(filter);
      setVendors(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchVendors();
  }, [filter]);

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateVendorStatus(id, status);
      fetchVendors();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">

      {/* Title */}
      <h1 className="text-2xl font-bold">
        Vendor Verification
      </h1>

      {/* Filter Buttons */}
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
              <th className="p-3">Business Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Phone</th>
              {/* <th className="p-3">GST</th>
              <th className="p-3">User Email</th> */}
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center p-5">
                  Loading...
                </td>
              </tr>
            ) : vendors.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center p-5">
                  No vendors found
                </td>
              </tr>
            ) : (
              vendors.map((v) => (
                <tr key={v.id} className="border-t">
                  
                  <td className="p-3 font-medium">
                    {v.businessName}
                  </td>

                  <td className="p-3">
                    {v.category}
                  </td>

                  <td className="p-3">
                    {v.phone}
                  </td>

                  {/* <td className="p-3">
                    {v.gstNumber}
                  </td>

                  <td className="p-3">
                    {v.userEmail}
                  </td> */}

                  <td className="p-3">
                    <StatusBadge status={v.verificationStatus} />
                  </td>

                  <td className="p-3 text-center space-x-2">

                    <button
                      onClick={() => navigate(`/admin/vendors/${v.id}`)}
                      className="px-3 py-1 text-sm bg-blue-500 text-white rounded"
                    >
                      View
                    </button>

                    <button
                      onClick={() =>
                        handleStatusUpdate(v.id, "APPROVED")
                      }
                      className="px-3 py-1 text-sm bg-green-500 text-white rounded"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        handleStatusUpdate(v.id, "REJECTED")
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

export default Vendors;