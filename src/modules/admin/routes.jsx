import { Routes, Route } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout" 
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Students from "./pages/Students";
import Colleges from "./pages/Colleges";
import Vendors from "./pages/Vendors";
import Events from "./pages/Events";
import CollegeDetails from "./pages/CollegeDetails";
import VendorDetails from "./pages/VendorDetails";

const AdminRoutes = () => {
  return (
    <Routes>

      {/* Parent Route */}
      <Route path="/" element={<AdminLayout />}>

        {/* Child Routes */}
        <Route path="" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="students" element={<Students />} />
        <Route path="colleges" element={<Colleges />} />
        <Route path="/colleges/:id" element={<CollegeDetails />} />
        <Route path="vendors" element={<Vendors />} />
        <Route path="vendors/:id" element={<VendorDetails />} />
        <Route path="events" element={<Events />} />
      </Route>

    </Routes>
  );
};

export default AdminRoutes;