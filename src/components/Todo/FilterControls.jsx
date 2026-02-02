import React from "react";

const FilterControls = ({ filter, setFilter }) => {
  const filters = ["all", "active", "completed"];
  return (
    <div className="ml-4">
      {filters.map((f) => (
        <button
          key={f}
          className={`mx-1 px-2 py-1 rounded text-xs ${
            filter === f
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setFilter(f)}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default FilterControls;
