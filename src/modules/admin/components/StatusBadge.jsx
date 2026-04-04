const StatusBadge = ({ status }) => {
  const base =
    "px-3 py-1 text-xs font-semibold rounded-full border";

  const styles = {
    PENDING: "bg-yellow-100 text-yellow-700 border-yellow-300",
    APPROVED: "bg-green-100 text-green-700 border-green-300",
    REJECTED: "bg-red-100 text-red-700 border-red-300",
    PLANNED: "bg-blue-100 text-blue-700 border-blue-300",             
    CONFIRMED: "bg-green-100 text-green-700 border-green-300",       
    RESCHEDULED: "bg-purple-100 text-purple-700 border-purple-300",  
    BOOKED: "bg-indigo-100 text-indigo-700 border-indigo-300", 
  };

  return (
    <span className={`${base} ${styles[status] || ""}`}>
      {status}
    </span>
  );
};

export default StatusBadge;