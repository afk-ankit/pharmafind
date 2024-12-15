import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import useInventory from "../hooks/useInventory";

const Inventory = () => {
  const { data: inventory, isLoading } = useInventory();
  return (
    <div>
      <Navbar />
      <main className="p-8">
        <h1 className="text-4xl font-bold mb-8">Inventory</h1>
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
                <p className="text-gray-700">Price: ${item.price}</p>
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
