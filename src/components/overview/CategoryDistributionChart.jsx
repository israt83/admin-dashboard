// import { motion } from "framer-motion";
// import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

// const categoryData = [
// 	{ name: "Electronics", value: 4500 },
// 	{ name: "Clothing", value: 3200 },
// 	{ name: "Home & Garden", value: 2800 },
// 	{ name: "Books", value: 2100 },
// 	{ name: "Sports & Outdoors", value: 1900 },
// ];

// const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B"];

// const CategoryDistributionChart = () => {
// 	return (
// 		<motion.div
// 			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
// 			initial={{ opacity: 0, y: 20 }}
// 			animate={{ opacity: 1, y: 0 }}
// 			transition={{ delay: 0.3 }}
// 		>
// 			<h2 className='text-lg font-medium mb-4 text-gray-100'>Category Distribution</h2>
// 			<div className='h-80'>
// 				<ResponsiveContainer width={"100%"} height={"100%"}>
// 					<PieChart>
// 						<Pie
// 							data={categoryData}
// 							cx={"50%"}
// 							cy={"50%"}
// 							labelLine={false}
// 							outerRadius={80}
// 							fill='#8884d8'
// 							dataKey='value'
// 							label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
// 						>
// 							{categoryData.map((entry, index) => (
// 								<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
// 							))}
// 						</Pie>
// 						<Tooltip
// 							contentStyle={{
// 								backgroundColor: "rgba(31, 41, 55, 0.8)",
// 								borderColor: "#4B5563",
// 							}}
// 							itemStyle={{ color: "#E5E7EB" }}
// 						/>
// 						<Legend />
// 					</PieChart>
// 				</ResponsiveContainer>
// 			</div>
// 		</motion.div>
// 	);
// };
// export default CategoryDistributionChart;


import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B"];

const CategoryDistributionChart = () => {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.restful-api.dev/objects");
        const data = await response.json();

        // Categorize products
        const categorizedData = categorizeProducts(data);

        setCategoryData(categorizedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Categorizing products based on product names
    const categorizeProducts = (products) => {
      const categories = {
        Electronics: 0,
        Clothing: 0,
        "Home & Garden": 0,
        Books: 0,
        "Sports & Outdoors": 0,
      };

      products.forEach((product) => {
        // Assigning categories based on product name (you can customize this logic)
        if (product.name.includes("iPhone") || product.name.includes("MacBook") || product.name.includes("AirPods") || product.name.includes("iPad")) {
          categories["Electronics"] += 1;
        } else if (product.name.includes("Book")) {
          categories["Books"] += 1;
        } else if (product.name.includes("Galaxy")) {
          categories["Electronics"] += 1;
        } else {
          categories["Sports & Outdoors"] += 1; // Default category
        }
      });

      return Object.entries(categories).map(([name, value]) => ({
        name,
        value,
      }));
    };

    fetchData();
  }, []);

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-100">Category Distribution</h2>
      <div className="h-80">
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <PieChart>
            <Pie
              data={categoryData}
              cx={"50%"}
              cy={"50%"}
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default CategoryDistributionChart;
