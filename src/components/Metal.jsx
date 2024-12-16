import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Steel from "../assets/images/Steel.jpeg";
import Aluminium from "../assets/images/Aluminium.jpg";
import Copper from "../assets/images/Copper.jpg";
import Iron from "../assets/images/Iron.jpg";
import MaterialForm from './MaterialForm';

const metals = [
  { id: 1, name: 'Steel', description: 'Durable and versatile, used in a variety of applications.', imageUrl: Steel, price: '$120 per unit', slug: 'steel', category: 'Metal', subcategory: 'Steel' },
  { id: 2, name: 'Aluminum', description: 'Lightweight and corrosion-resistant material for construction.', imageUrl: Aluminium, price: '$100 per unit', slug: 'aluminum', category: 'Metal', subcategory: 'Aluminum' },
  { id: 3, name: 'Copper', description: 'Excellent electrical conductivity, ideal for electrical wiring.', imageUrl: Copper, price: '$150 per unit', slug: 'copper', category: 'Metal', subcategory: 'Cast Iron' },
  { id: 4, name: 'Iron', description: 'Strong and widely used in building and infrastructure projects.', imageUrl: Iron, price: '$90 per unit', slug: 'iron', category: 'Metal', subcategory: 'Cast Iron' },
];

export default function Metal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [materialToEdit, setMaterialToEdit] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleEditClick = (material) => {
    setMaterialToEdit(material);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setMaterialToEdit(null);
  };

  const handleSave = async (data) => {
    try {
      console.log('Saving material:', data);
      setMessage({ type: 'success', text: 'Material saved successfully!' });
      setTimeout(() => setMessage({}), 3000); // Clear message after 3 seconds
      closeModal();
    } catch (error) {
      console.error('Error saving material:', error);
      setMessage({ type: 'error', text: 'Error in saving the material.' });
    }
  };

  return (
    <div className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-semibold text-gray-800">Our Premium Metal Materials</h2>
        <p className="mt-4 text-lg text-gray-600">
          Discover high-quality metal materials ideal for your construction needs.
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {metals.map((metal) => (
          <div
            key={metal.id}
            className="group relative bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
          >
            <img
              src={metal.imageUrl}
              alt={metal.name}
              className="w-full h-56 object-cover group-hover:opacity-75"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800">{metal.name}</h3>
              <p className="mt-2 text-sm text-gray-600">{metal.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={() => handleEditClick(metal)}
                  className="bg-indigo-600 text-white hover:bg-gray-200 hover:border-2 hover:border-solid hover:border-indigo-600 hover:text-indigo-600 font-semibold px-4 py-1 rounded-md"
                >
                  Edit
                </button>
                <div className="text-sm text-gray-400">{metal.price}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Section */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              ✕
            </button>
            <MaterialForm materialToEdit={materialToEdit} onSave={handleSave} />
          </div>
        </div>
      )}

      {/* Notification Section */}
      {message.text && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg shadow-lg ${
            message.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}
