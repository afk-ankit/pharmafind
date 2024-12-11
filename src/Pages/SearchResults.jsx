import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  MapPin,
  Globe,
  Loader2,
  Search,
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
  }, [searchParams]);

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
      <div className="container">
        <form
          onSubmit={handleNewSearch}
          className="search-form"
        >
          <div className="search-form__grid">
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
                className="search-form__input"
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
                className="search-form__input"
              />
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={currentSearch.includeOnline}
                onChange={() => setCurrentSearch(prev => ({
                  ...prev,
                  includeOnline: !prev.includeOnline
                }))}
                className="form-checkbox text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">
                Include Online Pharmacies
              </span>
            </label>
            <button
              type="submit"
              className="search-form__submit"
            >
              Search
            </button>
          </div>
        </form>

        {/* Loading State */}
        {isLoading && (
          <div className="loading-container">
            <Loader2 className="loading-spinner animate-spin" size={48} />
            <p className="mt-4 text-gray-600">Searching pharmacies...</p>
          </div>
        )}

        {/* Results Section */}
        {!isLoading && (
          <div className="space-y-6">
            {/* Offline Results Section */}
            {offlineResults.length > 0 && (
              <div className="result-section">
                <div className="result-section__header result-section__header--offline">
                  <MapPin className="result-section__header-icon" size={24} />
                  <h2>Nearby Pharmacies</h2>
                </div>
                <div className="result-section__content">
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
              <div className="result-section">
                <div className="result-section__header result-section__header--online">
                  <Globe className="result-section__header-icon" size={24} />
                  <h2>Online Pharmacies</h2>
                </div>
                <div className="result-section__content">
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
              <div className="empty-state">
                <h3 className="empty-state__title">No Results Found</h3>
                <p className="empty-state__subtitle">
                  Try searching for Paracetamol in pincode 560001
                </p>
                <div className="empty-state__tags">
                  <span className="empty-state__tag">Paracetamol</span>
                  <span className="empty-state__tag">560001</span>
                </div>
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