import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function SignInPage() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User signed in:", formData);
    navigate("/"); // Redirect to homepage after signing in
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 text-sm mb-1">Name</label>
            <TextField
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm mb-1">Email Address</label>
            <TextField
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm mb-1">Password</label>
            <TextField
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
              placeholder="Enter your password"
            />
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Sign In
          </Button>
        </form>
        <p className="text-center text-gray-600 text-sm mt-4">
          Don't have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign up here</a>
        </p>
      </div>
    </div>
  );
}
