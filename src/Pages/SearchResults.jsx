import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, Loader2, MapPin, Globe } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/SearchResults.css';

// Mock data structure to simulate medicine availability
const medicineDatabase = [
  // Offline Pharmacies
  {
    id: 1,
    title: 'Paracetamol',
    description: 'Fever and pain relief medicine',
    type: 'offline',
    pharmacyName: 'Local Pharmacy',
    price: 5.99,
    pincode: '560001',
    address: '123 Main Street, Bangalore'
  },
  {
    id: 2,
    title: 'Paracetamol',
    description: 'Fever and pain relief medicine',
    type: 'offline',
    pharmacyName: 'City Medicals',
    price: 6.50,
    pincode: '560001',
    address: '456 Park Road, Bangalore'
  },
  {
    id: 3,
    title: 'Paracetamol',
    description: 'Fever and pain relief medicine',
    type: 'online',
    pharmacyName: 'MedEasy',
    price: 4.99,
    pincode: '560001',
    websiteUrl: 'https://medeasy.com'
  },
  {
    id: 4,
    title: 'Paracetamol',
    description: 'Fever and pain relief medicine',
    type: 'online',
    pharmacyName: 'QuickMeds',
    price: 5.49,
    pincode: '560001',
    websiteUrl: 'https://quickmeds.com'
  }
];

const SearchResults = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [currentSearch, setCurrentSearch] = useState({
    medicine: searchParams.get('medicine') || '',
    pincode: searchParams.get('pincode') || '',
    includeOnline: searchParams.get('online') === 'true'
  });

  useEffect(() => {
    if (currentSearch.medicine && currentSearch.pincode) {
      performSearch();
    }
  }, [searchParams]);

  const performSearch = () => {
    setIsLoading(true);

    // Filter results based on medicine name and pincode
    const filteredResults = medicineDatabase.filter(
      (result) =>
        result.title.toLowerCase() === currentSearch.medicine.toLowerCase() &&
        result.pincode === currentSearch.pincode &&
        (currentSearch.includeOnline ? true : result.type === 'offline')
    );

    // Sort results by price
    const sortedResults = filteredResults.sort((a, b) => a.price - b.price);

    // Simulate API delay
    setTimeout(() => {
      setSearchResults(sortedResults);
      setIsLoading(false);
    }, 1000);
  };

  const handleNewSearch = (e) => {
    e.preventDefault();

    // Navigate to search with new parameters
    navigate(
      `/search?medicine=${currentSearch.medicine}&pincode=${currentSearch.pincode}&online=${currentSearch.includeOnline}`
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="pt-20 flex-grow container mx-auto px-4">
        <div className="search-results-container">
          {/* Header Section */}
          <header className="search-header">
            <div className="header-content">
              <h1>Medicine Availability</h1>
              <div className="search-info">
                <span className="results-count">
                  Found {searchResults.length} {currentSearch.includeOnline ? 'total' : 'offline'} options
                </span>
                {currentSearch.pincode && (
                  <span className="pincode-info">
                    in {currentSearch.pincode}
                  </span>
                )}
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="search-main">
            {/* Search Bar */}
            <form onSubmit={handleNewSearch} className="search-bar-container">
              <div className="flex gap-4">
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="Search medicines..."
                    value={currentSearch.medicine}
                    onChange={(e) =>
                      setCurrentSearch((prev) => ({
                        ...prev,
                        medicine: e.target.value
                      }))
                    }
                    className="search-input w-full"
                    required
                  />
                </div>
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="Enter pincode"
                    value={currentSearch.pincode}
                    onChange={(e) =>
                      setCurrentSearch((prev) => ({
                        ...prev,
                        pincode: e.target.value
                      }))
                    }
                    className="search-input w-full"
                    pattern="\d{6}"
                    required
                  />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <label className="inline-flex items-center mr-4">
                  <input
                    type="checkbox"
                    checked={currentSearch.includeOnline}
                    onChange={() =>
                      setCurrentSearch((prev) => ({
                        ...prev,
                        includeOnline: !prev.includeOnline
                      }))
                    }
                    className="form-checkbox"
                  />
                  <span className="ml-2">Include Online Results</span>
                </label>
                <button type="submit" className="search-btn ml-auto">
                  Search
                </button>
              </div>
            </form>

            {/* Loading State */}
            {isLoading && (
              <div className="loading-container">
                <Loader2 className="loading-spinner animate-spin" />
              </div>
            )}

            {/* Results Grid */}
            {!isLoading && (
              <div className="results-grid grid gap-4">
                {searchResults.map((result) => (
                  <div 
                    key={result.id} 
                    className={`result-card ${
                      result.type === 'offline' 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-blue-500 bg-blue-50'
                    }`}
                  >
                    <div className="card-content">
                      <div className="flex justify-between">
                        <span className="category-tag flex items-center">
                          {result.type === 'offline' ? (
                            <MapPin className="mr-2 w-4 h-4" />
                          ) : (
                            <Globe className="mr-2 w-4 h-4" />
                          )}
                          {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                        </span>
                        <span className="product-price font-bold">
                          ${result.price.toFixed(2)}
                        </span>
                      </div>
                      <h2 className="product-title mt-2">{result.title}</h2>
                      <p className="product-description">{result.description}</p>
                      <div className="card-footer mt-4">
                        <div className="pharmacy-info">
                          <strong>{result.pharmacyName}</strong>
                          {result.type === 'offline' ? (
                            <p>{result.address}</p>
                          ) : (
                            <a 
                              href={result.websiteUrl} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-blue-600 hover:underline"
                            >
                              Visit Website
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!isLoading && searchResults.length === 0 && (
              <div className="empty-state text-center p-8 bg-gray-100 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">No Results Found</h3>
                <div>
                  <p className="mb-2">Try searching for:</p>
                  <ul className="list-disc list-inside">
                    <li>Medicine: Paracetamol</li>
                    <li>Pincode: 560001</li>
                  </ul>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchResults;