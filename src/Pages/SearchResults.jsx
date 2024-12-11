// src/pages/SearchResults.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  MapPin,
  Globe,
  Loader2,
  PhoneCall,
  Clock,
  Tag
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/SearchResults.css';

// Expanded Mock Database with more flexible matching
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
    description: '650mg - Extended relief',
    type: 'offline',
    pharmacyName: 'City Store',
    price: 7,
    pincode: '560001',
    address: '456 Park Road, Bangalore',
    contact: '080',
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
    // Ensure search is performed when component mounts or params change
    if (currentSearch.medicine || currentSearch.pincode) {
      performSearch();
    }
  }, [searchParams, currentSearch.includeOnline]);

  const performSearch = () => {
    setIsLoading(true);

    // Make search more flexible - case-insensitive, partial matching
    const filteredResults = medicineDatabase.filter(
      (result) =>
        result.title.toLowerCase().includes(currentSearch.medicine.toLowerCase()) &&
        (currentSearch.pincode ? result.pincode === currentSearch.pincode : true)
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
    }, 500);
  };

  const handleNewSearch = (e) => {
    e.preventDefault();
    navigate(
      `/search?medicine=${currentSearch.medicine}&pincode=${currentSearch.pincode}&online=${currentSearch.includeOnline}`
    );
  };

  const ResultCard = ({ result, type }) => (
    <div className={`result-card ${type === 'offline' ? 'result-card__header--offline' : 'result-card__header--online'}`}>
      <div className="result-card__header">
        <div className="flex items-center">
          {type === 'offline' ? (
            <MapPin className="result-card__detail-icon" size={20} />
          ) : (
            <Globe className="result-card__detail-icon" size={20} />
          )}
          <h3 className="result-card__pharmacy-name">{result.pharmacyName}</h3>
        </div>
        <div className="result-card__price">${result.price.toFixed(2)}</div>
      </div>

      <div className="result-card__content">
        <div className="mb-2">
          <h4 className="text-sm font-medium text-gray-700">{result.title}</h4>
          <p className="text-xs text-gray-500">{result.description}</p>
        </div>

        <div className="result-card__details">
          {type === 'offline' ? (
            <>
              <div className="result-card__detail-item">
                <PhoneCall className="result-card__detail-icon" size={12} />
                {result.contact}
              </div>
              <div className="result-card__detail-item">
                <MapPin className="result-card__detail-icon" size={12} />
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
            </>
          ) : (
            <>
              <div className="result-card__detail-item">
                <Clock className="result-card__detail-icon" size={12} />
                {result.deliveryTime}
              </div>
              <div className="result-card__detail-item text-blue-600">
                <Tag className="result-card__detail-icon" size={12} />
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
                Visit Website
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );

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
                onChange={(e) => setCurrentSearch(prev => ({
                  ...prev,
                  medicine: e.target.value
                }))}
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
                onChange={(e) => setCurrentSearch(prev => ({
                  ...prev,
                  pincode: e.target.value
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="form-checkbox text-blue-600 focus:ring-blue-500 h-4 w-4 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">
                Include Online Pharmacies
              </span>
            </label>
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
            {offlineResults.length > 0 && (
              <div className="bg-white shadow-md rounded-lg p-6">
                <div className="flex items-center border-b pb-3 mb-4">
                  <MapPin className="mr-2 text-blue-500" size={24} />
                  <h2 className="text-xl font-semibold text-gray-800">Nearby Pharmacies</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
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
              <div className="bg-white shadow-md rounded-lg p-6">
                <div className="flex items-center border-b pb-3 mb-4">
                  <Globe className="mr-2 text-green-500" size={24} />
                  <h2 className="text-xl font-semibold text-gray-800">Online Pharmacies</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
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
              <div className="bg-white shadow-md rounded-lg p-12 text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">No Results Found</h3>
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