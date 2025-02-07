
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, ChevronDown } from "lucide-react";
import Modal from "react-modal";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";

Modal.setAppElement("#root");

const UsersTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sorting state
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });

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

  // Sorting function
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Handle sorting
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
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
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 max-w-6xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex flex-col lg:flex-row justify-between items-center mb-6 space-y-4 lg:space-y-0">
        <h2 className="text-xl font-semibold text-gray-100">Users</h2>
        <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full lg:w-64"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
          </div>
          <div className="relative">
            <button
              className="bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 w-full lg:w-auto"
              onClick={(e) => e.target.nextSibling.classList.toggle("hidden")}
            >
              <span>Sort By</span>
              <ChevronDown size={16} />
            </button>
            <ul className="absolute bg-gray-800 text-white shadow-lg rounded-lg mt-2 hidden z-10 w-full lg:w-auto">
              <li
                className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                onClick={() => handleSort("name")}
              >
                Name
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                onClick={() => handleSort("email")}
              >
                Email
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                onClick={() => handleSort("address.city")}
              >
                City
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                Email
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                City
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {sortedUsers.map((user) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-100 text-center">
                    {user.name}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300 text-center">
                    {user.email}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300 text-center">
                    {user.address.city}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300 text-center">
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
        className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-md mx-auto mt-20 relative z-50 w-11/12 lg:w-2/3"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40"
      >
        {selectedUser && (
          <div>
            <button onClick={closeModal} className=" lg:mx-96  text-white ">
			<AiOutlineClose />
            </button>
            <h2 className="text-2xl font-bold text-white mb-4 text-center">
              {selectedUser.name}
            </h2>
            <p className="text-gray-300 mb-2">
              <span>Username:</span> {selectedUser.username}
            </p>
            <p className="text-gray-300 mb-2">
              <span>Email:</span> {selectedUser.email}
            </p>
			<p className="text-gray-300 text-lg font-bold">address :</p>
            <div className="flex gap-3 ">
			
			<p className="text-gray-300 mb-2">
              <span>City:</span> {selectedUser.address.city} ,
            </p>
            <p className="text-gray-300 mb-2">
              <span>Street:</span> {selectedUser.address.street} ,
            </p>
            <p className="text-gray-300 mb-2">
              <span>zipcode:</span> {selectedUser.address.zipcode}
            </p>
			</div>
            <div className="flex space-x-2 ">
              <p className="text-gray-300 mb-2">
                <span className="pr-2">Geo : </span> 
                <span>lat :</span> {selectedUser.address.geo.lat} ,
              </p>
              <p className="text-gray-300 mb-2">
                <span> lng: </span> {selectedUser.address.geo.lng}
              </p>
            </div>
            <p className="text-gray-300 mb-2">
              <span>Phone:</span> {selectedUser.phone}
            </p>
            <p className="text-gray-300 mb-2">
              <span>Website:</span> {selectedUser.website}
            </p>
        <div>
			<p className="text-gray-300 text-lg font-bold">Company Details</p>
		<p className="text-gray-300 mb-2">
              <span>Name:</span> {selectedUser.company.name}
            </p>
            <p className="text-gray-300 mb-2">
              <span>CatchPhrase:</span> {selectedUser.company.catchPhrase}
            </p>
            <p className="text-gray-300 mb-2">
              <span>bs:</span> {selectedUser.company.bs}
            </p>
		</div>
          </div>
        )}
      </Modal>
    </motion.div>
  );
};

export default UsersTable;
