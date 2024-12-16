import React, { useState, useEffect } from "react";
import MaterialTable from "./MaterialTable";
import { useNavigate } from "react-router-dom";

const ProductsTable = () => {
  const [materials, setMaterials] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/materials/");
      const data = await response.json();
      setMaterials(data);
    } catch (error) {
      console.error("Error fetching materials:", error);
    }
  };

  const handleEdit = (material) => {
    navigate("/material-form", { state: { materialToEdit: material } });
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/materials/${id}/`, {
        method: "DELETE",
      });
      if (response.ok) {
        setMaterials(materials.filter((material) => material.id !== id));
      } else if (response.status === 404) {
        alert("Material not found. It may have already been deleted.");
      } else {
        console.error("Failed to delete material:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting material:", error);
    }
  };



  return (
    <div className="container mx-auto p-4">
      <h2 className="mt-3 text-center text-4xl font-semibold mb-6">
        Products Table
      </h2>
      <MaterialTable
        materials={materials}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ProductsTable;
