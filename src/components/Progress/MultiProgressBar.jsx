import React from "react";
import { useState } from "react";

const MultiProgressBar = () => {
  const [values, setValues] = useState([20, 40, 60]);

  const handleChange = (index, value) => {
    let v = Number(value);
    if (v < 0) v = 0;
    if (v > 100) v = 100;

    const updated = [...values];
    updated[index] = v;
    setValues(updated);
  };

  const average = values.reduce((sum, v) => sum + v, 0) / values.length;

  const getColor = (val) => {
    if (val < 40) return "bg-red-500";
    if (val > 70) return "bg-green-500";
    return "bg-yellow-500";
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="text-xl font-semibold">Progress Bar</h2>

      <div className="w-full bg-gray-200 h-4 rounded">
        <div
          className={`h-4 rounded ${getColor(average)}`}
          style={{ width: `${average}%` }}
        />
      </div>

      {values.map((val, index) => (
        <div key={index} className="space-y-1">
          <input
            type="number"
            value={val}
            onChange={(e) => handleChange(index, e.target.value)}
            className="w-full border p-1 rounded"
          />

          <div className="w-full bg-gray-200 h-2 rounded">
            <div
              className={`h-2 rounded ${getColor(val)}`}
              style={{ width: `${val}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MultiProgressBar;
