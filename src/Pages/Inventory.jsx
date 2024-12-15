import { Plus } from "lucide-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import useInventory from "../hooks/useInventory";
import { Link } from "react-router-dom";

const Inventory = () => {
  const { data: inventory, isLoading } = useInventory();
  return (
    <div>
      <Navbar />
      <main className="p-8">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-4xl font-bold ">Inventory</h1>
          <Link to={"/add-inventory"}>
            <div className="bg-blue-600 text-white p-2 rounded-full">
              <Plus />
            </div>
          </Link>
        </div>
        {isLoading && <span>Loading...</span>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {inventory && inventory.data.length > 0 ? (
            inventory.data.map((item) => (
              <div
                key={item.id}
                className="border p-4 rounded-lg shadow hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold text-blue-600 mb-2">
                  {item.Product.name}
                </h3>
                <p className="text-gray-700">Product ID: {item.productId}</p>
                <p className="text-gray-700">Price: ₹{item.price}</p>
                <p className="text-gray-700">Quantity: {item.quantity}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No inventory data available.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Inventory;
