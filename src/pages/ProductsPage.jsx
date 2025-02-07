import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";

import { AlertTriangle, DollarSign, Package, TrendingUp } from "lucide-react";


import ProductsTable from "../components/products/ProductsTable";
import ProductCountTrendChart from "../components/products/ProductCountTrendChart";

const ProductsPage = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Products' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Total Products' icon={Package} value={13} color='#6366F1' />
					<StatCard name='Top Selling' icon={TrendingUp} value={10} color='#10B981' />
					<StatCard name='Low Stock' icon={AlertTriangle} value={8} color='#F59E0B' />
					<StatCard name='Total Revenue' icon={DollarSign} value={"$543,210"} color='#EF4444' />
				</motion.div>

				<ProductsTable />

				{/* CHARTS */}
				<div className=''>
					<ProductCountTrendChart />
					
				</div>
			</main>
		</div>
	);
};
export default ProductsPage;
