// src/pages/SearchResults.jsx
import { Globe, Loader2, MapPin, Truck } from "lucide-react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import useSearch from "../hooks/useSearch";
import "../styles/SearchResults.css";

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

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="animate-spin text-blue-500" size={48} />
            <p className="mt-4 text-gray-600">Searching pharmacies...</p>
          </div>
        )}

        {/* Results Section */}
        {!isLoading && (
          <div className="space-y-6">
            {/* Offline Results Section */}
            {searchResults?.offline.length > 0 && (
              <div className="bg-white shadow-md rounded-lg p-6">
                <div className="flex items-center border-b pb-3 mb-4">
                  <MapPin className="mr-2 text-blue-500" size={24} />
                  <h2 className="text-xl font-semibold text-gray-800">
                    Nearby Pharmacies
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {searchResults.offline.slice(0, 5).map((result) => (
                    <ResultCard
                      key={result.id}
                      result={result}
                      type="offline"
                    />
                  ))}
                </div>
                {5 < searchResults.offline.length && (
                  <button className="mt-4 px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                    More
                  </button>
                )}
              </div>
            )}

            {/* Online Results Section */}
            {searchResults.online.length > 0 && (
              <div className="bg-white shadow-md rounded-lg p-6">
                <div className="flex items-center border-b pb-3 mb-4">
                  <Globe className="mr-2 text-green-500" size={24} />
                  <h2 className="text-xl font-semibold text-gray-800">
                    Online Pharmacies
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {searchResults.online.slice(0, 5).map((result) => (
                    <ResultCard key={result.id} result={result} type="online" />
                  ))}
                </div>
                {5 < searchResults.online.length && (
                  <button className="mt-4 px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                    More
                  </button>
                )}
              </div>
            )}

            {/* Empty State */}
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

export default SearchResults;

const ResultCard = ({ result, type }) => (
  <div
    className={`result-card ${
      type === "offline"
        ? "result-card__header--offline"
        : "result-card__header--online"
    }`}
  >
    <div className="result-card__header">
      <div className="flex items-center">
        {type === "offline" ? (
          <MapPin className="result-card__detail-icon" size={20} />
        ) : (
          <Globe className="result-card__detail-icon" size={20} />
        )}
        <h3 className="result-card__pharmacy-name">{result.name}</h3>
        <Truck
          className="ml-2 text-gray-600"
          size={16}
          title="Home Delivery Available"
        />
      </div>
      <div className="result-card__price">${result.price}</div>
    </div>

    {/* <div className="result-card__content"> */}
    {/*   <div className="mb-2"> */}
    {/*     <h4 className="text-sm font-medium text-gray-700">{result.title}</h4> */}
    {/*     <p className="text-xs text-gray-500 mt-1">{result.description}</p> */}
    {/*   </div> */}
    {/**/}
    {/*   <div className="result-card__details"> */}
    {/*     <div className="result-card__detail-item"> */}
    {/*       <PhoneCall className="result-card__detail-icon" size={12} /> */}
    {/*       {result?.contact} */}
    {/*     </div> */}
    {/*     <div className="result-card__detail-item"> */}
    {/*       <MapPin className="result-card__detail-icon" size={12} /> */}
    {/*       {result?.distance} */}
    {/*     </div> */}
    {/*     <div */}
    {/*       className={` */}
    {/*         inline-block px-2 py-1 rounded  */}
    {/*         ${ */}
    {/*           result?.stock === "Available" */}
    {/*             ? "bg-green-100 text-green-800" */}
    {/*             : "bg-yellow-100 text-yellow-800" */}
    {/*         } */}
    {/*       `} */}
    {/*     > */}
    {/*       {result?.stock} */}
    {/*     </div> */}
    {/*   </div> */}
    {/* </div> */}
  </div>
);
