// CompleteProfile.jsx

import { useState } from "react";
import {
  updateCollegeProfile,
  uploadDocument,
} from "../services/collegeService";
import { useNavigate } from "react-router-dom";

export default function CompleteProfile() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    city: "",
    website: "",
  });

  const [files, setFiles] = useState({
    logo: null,
    naac: null,
    letter: null,
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // 🔥 update basic info
      await updateCollegeProfile(form);

      // 🔥 upload docs
      if (files.logo) await uploadDocument(files.logo, "LOGO");
      if (files.naac) await uploadDocument(files.naac, "NAAC");
      if (files.letter) await uploadDocument(files.letter, "LETTER");

      alert("Profile completed ✅");
      navigate("/college/dashboard");

    } catch (err) {
      alert("Error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section bg-soft">
      <div className="section-inner max-w-4xl space-y-6">

        <h2 className="section-title text-grad-primary text-center">
          Complete Your Profile
        </h2>

        <div className="card p-6 space-y-4">

          {/* CITY */}
          <input
            className="input"
            placeholder="City"
            onChange={(e)=>setForm({...form, city:e.target.value})}
          />

          {/* WEBSITE */}
          <input
            className="input"
            placeholder="Website"
            onChange={(e)=>setForm({...form, website:e.target.value})}
          />

          {/* LOGO */}
          <div>
            <p className="text-sm mb-1">Logo</p>

            <img
              src={
                files.logo
                  ? URL.createObjectURL(files.logo)
                  : "https://via.placeholder.com/80"
              }
              className="w-20 h-20 rounded mb-2"
            />

            <input
              type="file"
              className="input"
              onChange={(e)=>setFiles({...files, logo:e.target.files[0]})}
            />
          </div>

          {/* NAAC */}
          <div>
            <p className="text-sm mb-1">NAAC Certificate</p>

            <p className="text-xs text-gray-500">
              {files.naac ? files.naac.name : "No file selected"}
            </p>

            <input
              type="file"
              className="input"
              onChange={(e)=>setFiles({...files, naac:e.target.files[0]})}
            />
          </div>

          {/* LETTER */}
          <div>
            <p className="text-sm mb-1">Official Letter</p>

            <p className="text-xs text-gray-500">
              {files.letter ? files.letter.name : "No file selected"}
            </p>

            <input
              type="file"
              className="input"
              onChange={(e)=>setFiles({...files, letter:e.target.files[0]})}
            />
          </div>

          {/* BUTTON */}
          <button className="btn-primary w-full" onClick={handleSubmit}>
            {loading ? "Submitting..." : "Submit Profile"}
          </button>

        </div>
      </div>
    </div>
  );
}