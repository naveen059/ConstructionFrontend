import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function MaterialDetail() {
  const { id } = useParams();
  const [material, setMaterial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMaterial = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/material/${id}/`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setMaterial(data);
      } catch (err) {
        console.error('Error fetching material details:', err);
        setError('Failed to load material details.');
      } finally {
        setLoading(false);
      }
    };

    fetchMaterial();
  }, [id]);

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-8">{error}</div>;

  return (
    <div className="p-8">
      {material && (
        <div className="max-w-2xl mx-auto rounded-lg border p-6 shadow-lg">
          <h2 className="text-3xl font-bold">{material.name}</h2>
          <p className="mt-4 text-lg">{material.description}</p>
          <p className="mt-4 text-gray-500">Category: {material.category}</p>
          <p className="mt-4 text-gray-500">Subcategory: {material.sub_category}</p>
          <p className="mt-4 text-gray-800 font-semibold">Price: ${material.price}</p>
          {material.image && (
            <img
              src={material.image}
              alt={material.name}
              className="mt-6 rounded-lg max-w-full"
            />
          )}
        </div>
      )}
    </div>
  );
}

export default MaterialDetail;
