
import { motion } from "framer-motion";
import { Search, Trash2, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2"; 

const API_URL = "https://api.restful-api.dev/objects";

const Modal = ({ title, onClose, onSave, children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-gray-800 text-white rounded-lg p-6 w-96 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-100">
          ✕
        </button>
      </div>
      {children}
      <div className="mt-4 flex justify-end gap-2">
        {onSave && (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={onSave}
          >
            Add Product
          </button>
        )}
      </div>
    </div>
  </div>
);

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    color: "",
    generation: "",
    price: "",
    capacity: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await axios.get(API_URL);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products");
    }
  };

  // Add a new product
  const handleAddProduct = async () => {
    try {
      const response = await axios.post(API_URL, {
        name: newProduct.name,
        data: {
          color: newProduct.color,
          generation: newProduct.generation,
          price: newProduct.price,
          capacity: newProduct.capacity,
        },
      });
      setProducts((prevProducts) => [...prevProducts, response.data]);
      setIsAddModalOpen(false);
      setNewProduct({
        name: "",
        color: "",
        generation: "",
        price: "",
        capacity: "",
      });

      // Show SweetAlert on success
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Product added successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product");
    }
  };

 
  const handleDeleteProduct = async (id) => {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${API_URL}/${id}`);
          setProducts(products.filter((product) => product.id !== id));

          // Show success message
          Swal.fire({
            title: "Deleted!",
            text: "Your product has been deleted.",
            icon: "success",
          });
        } catch (error) {
          console.error("Error deleting product:", error);
          toast.error("Failed to delete product");
        }
      }
    });
  };
  // View product details
  const handleViewDetails = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      setSelectedProduct(response.data);
      setIsDetailsModalOpen(true);
    } catch (error) {
      console.error("Error fetching product details:", error);
      toast.error("Failed to fetch product details");
    }
  };

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current products for the page
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredProducts.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Product List</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={() => setIsAddModalOpen(true)}
        >
          Add Product
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Color
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {currentProducts.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 text-sm text-gray-100">
                  {product.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">
                  {product.data?.price ? `$${product.data?.price}` : "--"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">
                  {product.data?.color || "--"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-300 flex gap-4">
                  <button
                    className="text-blue-400 hover:text-blue-300"
                    onClick={() => handleViewDetails(product.id)}
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    className="text-red-400 hover:text-red-300"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center space-x-1 dark:text-gray-800 mt-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md dark:bg-gray-50 dark:border-gray-100"
        >
          <svg
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={`inline-flex items-center justify-center w-8 h-8 text-sm font-semibold border rounded shadow-md dark:bg-gray-50 ${
              currentPage === number
                ? "dark:text-violet-600 dark:border-violet-600"
                : "dark:text-gray-800 dark:border-gray-100"
            }`}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === pageNumbers.length}
          className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md dark:bg-gray-50 dark:border-gray-100"
        >
          <svg
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <Modal
          title="Add New Product"
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleAddProduct}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300">Name</label>
              <input
                type="text"
                className="bg-gray-700 text-white placeholder-gray-400 rounded-lg w-full p-2 mt-1"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300">Color</label>
              <input
                type="text"
                className="bg-gray-700 text-white placeholder-gray-400 rounded-lg w-full p-2 mt-1"
                placeholder="Color"
                value={newProduct.color}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, color: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300">Generation</label>
              <input
                type="text"
                className="bg-gray-700 text-white placeholder-gray-400 rounded-lg w-full p-2 mt-1"
                placeholder="Generation"
                value={newProduct.generation}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, generation: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300">Price</label>
              <input
                type="text"
                className="bg-gray-700 text-white placeholder-gray-400 rounded-lg w-full p-2 mt-1"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300">Capacity</label>
              <input
                type="text"
                className="bg-gray-700 text-white placeholder-gray-400 rounded-lg w-full p-2 mt-1"
                placeholder="Capacity"
                value={newProduct.capacity}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, capacity: e.target.value })
                }
              />
            </div>
          </div>
        </Modal>
      )}

      {/* View Product Details Modal */}
      {isDetailsModalOpen && selectedProduct && (
        <Modal
          title="Product Details"
          onClose={() => setIsDetailsModalOpen(false)}
        >
          <div>
            <h3 className="text-lg font-semibold">{selectedProduct.name}</h3>
            <p>
              <strong>Color:</strong> {selectedProduct.data?.color}
            </p>
            <p>
              <strong>Generation:</strong> {selectedProduct.data?.generation}
            </p>
            <p>
              <strong>Price:</strong> ${selectedProduct.data?.price}
            </p>
            <p>
              <strong>Capacity:</strong> {selectedProduct.data?.capacity}
            </p>
          </div>
        </Modal>
      )}
    </motion.div>
  );
};

export default ProductsTable;
