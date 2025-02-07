


import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import SalesOverviewChart from "../components/overview/SalesOverviewChart";

const OverviewPage = () => {
	const [userCount, setUserCount] = useState(0);
	const [productCount, setProductCount] = useState(0);

	// Fetch data from APIs
	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await fetch("https://jsonplaceholder.typicode.com/users");
				const data = await response.json();
				setUserCount(data.length);
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};

		const fetchProductData = async () => {
			try {
				const response = await fetch("https://api.restful-api.dev/objects");
				const data = await response.json();
				setProductCount(data.length);
			} catch (error) {
				console.error("Error fetching product data:", error);
			}
		};

		fetchUserData();
		fetchProductData();
	}, []);

	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Overview' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Total Sales' icon={Zap} value='$10,000' color='#6366F1' />
					<StatCard name='Total Users' icon={Users} value={userCount} color='#8B5CF6' />
					<StatCard name='Total Products' icon={ShoppingBag} value={productCount} color='#EC4899' />
					<StatCard name='Conversion Rate' icon={BarChart2} value='12.5%' color='#10B981' />
				</motion.div>
			</main>
		<div >
					<SalesOverviewChart />
					
		</div> 
		</div>
	);
};

export default OverviewPage;
