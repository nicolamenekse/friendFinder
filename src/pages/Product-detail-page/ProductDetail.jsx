import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectProducts } from '../../redux/selectors';
import css from './ProductDetail.module.css';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const products = useSelector(selectProducts);
  
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className={css.notFound}>
        <h2>Ürün bulunamadı</h2>
        <button onClick={() => navigate('/')}>Ana Sayfaya Dön</button>
      </div>
    );
  }

  return (
    <div className={css.productDetail}>
      <div className={css.container}>
        <div className={css.imageSection}>
          <img src={product.image} alt={product.title} className={css.productImage} />
        </div>
        
        <div className={css.infoSection}>
          <h1 className={css.title}>{product.title}</h1>
          <p className={css.price}>${product.price}</p>
          
          <div className={css.description}>
            <h2>Ürün Açıklaması</h2>
            <p>{product.description}</p>
          </div>

          <div className={css.details}>
            <h2>Ürün Detayları</h2>
            <ul>
              <li><strong>Kategori:</strong> {product.category}</li>
              <li><strong>Stok Durumu:</strong> {product.rating?.count || 'Bilgi yok'}</li>
              <li><strong>Değerlendirme:</strong> {product.rating?.rate || '0'} / 5</li>
            </ul>
          </div>

          <div className={css.actions}>
            <button className={css.addToCart}>Sepete Ekle</button>
            <button className={css.backButton} onClick={() => navigate(-1)}>Geri Dön</button>
          </div>
        </div>
      </div>
    </div>
  );
} 