import { Globe, Loader2, MapPin } from "lucide-react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import useSearch from "../hooks/useSearch";
import { POST } from "../utils/axios";

const SearchResults = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentSearch, setCurrentSearch] = useState({
    medicine: searchParams.get("medicine") || "",
    pincode: searchParams.get("pincode") || "",
  });

  const { data: searchResults, isLoading } = useSearch({
    medicine: currentSearch.medicine,
    pinCode: currentSearch.pincode,
  });

  const handleNewSearch = (e) => {
    e.preventDefault();
    navigate(
      `/search?medicine=${currentSearch.medicine}&pincode=${currentSearch.pincode}`,
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <form
          onSubmit={handleNewSearch}
          className="search-form bg-white shadow-md rounded-lg p-6 mb-6"
        >
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="medicine"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Medicine Name
              </label>
              <input
                id="medicine"
                type="text"
                placeholder="e.g., Paracetamol"
                value={currentSearch.medicine}
                onChange={(e) =>
                  setCurrentSearch((prev) => ({
                    ...prev,
                    medicine: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="pincode"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Pincode
              </label>
              <input
                id="pincode"
                type="text"
                placeholder="e.g., 560001"
                value={currentSearch.pincode}
                onChange={(e) =>
                  setCurrentSearch((prev) => ({
                    ...prev,
                    pincode: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Search
            </button>
          </div>
        </form>

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="animate-spin text-blue-500" size={48} />
            <p className="mt-4 text-gray-600">Searching pharmacies...</p>
          </div>
        )}

        {!isLoading && (
          <div className="space-y-6">
            {searchResults?.offline.length > 0 && (
              <div className="bg-white shadow-md rounded-lg p-6">
                <div className="flex items-center border-b pb-3 mb-4">
                  <MapPin className="mr-2 text-blue-500" size={24} />
                  <h2 className="text-xl font-semibold text-gray-800">
                    Nearby Pharmacies
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {searchResults.offline.map((result, key) => (
                    <OfflineCard key={key} result={result} />
                  ))}
                </div>
              </div>
            )}

            {searchResults.online.length > 0 && (
              <div className="bg-white shadow-md rounded-lg p-6">
                <div className="flex items-center border-b pb-3 mb-4">
                  <Globe className="mr-2 text-green-500" size={24} />
                  <h2 className="text-xl font-semibold text-gray-800">
                    Online Pharmacies
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {searchResults.online.map((result, key) => (
                    <OnlineCard
                      result={result}
                      key={key}
                      searchId={searchResults.searchId}
                    />
                  ))}
                </div>
              </div>
            )}

            {searchResults.offline.length === 0 &&
              searchResults.online.length === 0 && (
                <div className="bg-white shadow-md rounded-lg p-12 text-center">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    No Results Found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Try searching for Paracetamol in pincode 560001
                  </p>
                </div>
              )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

const OfflineCard = ({ result }) => {
  return (
    <div className="bg-gray-100 rounded-md shadow-md p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div>
            <h4 className="text-lg font-bold text-blue-600">
              {result.Pharmacy.name}
            </h4>
            <p className="text-xs text-gray-500">{result.Pharmacy.location}</p>
          </div>
        </div>
        <div className="text-green-500 font-medium">₹{result.price}</div>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <div className="text-gray-500 text-xs">Qty: {result.quantity}</div>
        <div className="text-gray-500 text-xs">
          Product: {result.Product.name} by {result.Product.manufacturer}
        </div>
      </div>
    </div>
  );
};

const OnlineCard = ({ result, searchId }) => {
  return (
    <a
      href={result.link}
      onClick={async () => {
        try {
          await POST("/redirects", {
            url: result.link,
            searchId,
          });
        } catch (error) {
          console.log(error.message);
        }
      }}
    >
      <div className="bg-gray-100 rounded-md shadow-md p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h4 className="text-sm font-medium text-gray-700">{result.name}</h4>
          </div>
          <div className="text-green-500 font-medium">₹{result.price}</div>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img
              src={result.image || "https://via.placeholder.com/100"}
              alt="No image"
              className="w-12 h-12 object-contain"
            />
            <div>
              <p className="text-xs text-gray-500">{result.packSize}</p>
              <p className="text-xs text-gray-500">{result.deliveryDate}</p>
            </div>
          </div>
          <div className="text-gray-500 text-xs">{result.pharmacy}</div>
        </div>
      </div>
    </a>
  );
};

export default SearchResults;
