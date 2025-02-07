

import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const SalesOverviewChart = () => {
	const [userData, setUserData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Fetch data from API
		const fetchData = async () => {
			try {
				const response = await fetch("https://jsonplaceholder.typicode.com/users");
				const data = await response.json();
				// Transform data to match chart format
				const chartData = data.map((user) => ({
					name: user.name,
					lat: parseFloat(user.address.geo.lat),
				}));
				setUserData(chartData);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching user data:", error);
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	return (
		<motion.div
			className="mx-8 mb-5 bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<h2 className="text-lg font-medium mb-4 text-gray-100">User Geo Latitude Overview</h2>

			<div className="h-80">
				{loading ? (
					<p className="text-gray-200">Loading data...</p>
				) : (
					<ResponsiveContainer width={"100%"} height={"100%"}>
						<LineChart data={userData}>
							<CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
							<XAxis dataKey={"name"} stroke="#9ca3af" />
							<YAxis stroke="#9ca3af" />
							<Tooltip
								contentStyle={{
									backgroundColor: "rgba(31, 41, 55, 0.8)",
									borderColor: "#4B5563",
								}}
								itemStyle={{ color: "#E5E7EB" }}
							/>
							<Line
								type="monotone"
								dataKey="lat"
								stroke="#6366F1"
								strokeWidth={3}
								dot={{ fill: "#6366F1", strokeWidth: 2, r: 6 }}
								activeDot={{ r: 8, strokeWidth: 2 }}
							/>
						</LineChart>
					</ResponsiveContainer>
				)}
			</div>
		</motion.div>
	);
};

export default SalesOverviewChart;
