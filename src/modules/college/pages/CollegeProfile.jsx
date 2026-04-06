import { useEffect, useState } from "react";
import {
  getCollegeProfile,
  updateCollegeProfile,
  uploadDocument,
} from "../services/collegeService";

export default function CollegeProfile() {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [files, setFiles] = useState({});
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const res = await getCollegeProfile();
    setProfile(res.data);
  };

  // ================= SAVE =================
  const handleSave = async () => {
    try {
      setLoading(true);

      await updateCollegeProfile({
        city: profile.city,
        website: profile.website,
      });

      if (files.logo) await uploadDocument(files.logo, "LOGO");
      if (files.naac) await uploadDocument(files.naac, "NAAC");
      if (files.letter) await uploadDocument(files.letter, "LETTER");

      setEditMode(false);
      setFiles({});
      fetchProfile();
    } catch {
      alert("Update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  if (!profile) return <div className="p-6">Loading...</div>;

  const handleDownload = async (url, name) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();

    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = name || "file";

    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(blobUrl);
  } catch (err) {
    console.error("Download failed", err);
  }
};

  return (
    <div className="p-6 max-w-5xl mx-auto">

      {/* ================= HEADER ================= */}
      <div className="card p-6 mb-6 flex justify-between items-center">

        <div className="flex items-center gap-4">

          <img
            src={
              files.logo
                ? URL.createObjectURL(files.logo)
                : profile.logoUrl ||
                  "https://dummyimage.com/80x80/ccc/000&text=Logo"
            }
            className="w-16 h-16 rounded-xl object-cover cursor-pointer"
            onClick={() =>
              setPreview(
                files.logo
                  ? URL.createObjectURL(files.logo)
                  : profile.logoUrl
              )
            }
          />

          <div>
            <h2 className="text-xl font-bold">{profile.name}</h2>

            <p className="text-sm text-gray-500">
              {profile.universityname}
            </p>

            <div className="flex items-center gap-3 mt-1">

              <span
                className={`badge ${
                  profile.verificationStatus === "APPROVED"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {profile.verificationStatus}
              </span>

              {/* 🔥 MINI STAT */}
              {/* <span className="text-xs text-gray-500">
                🎉 {profile.eventCount || 0} Events Hosted
              </span> */}
            </div>
          </div>
        </div>

        {!editMode ? (
          <button className="btn-primary" onClick={() => setEditMode(true)}>
            Edit Profile
          </button>
        ) : (
          <button className="btn-primary" onClick={handleSave}>
            {loading ? "Saving..." : "Save Changes"}
          </button>
        )}
      </div>

      {/* ================= BASIC INFO ================= */}
      <div className="card p-6 mb-6">
        <h3 className="font-semibold mb-4">Basic Information</h3>

        {editMode ? (
          <div className="grid grid-cols-2 gap-4">

            <input
              className="input"
              value={profile.city || ""}
              onChange={(e) =>
                setProfile({ ...profile, city: e.target.value })
              }
            />

            <input
              className="input"
              value={profile.website || ""}
              onChange={(e) =>
                setProfile({ ...profile, website: e.target.value })
              }
            />

          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 text-sm">

            <p><b>City:</b> {profile.city}</p>
            <p><b>Website:</b> {profile.website}</p>

            {/* OPTIONAL */}
            <p><b>Email:</b> {profile.email || "N/A"}</p>
            <p><b>Joined:</b> {profile.createdAt || "N/A"}</p>

          </div>
        )}
      </div>

      {/* ================= DOCUMENTS ================= */}
      <div className="card p-6">
        <h3 className="font-semibold mb-4">Documents</h3>

        <div className="grid grid-cols-3 gap-6">

          <DocCard
            title="Logo"
            file={files.logo}
            url={profile.logoUrl}
            editMode={editMode}
            onChange={(f) => setFiles({ ...files, logo: f })}
            onPreview={setPreview}
          />

          <DocCard
            title="NAAC Certificate"
            file={files.naac}
            url={profile.naacCertificateUrl}
            editMode={editMode}
            onChange={(f) => setFiles({ ...files, naac: f })}
            onPreview={setPreview}
          />

          <DocCard
            title="Official Letter"
            file={files.letter}
            url={profile.officialLetterUrl}
            editMode={editMode}
            onChange={(f) => setFiles({ ...files, letter: f })}
            onPreview={setPreview}
          />

        </div>
      </div>

      {/* ================= MODAL ================= */}
      {preview && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-xl max-w-2xl w-full relative">

            <button
              className="absolute top-2 right-2"
              onClick={() => setPreview(null)}
            >
              ✖
            </button>

            <img
              src={preview}
              className="w-full max-h-[70vh] object-contain"
            />

            <a
              href={preview}
              download
              className="btn-primary mt-4 inline-block"
            >
              Download
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

// ================= DOC CARD =================
function DocCard({ title, file, url, editMode, onChange, onPreview }) {
  const previewUrl = file ? URL.createObjectURL(file) : url;

  return (
    <div className="border p-4 rounded-xl text-center">

      <p className="mb-2 font-medium">{title}</p>

      {previewUrl ? (
        <img
          src={previewUrl}
          className="w-24 h-24 mx-auto object-cover cursor-pointer"
          onClick={() => onPreview(previewUrl)}
        />
      ) : (
        <p className="text-gray-400 text-sm">Not uploaded</p>
      )}

      {editMode && (
        <input
          type="file"
          className="mt-2"
          onChange={(e) => onChange(e.target.files[0])}
        />
      )}

      {previewUrl && (
        <a
          href={previewUrl}
          download
          className="text-blue-500 text-xs block mt-2"
        >
          Download
        </a>
      )}
    </div>
  );
}