// import PropTypes from 'prop-types';
// import { Dialog, Transition } from '@headlessui/react';
// import { Fragment, useState } from 'react';


// const AddProductModal = ({ closeModal, isOpen, addProdect}) => {
//   const [product, setproduct] = useState({
//     name: '',
//     data: {},
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name.startsWith('data.')) {
//       const key = name.split('.')[1]; // Extract key for the data object
//       setproduct((prev) => ({
//         ...prev,
//         data: {
//           ...prev.data,
//           [key]: value,
//         },
//       }));
//     } else {
//       setproduct((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const mealWithAdminInfo = {
//       ...product,
      
//     };

//     addProdect(mealWithAdminInfo);
//     closeModal();
//   };

//   return (
//     <Transition appear show={isOpen} as={Fragment}>
//       <Dialog as="div" className="relative z-10" onClose={closeModal}>
//         <Transition.Child
//           as={Fragment}
//           enter="ease-out duration-300"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leave="ease-in duration-200"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <div className="fixed inset-0 bg-black bg-opacity-25" />
//         </Transition.Child>

//         <div className="fixed inset-0 overflow-y-auto">
//           <div className="flex min-h-full items-center justify-center p-4 text-center">
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0 scale-95"
//               enterTo="opacity-100 scale-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100 scale-100"
//               leaveTo="opacity-0 scale-95"
//             >
//               <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
//                 <Dialog.Title
//                   as="h3"
//                   className="text-lg font-medium leading-6 text-gray-900 text-center"
//                 >
//                   Add Product
//                 </Dialog.Title>

//                 <form onSubmit={handleSubmit}>
//                   <div className="mt-4">
//                     <label className="block text-sm font-medium text-gray-700">
//                       Product Name
//                     </label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={product.name}
//                       onChange={handleChange}
//                       className="w-full mt-1 p-2 border border-gray-300 rounded-md"
//                       required
//                     />
//                   </div>

//                   <div className="mt-4">
//                     <label className="block text-sm font-medium text-gray-700">
//                       Color
//                     </label>
//                     <input
//                       type="text"
//                       name="data.color"
//                       value={product.data.color || ''}
//                       onChange={handleChange}
//                       className="w-full mt-1 p-2 border border-gray-300 rounded-md"
//                     />
//                   </div>

//                   <div className="mt-4">
//                     <label className="block text-sm font-medium text-gray-700">
//                       Capacity
//                     </label>
//                     <input
//                       type="text"
//                       name="data.capacity"
//                       value={product.data.capacity || ''}
//                       onChange={handleChange}
//                       className="w-full mt-1 p-2 border border-gray-300 rounded-md"
//                     />
//                   </div>

//                   <div className="mt-4">
//                     <label className="block text-sm font-medium text-gray-700">
//                       Price
//                     </label>
//                     <input
//                       type="number"
//                       name="data.price"
//                       value={product.data.price || ''}
//                       onChange={handleChange}
//                       className="w-full mt-1 p-2 border border-gray-300 rounded-md"
//                     />
//                   </div>

//                   <div className="mt-6">
//                     <button
//                       type="submit"
//                       className="w-full px-4 py-2 bg-orange-600 text-white font-semibold rounded-md"
//                     >
//                       Add Product
//                     </button>
//                   </div>
//                 </form>

//                 <div className="mt-4">
//                   <button
//                     type="button"
//                     className="w-full px-4 py-2 text-gray-500"
//                     onClick={closeModal}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </Dialog.Panel>
//             </Transition.Child>
//           </div>
//         </div>
//       </Dialog>
//     </Transition>
//   );
// };

// AddProductModal.propTypes = {
//   closeModal: PropTypes.func.isRequired,
//   isOpen: PropTypes.bool.isRequired,
//   addMeal: PropTypes.func.isRequired,
//   adminName: PropTypes.string.isRequired,
// };

// export default AddProductModal;
