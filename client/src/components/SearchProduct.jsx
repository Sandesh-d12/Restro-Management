import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './styles/searchProduct.module.css'
import { useSearchProduct } from '../features/react-query/products';

const SearchProduct = () => {

  const [keyword, setKeyword] = useState(null);
  const { data, error, isLoading } = useSearchProduct(keyword);

  return (
    <div className="search-container">
      <form>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search for a product"
      
        />
      </form>
      {error && <div className="error">{error.message}</div>}
      <div className="results">

        {data && data.map((product) => (
          <div key={product.id} className="product-item">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p><strong>Price:</strong> ${product.price}</p>
          </div>
        ))}
        {data && data.length === 0 && <div>No results found.</div>}
      </div>
    </div>
  );
};

export default SearchProduct;
