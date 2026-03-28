import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react"; 
import { toast } from "react-hot-toast";
import { AppContext } from "../context/AppContext"; // ✅ import this

const Login = () => {
  const { navigate, axios, loading, setLoading, setUser } = useContext(AppContext);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const { data } = await axios.post("/api/auth/login", formData);

      if (data.success) {
        toast.success(data.message);
        setUser(true);
        navigate("/");
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="py-12 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="sm:w-96 w-full text-center bg-gray-900 border border-gray-800 rounded-2xl px-8"
      >

        <h1 className="text-white text-3xl mt-10 font-medium">Login</h1>

        <p className="text-gray-400 text-sm mt-2">
          Please Login in to continue
        </p>

        {/* Email */}
        <div className="flex items-center mt-4 w-full bg-gray-800 border border-gray-700 h-12 rounded-full pl-6 gap-2">
          <Mail size={18} className="text-gray-400" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full bg-transparent text-white outline-none"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div className="flex items-center mt-4 w-full bg-gray-800 border border-gray-700 h-12 rounded-full pl-6 gap-2">
          <Lock size={18} className="text-gray-400" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full bg-transparent text-white outline-none"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="mt-4 w-full h-11 rounded-full text-white bg-orange-600 hover:bg-orange-500 cursor-pointer"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-gray-400 text-sm mt-3 mb-6">
          Don't have an account?
          <Link to="/signup" className="text-indigo-500 ml-1">
            Signup
          </Link>
        </p>

      </form>
    </div>
  );
};

export default Login;