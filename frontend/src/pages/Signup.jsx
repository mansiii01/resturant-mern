import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react"; 
import {toast} from "react-hot-toast"
import { AppContext } from "../context/AppContext";
const Signup = () => {

  const {navigate,axios,loading,setLoading}=useContext(AppContext)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleSubmit =async (e) => {
        e.preventDefault();
        try {
          setLoading(true);
          const {data}=await axios.post("/api/auth/register",formData);
          if(data.success){
            toast.success(data.message);
            navigate("/login")
          }else{
            toast.error(data.message);
          }
        } catch (error) {
          toast.error(data.response.data.message);
        }   
        finally{
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
            className="sm:w-96 w-full text-center bg-gray-900 border border-gray-800 rounded-2xl px-8">

            <h1 className="text-white text-3xl mt-10 font-medium">Register</h1>

            <p className="text-gray-400 text-sm mt-2">
              Please sign up to continue
            </p>

            {/* Name */}
            <div className="flex items-center mt-6 w-full bg-gray-800 border border-gray-700 h-12 rounded-full pl-6 gap-2">
                <User size={18} className="text-gray-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="w-full bg-transparent text-white outline-none"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
            </div>

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
              className="mt-4 w-full h-11 rounded-full text-white bg-orange-600 hover:bg-orange-500 cursor-pointer">
              {loading ? "Loading..." : "Register"}
            </button>

            <p className="text-gray-400 text-sm mt-3 mb-6">
                Already have an account?
                <Link to="/login" className="text-indigo-500 ml-1">
                  Login
                </Link>
            </p>

        </form>
      </div>
    );
};

export default Signup;