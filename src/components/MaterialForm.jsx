import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const MaterialForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const materialToEdit = state?.materialToEdit;

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const categoryOptions = ["Metal", "Wood", "Concrete", "Plastic", "Glass"];
  const subcategoryOptions = {
    Metal: ["Sheet Metal", "Cast Iron", "Steel", "Aluminum"],
    Wood: ["Hardwood", "Plywood", "Softwood"],
    Concrete: ["Reinforced Concrete", "Precast"],
    Plastic: ["Thermoplastic", "Polycarbonate"],
    Glass: ["Tempered Glass", "Laminated Glass"],
  };

  const selectedCategory = watch("category");

  useEffect(() => {
    if (materialToEdit) {
      Object.keys(materialToEdit).forEach((key) => setValue(key, materialToEdit[key]));
    } else {
      reset();
    }
  }, [materialToEdit, setValue, reset]);

  const onSubmit = async (data) => {
    try {
      if (materialToEdit) {
        await axios.put(
          `http://127.0.0.1:8000/api/materials/${materialToEdit.id}/`,
          data
        );
      } else {
        await axios.post("http://127.0.0.1:8000/api/materials/", data);
      }
      navigate("/products-table");
    } catch (error) {
      console.error("Error saving material:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">
        {materialToEdit ? "Edit Material" : "Add Material"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Category</label>
          <select
            {...register("category", { required: "Category is required" })}
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="">Select a category</option>
            {categoryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.category && <p className="text-red-500">{errors.category.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Subcategory</label>
          <Controller
            name="sub_category"
            control={control}
            rules={{ required: "Subcategory is required" }}
            render={({ field }) => (
              <select
                {...field}
                className="w-full border border-gray-300 p-2 rounded"
                disabled={!selectedCategory}
              >
                <option value="">Select a subcategory</option>
                {selectedCategory &&
                  subcategoryOptions[selectedCategory]?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
              </select>
            )}
          />
          {errors.sub_category && (
            <p className="text-red-500">{errors.sub_category.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full border border-gray-300 p-2 rounded"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            {...register("description", { required: "Description is required" })}
            className="w-full border border-gray-300 p-2 rounded"
          ></textarea>
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Price</label>
          <input
            type="number"
            {...register("price", { required: "Price is required" })}
            className="w-full border border-gray-300 p-2 rounded"
          />
          {errors.price && <p className="text-red-500">{errors.price.message}</p>}
        </div>
        <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">
          Save
        </button>
      </form>
    </div>
  );
};

export default MaterialForm;
