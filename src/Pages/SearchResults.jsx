import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Globe, 
  Loader2, 
  Search, 
  ChevronRight, 
  PhoneCall, 
  Clock, 
  Tag 
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/SearchResults.css';

// Refined Mock Database
const medicineDatabase = [
  {
    id: 1,
    title: 'Paracetamol',
    description: '500mg - Fever and pain relief',
    type: 'offline',
    pharmacyName: 'Local Health Pharmacy',
    price: 5.99,
    pincode: '560001',
    address: '123 Main Street, Bangalore',
    contact: '080-22334455',
    stock: 'Available',
    distance: '2.3 km'
  },
  {
    id: 2,
    title: 'Paracetamol',
    description: '650mg - Extended relief',
    type: 'offline',
    pharmacyName: 'City Medical Store',
    price: 6.50,
    pincode: '560001',
    address: '456 Park Road, Bangalore',
    contact: '080-44556677',
    stock: 'Low Stock',
    distance: '4.5 km'
  },
  {
    id: 3,
    title: 'Paracetamol',
    description: 'Digital Pharmacy Option',
    type: 'online',
    pharmacyName: 'MedEasy Online',
    price: 4.99,
    pincode: '560001',
    websiteUrl: 'https://medeasy.com',
    deliveryTime: '1-2 days',
    discount: '10% OFF'
  },
  {
    id: 4,
    title: 'Paracetamol',
    description: 'Nationwide Delivery',
    type: 'online',
    pharmacyName: 'QuickMeds Digital',
    price: 5.49,
    pincode: '560001',
    websiteUrl: 'https://quickmeds.com',
    deliveryTime: '2-3 days',
    discount: '5% OFF'
  }
];

const SearchResults = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [offlineResults, setOfflineResults] = useState([]);
  const [onlineResults, setOnlineResults] = useState([]);
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
  
    const filteredResults = medicineDatabase.filter(
      (result) =>
        result.title.toLowerCase() === currentSearch.medicine.toLowerCase() &&
        result.pincode === currentSearch.pincode
    );
  
    const offline = filteredResults
      .filter(result => result.type === 'offline')
      .sort((a, b) => a.price - b.price);
  
    // Only add online results if includeOnline is true
    const online = currentSearch.includeOnline 
      ? filteredResults
          .filter(result => result.type === 'online')
          .sort((a, b) => a.price - b.price)
      : [];
  
    setTimeout(() => {
      setOfflineResults(offline);
      setOnlineResults(online);
      setIsLoading(false);
    }, 1000);
  };

  const handleNewSearch = (e) => {
    e.preventDefault();
    navigate(
      `/search?medicine=${currentSearch.medicine}&pincode=${currentSearch.pincode}&online=${currentSearch.includeOnline}`
    );
  };

  const ResultCard = ({ result, type }) => (
    <div className={`
      bg-white border rounded-lg shadow-sm overflow-hidden 
      transition-all duration-300 hover:shadow-md mb-4
      ${type === 'offline' 
        ? 'border-green-200 hover:border-green-300' 
        : 'border-blue-200 hover:border-blue-300'
      }
    `}>
      <div className={`
        px-4 py-3 flex justify-between items-center 
        ${type === 'offline' 
          ? 'bg-green-50' 
          : 'bg-blue-50'
        }
      `}>
        <div className="flex items-center">
          {type === 'offline' ? (
            <MapPin className="text-green-600 mr-2" size={20} />
          ) : (
            <Globe className="text-blue-600 mr-2" size={20} />
          )}
          <h3 className="text-base font-semibold">{result.pharmacyName}</h3>
        </div>
        <div className="flex items-center">
          <span className="font-bold text-lg text-green-700 mr-2">
            ${result.price.toFixed(2)}
          </span>
          <ChevronRight className="text-gray-400" size={16} />
        </div>
      </div>
      
      <div className="px-4 py-3">
        <div className="mb-2">
          <h4 className="text-sm font-medium text-gray-700">{result.title}</h4>
          <p className="text-xs text-gray-500">{result.description}</p>
        </div>

        {type === 'offline' ? (
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center text-gray-600">
              <PhoneCall className="mr-1" size={12} />
              {result.contact}
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="mr-1" size={12} />
              {result.distance}
            </div>
            <div className={`
              inline-block px-2 py-1 rounded 
              ${result.stock === 'Available' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
              }
            `}>
              {result.stock}
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center text-xs">
            <div className="flex items-center text-gray-600">
              <Clock className="mr-1" size={12} />
              {result.deliveryTime}
            </div>
            <div className="flex items-center text-blue-600">
              <Tag className="mr-1" size={12} />
              {result.discount}
            </div>
            <a 
              href={result.websiteUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="
                bg-blue-500 text-white px-2 py-1 rounded 
                hover:bg-blue-600 transition-colors text-xs
              "
            >
              Visit
            </a>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-xl mx-auto">
          {/* Search Form */}
          <form 
            onSubmit={handleNewSearch} 
            className="
              bg-white border border-gray-200 rounded-lg 
              shadow-sm mb-6 p-5
            "
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
                  onChange={(e) => setCurrentSearch(prev => ({
                    ...prev, 
                    medicine: e.target.value
                  }))}
                  className="
                    w-full px-3 py-2 border border-gray-300 
                    rounded-md focus:outline-none focus:ring-2 
                    focus:ring-blue-500
                  "
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
                  onChange={(e) => setCurrentSearch(prev => ({
                    ...prev, 
                    pincode: e.target.value
                  }))}
                  className="
                    w-full px-3 py-2 border border-gray-300 
                    rounded-md focus:outline-none focus:ring-2 
                    focus:ring-blue-500
                  "
                  required
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={currentSearch.includeOnline}
                  onChange={() => setCurrentSearch(prev => ({
                    ...prev, 
                    includeOnline: !prev.includeOnline
                  }))}
                  className="
                    form-checkbox text-blue-600 
                    focus:ring-blue-500
                  "
                />
                <span className="ml-2 text-sm text-gray-700">
                  Include Online Pharmacies
                </span>
              </label>
              <button 
                type="submit" 
                className="
                  bg-blue-500 text-white px-4 py-2 
                  rounded-md hover:bg-blue-600 
                  focus:outline-none focus:ring-2 
                  focus:ring-blue-500 focus:ring-offset-2
                "
              >
                Search
              </button>
            </div>
          </form>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-8">
              <Loader2 className="mx-auto animate-spin text-blue-500" size={48} />
              <p className="mt-4 text-gray-600">Searching pharmacies...</p>
            </div>
          )}

          {/* Results Section */}
          {!isLoading && (
            <div className="space-y-6">
              {/* Offline Results Section */}
              {offlineResults.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm border border-green-100">
                  <div className="bg-green-50 px-4 py-3 border-b border-green-100 flex items-center">
                    <MapPin className="mr-2 text-green-600" size={24} />
                    <h2 className="text-lg font-bold text-green-800">
                      Nearby Pharmacies
                    </h2>
                  </div>
                  <div className="p-4 space-y-4">
                    {offlineResults.map(result => (
                      <ResultCard 
                        key={result.id} 
                        result={result} 
                        type="offline" 
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Online Results Section */}
              {onlineResults.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm border border-blue-100">
                  <div className="bg-blue-50 px-4 py-3 border-b border-blue-100 flex items-center">
                    <Globe className="mr-2 text-blue-600" size={24} />
                    <h2 className="text-lg font-bold text-blue-800">
                      Online Pharmacies
                    </h2>
                  </div>
                  <div className="p-4 space-y-4">
                    {onlineResults.map(result => (
                      <ResultCard 
                        key={result.id} 
                        result={result} 
                        type="online" 
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Empty State */}
              {offlineResults.length === 0 && onlineResults.length === 0 && (
                <div className="
                  text-center bg-white border border-gray-200 
                  rounded-lg p-8 shadow-sm
                ">
                  <h3 className="text-lg font-semibold mb-4 text-gray-700">
                    No Results Found
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Try searching for Paracetamol in pincode 560001
                  </p>
                  <div className="flex justify-center space-x-2">
                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm">
                      Paracetamol
                    </span>
                    <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-sm">
                      560001
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchResults;