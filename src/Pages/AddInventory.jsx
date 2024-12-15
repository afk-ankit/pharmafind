import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useInventoryMutation from "../hooks/useInventoryMutation";

const inventorySchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  manufacturer: z.string().min(1, { message: "Manufacturer is required" }),
  expiry: z.string().refine((date) => !isNaN(new Date(date).getTime()), {
    message: "Invalid expiry date",
  }),
  manufactured: z.string().refine((date) => !isNaN(new Date(date).getTime()), {
    message: "Invalid manufactured date",
  }),
  qty: z
    .number()
    .min(1, { message: "Quantity must be at least 1" })
    .or(z.string().regex(/^\d+$/, "Quantity must be a number")),
  price: z
    .number()
    .min(0.01, { message: "Price must be greater than 0" })
    .or(z.string().regex(/^\d+(\.\d{1,2})?$/, "Price must be a valid number")),
});
const AddInventory = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(inventorySchema),
  });

  const { mutate } = useInventoryMutation();

  const onSubmit = (data) => {
    mutate(data);
  };
  return (
    <div>
      <Navbar />
      <main className="p-8">
        <h1 className="text-4xl font-bold">Add Inventory</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 max-w-lg mx-auto bg-white shadow p-8 rounded"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              {...register("name")}
              className="mt-1 w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter item name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Manufacturer */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Manufacturer
            </label>
            <input
              type="text"
              {...register("manufacturer")}
              className="mt-1 w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter manufacturer name"
            />
            {errors.manufacturer && (
              <p className="text-red-500 text-sm mt-1">
                {errors.manufacturer.message}
              </p>
            )}
          </div>

          {/* Manufactured Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Manufactured Date
            </label>
            <input
              type="date"
              {...register("manufactured")}
              className="mt-1 w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.manufactured && (
              <p className="text-red-500 text-sm mt-1">
                {errors.manufactured.message}
              </p>
            )}
          </div>
          {/* Expiry Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Expiry Date
            </label>
            <input
              type="date"
              {...register("expiry")}
              className="mt-1 w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.expiry && (
              <p className="text-red-500 text-sm mt-1">
                {errors.expiry.message}
              </p>
            )}
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              {...register("qty")}
              className="mt-1 w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter quantity"
            />
            {errors.qty && (
              <p className="text-red-500 text-sm mt-1">{errors.qty.message}</p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              step="0.01"
              {...register("price")}
              className="mt-1 w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter price"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
            >
              Add Inventory
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default AddInventory;
