import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectProducts } from '../../redux/selectors';
import { fetchProducts } from '../../redux/operations';
import { useNavigate } from 'react-router-dom';
import styles from './NecklacePage.module.css';

const NecklacePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector(selectProducts);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const necklaceProducts = products.filter(product => product.category === 'necklace');

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const renderProductCard = (product) => (
    <div 
      key={product.id} 
      className={styles.productCard}
      onClick={() => handleProductClick(product.id)}
    >
      <div className={styles.imageContainer}>
        <img 
          src={product.image} 
          alt={product.title} 
          className={styles.productImage}
        />
        <div className={styles.overlay}>
          <button className={styles.viewButton}>Detayları Gör</button>
        </div>
      </div>
      <div className={styles.productInfo}>
        <h3 className={styles.productTitle}>{product.title}</h3>
        <p className={styles.productPrice}>${product.price}</p>
        <p className={styles.productDescription}>{product.description}</p>
      </div>
    </div>
  );

  return (
    <div className={styles.necklacePage}>
      <div className={styles.header}>
        <h1 className={styles.title}>Kolye Koleksiyonu</h1>
        <p className={styles.subtitle}>
          Özenle seçilmiş kolye koleksiyonumuzda sizin için en özel parçaları bulabilirsiniz.
        </p>
      </div>

      <div className={styles.productsGrid}>
        {necklaceProducts.length > 0 ? (
          necklaceProducts.map(renderProductCard)
        ) : (
          <div className={styles.noProducts}>
            <p>Henüz kolye ürünü bulunmamaktadır.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NecklacePage;
