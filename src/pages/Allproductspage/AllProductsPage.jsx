import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectProducts } from '../../redux/selectors';
import { fetchProducts } from '../../redux/operations';
import { useNavigate, useLocation } from 'react-router-dom';
import css from './AllProductsPage.module.css';

export default function AllProductsPage() {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  console.log(products)

  useEffect(() => {
    
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, [location]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
   
    const params = new URLSearchParams(location.search);
    if (category) {
      params.set('category', category);
    } else {
      params.delete('category');
    }
    navigate(`${location.pathname}?${params.toString()}`);
  };

  const handleSortChange = (sortType) => {
    setSortBy(sortType);
  };
 
  const filteredByCategory = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  
  const sortedProducts = [...filteredByCategory].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'newest':
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  return (
    <div className={css.allProductsPage}>
      <div className={css.header}>
        <h1 className={css.title}>Tüm Ürünlerimiz</h1>
        <p className={css.subtitle}>
          Özenle seçilmiş takı koleksiyonumuzda sizin için en özel parçaları bulabilirsiniz.
        </p>
      </div>

      <div className={css.categories}>
        <button
          className={`${css.categoryButton} ${selectedCategory === '' ? css.active : ''}`}
          onClick={() => handleCategoryChange('')}
        >
          Tümü
        </button>
        <button
          className={`${css.categoryButton} ${selectedCategory === 'necklace' ? css.active : ''}`}
          onClick={() => handleCategoryChange('necklace')}
        >
          Kolyeler
        </button>
        <button
          className={`${css.categoryButton} ${selectedCategory === 'bracelet' ? css.active : ''}`}
          onClick={() => handleCategoryChange('bracelet')}
        >
          Bileklikler
        </button>
      </div>

      <div className={css.filters}>
        <div className={css.filterGroup}>
          <label htmlFor="sort">Sırala:</label>
          <select 
            id="sort" 
            className={css.select}
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option value="newest">En Yeniler</option>
            <option value="price-asc">Fiyat (Düşükten Yükseğe)</option>
            <option value="price-desc">Fiyat (Yüksekten Düşüğe)</option>
          </select>
        </div>
      </div>

      <div className={css.productsGrid}>
        {sortedProducts.map((product) => (
          <div 
            key={product.id} 
            className={css.productCard}
            onClick={() => handleProductClick(product.id)}
          >
            <div className={css.imageContainer}>
              <img 
                src={product.image} 
                alt={product.title} 
                className={css.productImage}
              />
              <div className={css.overlay}>
                <button className={css.viewButton}>Detayları Gör</button>
              </div>
            </div>
            <div className={css.productInfo}>
              <h3 className={css.productTitle}>{product.title}</h3>
              <p className={css.productPrice}>${product.price}</p>
              <p className={css.productDescription}>{product.description}</p>
              <span className={css.productCategory}>{product.category === 'necklace' ? 'Kolye' : 'Bileklik'}</span>
            </div>
          </div>
        ))}
      </div>

      {sortedProducts.length === 0 && (
        <div className={css.noProducts}>
          <p>Bu kategoride ürün bulunamadı.</p>
        </div>
      )}
    </div>
  );
}
