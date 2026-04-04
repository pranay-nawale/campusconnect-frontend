import { Link } from "react-router-dom";
import { X } from "lucide-react";

const AdminSidebar = ({ closeSidebar }) => {
  return (
    <div className="w-64 h-screen bg-indigo-900 text-white p-5 relative">

      {/* ❌ Close Button (only visible on mobile) */}
      <button
        className="absolute top-4 right-4 md:hidden"
        onClick={closeSidebar}
      >
        <X size={22} />
      </button>

      {/* Logo / Title */}
      <h2 className="text-xl font-bold mb-6">CampusConnect</h2>

      {/* Menu */}
      <ul className="space-y-4">

        <li>
          <Link to="/admin" onClick={closeSidebar}>
            Dashboard
          </Link>
        </li>

        <li>
          <Link to="/admin/users" onClick={closeSidebar}>
            Users
          </Link>
        </li>

        <li>
          <Link to="/admin/students" onClick={closeSidebar}>
            Students
          </Link>
        </li>

        <li>
          <Link to="/admin/vendors" onClick={closeSidebar}>
            Vendors
          </Link>
        </li>

        <li>
          <Link to="/admin/colleges" onClick={closeSidebar}>
            Colleges
          </Link>
        </li>

        <li>
          <Link to="/admin/events" >
            Events
          </Link>
        </li>

        <li>
          <button className="-full text-left px-4 py-2 rounded-md bg-indigo-700 transition-colors">
            Logout
          </button>
        </li>

      </ul>

    </div>
  );
};

export default AdminSidebar;