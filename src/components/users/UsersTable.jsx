// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Search } from "lucide-react";

// const userData = [
// 	{ id: 1, name: "John Doe", email: "john@example.com", role: "Customer", status: "Active" },
// 	{ id: 2, name: "Jane Smith", email: "jane@example.com", role: "Admin", status: "Active" },
// 	{ id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Customer", status: "Inactive" },
// 	{ id: 4, name: "Alice Brown", email: "alice@example.com", role: "Customer", status: "Active" },
// 	{ id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "Moderator", status: "Active" },
// ];

// const UsersTable = () => {
// 	const [searchTerm, setSearchTerm] = useState("");
// 	const [filteredUsers, setFilteredUsers] = useState(userData);

// 	const handleSearch = (e) => {
// 		const term = e.target.value.toLowerCase();
// 		setSearchTerm(term);
// 		const filtered = userData.filter(
// 			(user) => user.name.toLowerCase().includes(term) || user.email.toLowerCase().includes(term)
// 		);
// 		setFilteredUsers(filtered);
// 	};

// 	return (
// 		<motion.div
// 			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
// 			initial={{ opacity: 0, y: 20 }}
// 			animate={{ opacity: 1, y: 0 }}
// 			transition={{ delay: 0.2 }}
// 		>
// 			<div className='flex justify-between items-center mb-6'>
// 				<h2 className='text-xl font-semibold text-gray-100'>Users</h2>
// 				<div className='relative'>
// 					<input
// 						type='text'
// 						placeholder='Search users...'
// 						className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
// 						value={searchTerm}
// 						onChange={handleSearch}
// 					/>
// 					<Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
// 				</div>
// 			</div>

// 			<div className='overflow-x-auto'>
// 				<table className='min-w-full divide-y divide-gray-700'>
// 					<thead>
// 						<tr>
// 							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
// 								Name
// 							</th>
// 							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
// 								Email
// 							</th>
// 							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
// 								Role
// 							</th>
// 							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
// 								Status
// 							</th>
// 							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
// 								Actions
// 							</th>
// 						</tr>
// 					</thead>

// 					<tbody className='divide-y divide-gray-700'>
// 						{filteredUsers.map((user) => (
// 							<motion.tr
// 								key={user.id}
// 								initial={{ opacity: 0 }}
// 								animate={{ opacity: 1 }}
// 								transition={{ duration: 0.3 }}
// 							>
// 								<td className='px-6 py-4 whitespace-nowrap'>
// 									<div className='flex items-center'>
// 										<div className='flex-shrink-0 h-10 w-10'>
// 											<div className='h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold'>
// 												{user.name.charAt(0)}
// 											</div>
// 										</div>
// 										<div className='ml-4'>
// 											<div className='text-sm font-medium text-gray-100'>{user.name}</div>
// 										</div>
// 									</div>
// 								</td>

// 								<td className='px-6 py-4 whitespace-nowrap'>
// 									<div className='text-sm text-gray-300'>{user.email}</div>
// 								</td>
// 								<td className='px-6 py-4 whitespace-nowrap'>
// 									<span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-800 text-blue-100'>
// 										{user.role}
// 									</span>
// 								</td>

// 								<td className='px-6 py-4 whitespace-nowrap'>
// 									<span
// 										className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
// 											user.status === "Active"
// 												? "bg-green-800 text-green-100"
// 												: "bg-red-800 text-red-100"
// 										}`}
// 									>
// 										{user.status}
// 									</span>
// 								</td>

// 								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
// 									<button className='text-indigo-400 hover:text-indigo-300 mr-2'>Edit</button>
// 									<button className='text-red-400 hover:text-red-300'>Delete</button>
// 								</td>
// 							</motion.tr>
// 						))}
// 					</tbody>
// 				</table>
// 			</div>
// 		</motion.div>
// 	);
// };
// export default UsersTable;

// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Search } from "lucide-react";
// import axios from "axios";

// const UsersTable = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);

//   // Fetch user data from the API
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get("https://jsonplaceholder.typicode.com/users");
//         setUsers(response.data);
//         setFilteredUsers(response.data);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       }
//     };
//     fetchUsers();
//   }, []);

//   // Handle search filtering
//   const handleSearch = (e) => {
//     const term = e.target.value.toLowerCase();
//     setSearchTerm(term);
//     const filtered = users.filter(
//       (user) =>
//         user.name.toLowerCase().includes(term) ||
//         user.email.toLowerCase().includes(term) ||
//         user.address.city.toLowerCase().includes(term)
//     );
//     setFilteredUsers(filtered);
//   };

//   // Display user data in the table
//   return (
//     <motion.div
//       className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: 0.2 }}
//     >
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-xl font-semibold text-gray-100">Users</h2>
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search users..."
//             className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={searchTerm}
//             onChange={handleSearch}
//           />
//           <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
//         </div>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-700">
//           <thead>
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                 Name
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                 Email
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                 City
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>

//           <tbody className="divide-y divide-gray-700">
//             {filteredUsers.map((user) => (
//               <motion.tr
//                 key={user.id}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-sm font-medium text-gray-100">{user.name}</div>
//                 </td>

//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-sm text-gray-300">{user.email}</div>
//                 </td>

//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-sm text-gray-300">{user.address.city}</div>
//                 </td>

//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
//                   <button
//                     className="text-blue-400 hover:text-blue-300"
//                     onClick={() => alert(JSON.stringify(user, null, 2))}
//                   >
//                     View Details
//                   </button>
//                 </td>
//               </motion.tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </motion.div>
//   );
// };

// export default UsersTable;

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Modal from "react-modal";
import axios from "axios";

Modal.setAppElement("#root");

const UsersTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch user data from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Handle search filtering
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.address.city.toLowerCase().includes(term)
    );
    setFilteredUsers(filtered);
  };

  // Open modal and set selected user
  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  // Display user data in the table
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Users</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                City
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {filteredUsers.map((user) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-100">
                    {user.name}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">{user.email}</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">
                    {user.address.city}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <button
                    className="text-blue-400 hover:text-blue-300"
                    onClick={() => handleViewDetails(user)}
                  >
                    View Details
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for displaying user details */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="User Details"
        className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-md mx-auto mt-20 relative z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40"
      >
        {selectedUser && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              {selectedUser.name}
            </h2>
            <p className="text-gray-300 mb-2">
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p className="text-gray-300 mb-2">
              <strong>City:</strong> {selectedUser.address.city}
            </p>
            <p className="text-gray-300 mb-2">
              <strong>Phone:</strong> {selectedUser.phone}
            </p>
            <p className="text-gray-300 mb-2">
              <strong>Company:</strong> {selectedUser.company.name}
            </p>
            <button
              onClick={closeModal}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400"
            >
              Close
            </button>
          </div>
        )}
      </Modal>
    </motion.div>
  );
};

export default UsersTable;
