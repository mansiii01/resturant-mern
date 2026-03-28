import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { CircleX } from "lucide-react";
import toast from "react-hot-toast";

const Categories = () => {
  const { categories, setCategories, axios } = useContext(AppContext);

  const deleteCategory = async (id) => {
    try {
      const { data } = await axios.delete(`/api/category/delete/${id}`);

      if (data.success) {
        toast.success(data.message);

        // ✅ Update UI instantly (NO fetch error)
        setCategories((prev) => prev.filter((cat) => cat._id !== id));

      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="py-4">
      <h1 className="text-3xl font-bold mb-3">All Categories</h1>

      <div className="border border-gray-400 max-w-5xl mx-auto p-3">
        {/* Header */}
        <div className="grid grid-cols-3 font-semibold text-gray-700">
          <div>Image</div>
          <div>Name</div>
          <div>Action</div>
        </div>

        <hr className="w-full my-4 text-gray-200" />

        <ul>
          {categories?.map((item) => (
            <li key={item._id}>
              <div className="grid grid-cols-3 items-center mb-4">
                
                {/* Image */}
                <div className="flex items-center gap-2 max-w-md">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                </div>

                {/* Name */}
                <p>{item.name}</p>

                {/* Delete */}
                <p
                  className="text-red-600 cursor-pointer hover:scale-110 transition"
                  onClick={() => deleteCategory(item._id)}
                >
                  <CircleX />
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Categories;