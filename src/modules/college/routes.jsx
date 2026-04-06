import { Route } from "react-router-dom";
import CollegeLayout from "../../layouts/CollegeLayout";

import Dashboard from "./pages/Dashboard";
import CollegeProfile from "./pages/CollegeProfile";
import Events from "./pages/Events";
import CreateEvent from "./pages/CreateEvent";
import EventDetails from "./pages/EventDetails";

const CollegeRoutes = (
  <Route path="/college" element={<CollegeLayout />}>

    <Route path="dashboard" element={<Dashboard />} />
    <Route path="profile" element={<CollegeProfile />} />
    <Route path="events" element={<Events />} />
    <Route path="create-event" element={<CreateEvent />} />
    <Route path="events/:id" element={<EventDetails />} />

  </Route>
);

export default CollegeRoutes;