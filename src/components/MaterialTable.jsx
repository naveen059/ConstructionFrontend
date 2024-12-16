import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';

const MaterialTable = ({ onEdit, onDelete }) => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedDescription, setExpandedDescription] = useState(null);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/materials')
      .then((response) => {
        setMaterials(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Failed to load materials');
        setLoading(false);
      });
  }, []);

  const handleDescriptionToggle = (materialId) => {
    setExpandedDescription((prev) => (prev === materialId ? null : materialId));
  };

  if (loading) {
    return <div className="text-center py-8 text-lg text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-lg text-red-600">{error}</div>;
  }

  return (
    <div className="overflow-x-auto mt-8 px-4">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Machine No</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Category</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Subcategory</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Description</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Price</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {materials.map((material) => (
            <tr key={material.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm font-medium text-gray-900">
                MACHINE-{material.id}
              </td>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{material.name}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{material.category}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{material.sub_category || 'N/A'}</td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {material.description && material.description.length > 200 ? (
                  <>
                    {expandedDescription === material.id
                      ? material.description
                      : `${material.description.substring(0, 200)}...`}
                    <button
                      onClick={() => handleDescriptionToggle(material.id)}
                      className="text-indigo-600 hover:text-indigo-800 ml-2 text-sm"
                    >
                      {expandedDescription === material.id ? 'Read Less' : 'Read More'}
                    </button>
                  </>
                ) : (
                  material.description || 'No description available'
                )}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {"$"+material.price}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 flex space-x-3">
                <button
                  onClick={() => onEdit(material)}
                  className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500"
                >
                  <PencilIcon className="w-4 h-4 mr-1" /> Edit
                </button>
                <button
                  onClick={() => onDelete(material.id)}
                  className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-500"
                >
                  <TrashIcon className="w-4 h-4 mr-1" /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MaterialTable;
