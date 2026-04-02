import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCollegeById, updateCollegeStatus } from "../services/collegeService";
import { useNavigate } from "react-router-dom";

const CollegeDetails = () => {
  const { id } = useParams();
  const [college, setCollege] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCollege();
  }, []);

  const fetchCollege = async () => {
    const data = await getCollegeById(id);
    setCollege(data);
  };

  const handleAction = async (status) => {
    await updateCollegeStatus(id, status);
    fetchCollege();
  };

  if (!college) return <p>Loading...</p>;

  return (
    <div className="space-y-3">

      <div className="grid grid-cols-2 gap-4">
      <h1 className="text-2xl font-bold">College Details</h1>
      <h1 className="text-2xl font-bold">User Details</h1>

        <p><b>College Name:</b> {college.name}</p>
        <p><b>User Email:</b> {college.userEmail}</p>
        <p><b>University:</b> {college.universityName}</p> 
        <p><b>User Status:</b> <span
                                    className={` ${
                                        college.userEnabled ? "text-green-500 font-bold" : "text-red-500 font-bold"
                                    }`}
                                >
                                  {college.userEnabled ? "Active" : "Blocked"}
                                </span>
        </p>
        <p><b>City:</b> {college.city}</p>
        
      </div>

      <p>
          <b>Website:</b>{" "}
          <a href={college.website} target="_blank" className="text-blue-500">
            Visit
          </a>
      </p>

      <p>
        <b>Verification Status:</b>{" "}
        <span
          className={`font-bold ${
            college.verificationStatus === "APPROVED"
              ? "text-green-500"
              : college.verificationStatus === "REJECTED"
              ? "text-red-500"
              : "text-yellow-500"
          }`}
        >
          {college.verificationStatus}
        </span>
      </p>

      {/* Documents */}
      <div>
        <h2 className="font-semibold text-lg">Documents</h2>

        <a href={college.officialLetterUrl} target="_blank" className="text-blue-500 block">
          View Official Letter
        </a>

        <a href={college.naacCertificateUrl} target="_blank" className="text-blue-500 block">
          View NAAC Certificate
        </a>

        <img src={college.logoUrl} alt="Logo" className="w-32 h-32 object-contain" />
      </div>

      {/* Actions */}
    <div className="space-x-3 flex justify-between items-center mx-10">
        <div className="flex gap-3">
            <button
            onClick={() => handleAction("APPROVED")}
            className="px-4 py-2 bg-green-500 text-white rounded"
            >
            Approve
            </button>

            <button
            onClick={() => handleAction("REJECTED")}
            className="px-4 py-2 bg-red-500 text-white rounded"
            >
            Reject
            </button>
        </div>
        <div>
            <button
            onClick={() => navigate("/admin/colleges")}
            className="px-4 py-2 bg-gray-500 text-white rounded "
            >
                Close
            </button>
        </div>
    </div>
    </div>
  );
};

export default CollegeDetails;