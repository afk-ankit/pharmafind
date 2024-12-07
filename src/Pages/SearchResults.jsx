import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, Loader2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/SearchResults.css';

const SearchResults = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [currentSearch, setCurrentSearch] = useState({
    medicine: searchParams.get('medicine') || '',
    pincode: searchParams.get('pincode') || '',
    includeOffline: searchParams.get('offline') === 'true'
  });

  // Predefined dummy data
  const dummyResults = [
    {
      id: 1,
      title: 'Paracetamol',
      description: 'Fever and pain relief medicine',
      category: 'Medicine',
      price: '$5.99',
      pincode: '560001'
    },
    {
      id: 2,
      title: 'Aspirin',
      description: 'Pain and inflammation reducer',
      category: 'Medicine',
      price: '$4.50',
      pincode: '560002'
    },
    {
      id: 3,
      title: 'Ibuprofen',
      description: 'Nonsteroidal anti-inflammatory drug',
      category: 'Medicine',
      price: '$6.25',
      pincode: '560003'
    }
  ];

  useEffect(() => {
    // Perform search when component mounts or search params change
    if (currentSearch.medicine && currentSearch.pincode) {
      performSearch();
    }
  }, [searchParams]);

  const performSearch = () => {
    setIsLoading(true);

    // Filter results based on exact medicine name and pincode
    const filteredResults = dummyResults.filter(
      (result) =>
        result.title.toLowerCase() === currentSearch.medicine.toLowerCase() &&
        result.pincode === currentSearch.pincode
    );

    // Simulate API delay
    setTimeout(() => {
      setSearchResults(filteredResults);
      setIsLoading(false);
    }, 1000);
  };

  const handleNewSearch = (e) => {
    e.preventDefault();

    // Navigate to search with new parameters
    navigate(
      `/search?medicine=${currentSearch.medicine}&pincode=${currentSearch.pincode}&offline=${currentSearch.includeOffline}`
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
              <h1>Search Results</h1>
              <div className="search-info">
                <span className="results-count">
                  Found {searchResults.length} items
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
              <div className="relative w-full">
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
                  className="search-input pr-12 w-full"
                  required
                />

              </div>
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
                className="search-input w-full mt-4"
                pattern="\d{6}"
                required
              />
              <button type="submit" className="add-to-cart-btn">
                Search
              </button>
            </form>

            {/* Loading State */}
            {isLoading && (
              <div className="loading-container">
                <Loader2 className="loading-spinner animate-spin" />
              </div>
            )}

            {/* Results Grid */}
            {!isLoading && (
              <div className="results-grid">
                {searchResults.map((result) => (
                  <div key={result.id} className="result-card">
                    <div className="card-content">
                      <span className="category-tag">{result.category}</span>
                      <h2 className="product-title">{result.title}</h2>
                      <p className="product-description">{result.description}</p>
                      <div className="card-footer">
                        <span className="product-price">{result.price}</span>
                        <button className="add-to-cart-btn">Add to Cart</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!isLoading && searchResults.length === 0 && (
              <div className="empty-state">
                <h3>No Results Found</h3>
                <p>
                  Try searching for: Paracetamol, Aspirin, or Ibuprofen
                </p>
                <p>
                  And use corresponding pincodes: 560001, 560002, or 560003
                </p>
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