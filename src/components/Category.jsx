import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Category() {
  const { categoryName } = useParams();
  const navigate = useNavigate(); // For navigation on card click
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/categories/${categoryName}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        console.log(data); // Debug response
        if (data.materials) {
          setMaterials(data.materials); // Update for materials
        } else {
          setError("No materials found for this category.");
        }
      } catch (err) {
        console.error('Error fetching materials:', err);
        setError('Failed to load materials.');
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, [categoryName]);

  
  const handleCardClick = (materialId) => {
    navigate(`/materials/details/${materialId}`);
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-8">{error}</div>;

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-center">
        {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
      </h2>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {materials.map((material) => (
          <div
            key={material.id}
            onClick={() => handleCardClick(material.id)} 
            className="max-w-xs mx-auto rounded-lg border p-4 shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
          >
            <img
              src={material.image || "https://via.placeholder.com/150"}
              alt={material.name}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="text-xl font-semibold mt-4">{material.name}</h3>
            <p className="mt-2 text-sm">{material.description}</p>
            <p className="mt-2 text-sm text-gray-500">Price: ${material.price}</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                alert(`Added ${material.name} to cart!`);
              }}
              className="mt-4 block bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-500"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
