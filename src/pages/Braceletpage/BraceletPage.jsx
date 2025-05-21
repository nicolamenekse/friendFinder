import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectProducts } from '../../redux/selectors';
import { fetchProducts } from '../../redux/operations';
import { useNavigate } from 'react-router-dom';
import css from './BraceletPage.module.css';

export default function BraceletPage() {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  
  const braceletProducts = products
    .filter(product => product.category === 'bracelet')
    .slice(-10);

  return (
    <div className={css.braceletPage}>
      <div className={css.header}>
        <h1 className={css.title}>Bileklik Koleksiyonu</h1>
        <p className={css.subtitle}>
          Özenle seçilmiş bileklik koleksiyonumuzda sizin için en özel parçaları bulabilirsiniz.
        </p>
      </div>

      <div className={css.productsGrid}>
        {braceletProducts.map((product) => (
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
            </div>
          </div>
        ))}
      </div>

      {braceletProducts.length === 0 && (
        <div className={css.noProducts}>
          <p>Henüz bileklik ürünü bulunmamaktadır.</p>
        </div>
      )}
    </div>
  );
}
