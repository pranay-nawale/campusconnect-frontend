import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../modules/public/components/Navbar";

export default function CollegeLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/college/dashboard", icon: "📊" },
    { name: "Profile", path: "/college/profile", icon: "👤" },
    { name: "Events", path: "/college/events", icon: "📅" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* NAVBAR */}
      <Navbar />

      <div className="flex flex-1 mt-16">

        {/* SIDEBAR */}
        <div className="w-64 bg-gradient-to-b from-indigo-600 to-purple-600 text-white shadow-lg fixed h-full">

          <div className="p-6 border-b border-white/20">
            <h2 className="text-xl font-bold tracking-wide">
              🎓 College Panel
            </h2>
          </div>

          <div className="p-4 space-y-2">

            {menu.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <div
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all
                  ${
                    isActive
                      ? "bg-white text-indigo-600 shadow-md"
                      : "hover:bg-white/20"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </div>
              );
            })}

          </div>

        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 ml-64 p-6">

          <div className="bg-white rounded-2xl shadow-sm p-6 min-h-[85vh]">
            <Outlet />
          </div>

        </div>

      </div>
    </div>
  );
}