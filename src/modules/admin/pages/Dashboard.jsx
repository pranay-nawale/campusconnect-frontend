import StatCard from "../components/StatCard";
import InfoCard from "../components/InfoCard";
import ActionButton from "../components/ActionButton";
import { useEffect, useState } from "react";
import { getDashboardData } from "../services/dashboard";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

  const [data, setData] = useState(null);
  const navigate = useNavigate();

  // ✅ Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDashboardData();
        setData(res);
      } catch (error) {
        console.log("Dashboard error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-6">

      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard 
          title="Total Colleges" 
          value={data?.totalColleges || 0} 
          gradient="linear-gradient(135deg,#3b82f6,#6366f1)" 
          onClick={() => navigate("/admin/colleges")}
        />
        <StatCard 
          title="Total Vendors" 
          value={data?.totalVendors || 0} 
          gradient="linear-gradient(135deg,#f97316,#fb923c)" 
          onClick={() => navigate("/admin/vendors")}
        />
        <StatCard 
          title="Total Students" 
          value={data?.totalStudents || 0} 
          gradient="linear-gradient(135deg,#22c55e,#34d399)" 
          onClick={() => navigate("/admin/students")}
        />
        <StatCard 
          title="Total Events" 
          value={data?.totalEvents || 0} 
          gradient="linear-gradient(135deg,#8b5cf6,#a855f7)" 
          onClick={() => navigate("/admin/events")}
        />
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        <InfoCard title="Pending Approvals">
          <div className="flex justify-between">
            <span>Pending Vendors</span>
            <span className="font-bold">{data?.pendingVendors || 0}</span>
          </div>
          <div className="flex justify-between">
            <span>Pending Colleges</span>
            <span className="font-bold">{data?.pendingColleges || 0}</span>
          </div>
          <div className="flex justify-between">
            <span>Pending Students</span>
            <span className="font-bold">{data?.pendingStudents || 0}</span>
          </div>
          <div className="flex justify-between">
            <span>Pending Event Requests</span>
            <span className="font-bold">{data?.pendingEventRequests || 0}</span>
          </div>
        </InfoCard>

        <InfoCard title="Upcoming Events">
          {data?.upcomingEvents?.length > 0 ? (
            data.upcomingEvents.map((event, index) => (
              <div key={index} className="flex justify-between">
                <span>{event.name}</span>
                <span>{event.date}</span>
              </div>
            ))
          ) : (
            <p>No upcoming events</p>
          )}
        </InfoCard>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-4">
        <ActionButton text="Manage Colleges" 
                      gradient="linear-gradient(135deg,#3b82f6,#6366f1)" 
                      onClick={() => navigate("/admin/colleges")}
        />
        <ActionButton text="Manage Vendors" 
                      gradient="linear-gradient(135deg,#f97316,#fb923c)" 
                      onClick={() => navigate("/admin/vendors")}
        />
        <ActionButton text="Manage Students" 
                      onClick={() => navigate("/admin/students")}
                      gradient="linear-gradient(135deg,#22c55e,#34d399)" 
        />
        <ActionButton text="View Requests"  
                      onClick={() => navigate("/admin/events")}
                      gradient="linear-gradient(135deg,#64748b,#94a3b8)" 
        />
      </div>

    </div>
  );
};

export default Dashboard;