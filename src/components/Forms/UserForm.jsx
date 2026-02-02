import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function UserForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    id: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.id.trim()) {
      newErrors.id = "ID is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    setSubmittedData(formData);
    setFormData({
      name: "",
      email: "",
      id: "",
      password: "",
    });
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="bg-white p-6 rounded-xl shadow-md w-[20vw]">
        <h2 className="text-xl font-semibold mb-4 text-center">User Form</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full border p-2 rounded"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          <div>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border p-2 rounded"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              name="id"
              value={formData.id}
              onChange={handleChange}
              placeholder="ID"
              className="w-full border p-2 rounded"
            />
            {errors.id && <p className="text-red-500 text-sm">{errors.id}</p>}
          </div>

          <div className="relative flex items-center justify-between">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full border p-2 rounded"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-slate-500 hover:text-slate-700"
          >
            {showPassword ? "Hide Password" : "Show Password"}
          </button>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Submit
          </button>
        </form>

        {submittedData && (
          <div className="bg-slate-100 p-3 rounded text-sm">
            <pre>{JSON.stringify(submittedData, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
