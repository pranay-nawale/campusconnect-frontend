import { useEffect, useState } from "react";
import { getServiceVendors, assignVendor } from "../services/eventService";

const AssignVendorModal = ({ open, onClose, eventId, serviceId }) => {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    if (open) {
      fetchVendors();
    }
  }, [open]);

  const fetchVendors = async () => {
    const data = await getServiceVendors(serviceId);
    setVendors(data);
  };

  const handleAssign = async (vendorId) => {
    await assignVendor(eventId, serviceId, vendorId);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-5 rounded-xl w-96 space-y-4">

        <h2 className="text-lg font-semibold">
          Assign Vendor
        </h2>

        <div className="max-h-60 overflow-y-auto space-y-2">
          {vendors.map((v) => (
            <div
              key={v.id}
              className="flex justify-between border p-2 rounded"
            >
              <span>{v.businessName}</span>
              <button
                onClick={() => handleAssign(v.id)}
                className="text-sm bg-indigo-500 text-white px-2 py-1 rounded"
              >
                Assign
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full border py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AssignVendorModal;