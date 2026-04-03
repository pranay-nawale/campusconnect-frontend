import { useEffect, useState } from "react";

import {
  getUsers,
  updateUserStatus,
  getBlockedUsers,
} from "../services/userService";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filterRole, setFilterRole] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [showBlocked, setShowBlocked] = useState(false);

  // 🔹 Fetch Users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      let res;

      if (showBlocked) {
        res = await getBlockedUsers();
      } else {
        res = await getUsers(filterRole);
      }

      setUsers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [filterRole, showBlocked]);

  // 🔹 Toggle Block/Unblock
  const handleStatusToggle = async (user) => {
    try {
      await updateUserStatus(user.id, !user.enabled);
      fetchUsers(); // refresh
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="">

      {/* 🔹 Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Manage Users</h2>

        <button
          onClick={() => setShowBlocked(!showBlocked)}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          {showBlocked ? "Show All Users" : "Show Blocked Users"}
        </button>
      </div>

      {/* 🔹 Filter */}
      {!showBlocked && (
        <div className="mb-4">
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            <option value="ALL">All</option>
            <option value="ADMIN">Admin</option>
            <option value="STUDENT">Student</option>
            <option value="COLLEGE">College</option>
            <option value="VENDOR">Vendor</option>
          </select>
        </div>
      )}

      {/* 🔹 Table */}
      <div className="overflow-x-auto">
        <table className="w-full border">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t hover:bg-gray-50">

                {/* Name */}
                <td className="p-3">{user.name}</td>

                {/* Email Fix */}
                <td className="p-3">
                  {user.email ? user.email.replace("'", "") : "N/A"}
                </td>

                {/* Role */}
                <td className="p-3">
                  {user.role ? user.role : "N/A"}
                </td>

                {/* Status */}
                <td className="p-3">
                  {user.enabled ? (
                    <span className="text-green-600 font-medium">
                      Active
                    </span>
                  ) : (
                    <span className="text-red-600 font-medium">
                      Blocked
                    </span>
                  )}
                </td>

                {/* Action */}
                <td className="p-3">
                  <button
                    onClick={() => handleStatusToggle(user)}
                    className={`px-3 py-1 rounded text-white ${
                      user.enabled
                        ? "bg-red-500"
                        : "bg-green-500"
                    }`}
                  >
                    {user.enabled ? "Block" : "Unblock"}
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default Users;

