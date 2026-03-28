import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import { ShoppingCart, UserCircle, Calendar, Package, LogOut } from "lucide-react";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const { navigate, user, setUser, axios } = useContext(AppContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const logout = async () => {
    try {
      const { data } = await axios.post("/api/auth/logout");

      if (data.success) {
        setUser(null);
        toast.success(data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <nav className="bg-cyan-50 shadow-md sticky top-0 z-50 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/">
            <img src="./logo.png" alt="logo" className="w-32" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
            <Link to="/menu" className="text-gray-700 hover:text-blue-600 font-medium">Menus</Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 font-medium">Contact</Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">

            {/* Cart */}
            <button
              onClick={() => navigate("/cart")}
              className="relative p-2 hover:bg-gray-100 rounded-lg"
            >
              <ShoppingCart size={22} />
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                3
              </span>
            </button>

            {/* Profile / Login */}
            <div className="hidden md:block">
              {user ? (

                // ✅ FIX: continuous hover area
                <div
                  className="relative pb-2" // 👈 invisible bridge
                  onMouseEnter={() => setIsProfileOpen(true)}
                  onMouseLeave={() => setIsProfileOpen(false)}
                >

                  {/* Icon */}
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <UserCircle size={30} />
                  </button>

                  {/* Dropdown */}
                  {isProfileOpen && (
                    <div className="absolute right-0 top-full w-48 bg-white rounded-lg shadow-lg py-2 border-gray-50">

                      <Link
                        to="/my-bookings"
                        className="flex items-center px-4 py-2 hover:bg-gray-100"
                      >
                        <Calendar size={18} className="mr-3" />
                        My Bookings
                      </Link>

                      <Link
                        to="/my-orders"
                        className="flex items-center px-4 py-2 hover:bg-gray-100"
                      >
                        <Package size={18} className="mr-3" />
                        My Orders
                      </Link>

                      <button
                        onClick={logout}
                        className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50"
                      >
                        <LogOut size={18} className="mr-3" />
                        Logout
                      </button>

                    </div>
                  )}

                </div>

              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
                >
                  Login
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              ☰
            </button>

          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-3">

              <Link to="/">Home</Link>
              <Link to="/menu">Menus</Link>
              <Link to="/contact">Contact</Link>

              {user ? (
                <>
                  <Link to="/my-bookings">My Bookings</Link>
                  <Link to="/my-orders">My Orders</Link>

                  <button onClick={logout} className="text-red-600 text-left">
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="bg-orange-500 text-white px-4 py-2 rounded"
                >
                  Login
                </button>
              )}

            </div>
          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;