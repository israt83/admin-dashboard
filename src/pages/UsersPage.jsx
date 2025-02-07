


import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import axios from "axios";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import UsersTable from "../components/users/UsersTable";


const UsersPage = () => {
  const [userStats, setUserStats] = useState({
    totalUsers: 0,
    newUsersToday: 0,
    activeUsers: 0,
    churnRate: "0%",
  });

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        const users = response.data;

        // Example logic to populate stats dynamically
        const totalUsers = users.length;
        const newUsersToday = Math.floor(totalUsers * 0.05); // Example: 5% of users are new
        const activeUsers = Math.floor(totalUsers * 0.65); // Example: 65% of users are active
        const churnRate = `${(100 - (activeUsers / totalUsers) * 100).toFixed(1)}%`;

        setUserStats({
          totalUsers,
          newUsersToday,
          activeUsers,
          churnRate,
        });
      } catch (error) {
        console.error("Error fetching user stats:", error);
      }
    };

    fetchUserStats();
  }, []);

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Users" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Total Users"
            icon={UsersIcon}
            value={userStats.totalUsers.toLocaleString()}
            color="#6366F1"
          />
          <StatCard
            name="New Users Today"
            icon={UserPlus}
            value={userStats.newUsersToday}
            color="#10B981"
          />
          <StatCard
            name="Active Users"
            icon={UserCheck}
            value={userStats.activeUsers.toLocaleString()}
            color="#F59E0B"
          />
          <StatCard
            name="Churn Rate"
            icon={UserX}
            value={userStats.churnRate}
            color="#EF4444"
          />
        </motion.div>

        {/* USER TABLE */}
        <UsersTable />

       
      </main>
    </div>
  );
};

export default UsersPage;
