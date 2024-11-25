// src/pages/SearchResults.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Loader2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/SearchResults.css';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [currentSearch, setCurrentSearch] = useState({
    medicine: searchParams.get('medicine') || '',
    pincode: searchParams.get('pincode') || '',
    includeOffline: searchParams.get('offline') === 'true'
  });

  useEffect(() => {
    if (currentSearch.medicine && currentSearch.pincode) {
      performSearch();
    }
  }, [searchParams]);

  const performSearch = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockResults = [
        {
          id: 1,
          title: currentSearch.medicine,
          description: `Available near ${currentSearch.pincode}`,
          category: 'Medicine',
          price: '$29.99'
        },
        {
          id: 2,
          title: `Generic ${currentSearch.medicine}`,
          description: 'Alternative medicine available',
          category: 'Generic Medicine',
          price: '$19.99'
        }
      ];
      
      setSearchResults(mockResults);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsLoading(false);
    }
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
            <div className="search-bar-container">
              <input 
                type="text"
                placeholder="Search medicines..."
                value={currentSearch.medicine}
                onChange={(e) => setCurrentSearch(prev => ({ ...prev, medicine: e.target.value }))}
                className="search-input"
              />
              <Search className="search-icon" />
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="loading-container">
                <Loader2 className="loading-spinner" />
              </div>
            )}

            {/* Results Grid */}
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

            {/* Empty State */}
            {!isLoading && searchResults.length === 0 && (
              <div className="empty-state">
                <h3>No Results Found</h3>
                <p>Try adjusting your search terms or browse our categories</p>
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