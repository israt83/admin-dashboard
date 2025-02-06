// import { motion } from "framer-motion";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

// const salesData = [
// 	{ month: "Jan", sales: 4000 },
// 	{ month: "Feb", sales: 3000 },
// 	{ month: "Mar", sales: 5000 },
// 	{ month: "Apr", sales: 4500 },
// 	{ month: "May", sales: 6000 },
// 	{ month: "Jun", sales: 5500 },
// ];

// const SalesTrendChart = () => {
// 	return (
// 		<motion.div
// 			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
// 			initial={{ opacity: 0, y: 20 }}
// 			animate={{ opacity: 1, y: 0 }}
// 			transition={{ delay: 0.3 }}
// 		>
// 			<h2 className='text-xl font-semibold text-gray-100 mb-4'>Sales Trend</h2>
// 			<div style={{ width: "100%", height: 300 }}>
// 				<ResponsiveContainer>
// 					<LineChart data={salesData}>
// 						<CartesianGrid strokeDasharray='3 3' stroke='#374151' />
// 						<XAxis dataKey='month' stroke='#9CA3AF' />
// 						<YAxis stroke='#9CA3AF' />
// 						<Tooltip
// 							contentStyle={{
// 								backgroundColor: "rgba(31, 41, 55, 0.8)",
// 								borderColor: "#4B5563",
// 							}}
// 							itemStyle={{ color: "#E5E7EB" }}
// 						/>
// 						<Legend />
// 						<Line type='monotone' dataKey='sales' stroke='#8B5CF6' strokeWidth={2} />
// 					</LineChart>
// 				</ResponsiveContainer>
// 			</div>
// 		</motion.div>
// 	);
// };
// export default SalesTrendChart;

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const ProductCountTrendChart = () => {
  const [productCountData, setProductCountData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.restful-api.dev/objects");
        const data = await response.json();

        // Transform data for Product Count Trend
        const transformedProductCountData = data.map((item) => ({
          month: item.name,
          count: item.data ? 1 : 0,
        }));
        setProductCountData(transformedProductCountData);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <motion.div
      className=" py-10 bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
 

      {/* Product Count Trend Chart */}
      <div style={{ width: "100%", height: 300 }}>
        <h3 className="text-lg text-gray-100 mb-2">Product Count </h3>
        <ResponsiveContainer>
          <LineChart data={productCountData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#F59E0B" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default ProductCountTrendChart;
