import React, { useState, useEffect } from "react";
import styles from "./HomePage.module.css";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../redux/operations";
import { Link } from "react-router-dom";
import JewelryGame from "../../components/JewelryGame/JewelryGame";

// Retro fontları import et
import '@fontsource/press-start-2p';
import '@fontsource/vt323';

const HomePage = () => {
  const dispatch = useDispatch();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
      title: "Yeni Koleksiyon",
      description: "2024 İlkbahar koleksiyonumuzu keşfedin"
    },
    {
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
      title: "Özel Tasarımlar",
      description: "Her parça bir sanat eseri"
    },
    {
      image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
      title: "El Yapımı Mücevherler",
      description: "Geleneksel el sanatlarının modern yorumu"
    }
  ];

  useEffect(() => {
    dispatch(fetchProducts());
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [dispatch]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className={styles.homePage}>
     
      <section className={styles.slidingHeader}>
        <div className={styles.sliderContainer}>
          <button className={`${styles.sliderArrow} ${styles.prev}`} onClick={handlePrevSlide}>
            <i className="fas fa-chevron-left"></i>
          </button>
          <button className={`${styles.sliderArrow} ${styles.next}`} onClick={handleNextSlide}>
            <i className="fas fa-chevron-right"></i>
          </button>
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${slide.image})`
              }}
            >
              <div className={styles.slideContent}>
                <h1>{slide.title}</h1>
                <p>{slide.description}</p>
                <Link to="/allProducts" className={styles.viewAllButton}>
                  Koleksiyonu Keşfet
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

     
      <section className={styles.categoriesContainer}>
        <h2 className={styles.allProductsTitle}>Öne Çıkan Kategoriler</h2>
        <div className={styles.categorySection}>
          <div className={styles.categoryCard}>
            <img 
              src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80" 
              alt="Kolyeler" 
              className={styles.categoryImage} 
            />
            <div className={styles.categoryOverlay}>
              <h3 className={styles.categoryTitle}>Kolyeler</h3>
              <Link to="/necklace" className={styles.categoryLink}>Keşfet</Link>
            </div>
          </div>
          <div className={styles.categoryCard}>
            <img 
              src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80" 
              alt="Bileklikler" 
              className={styles.categoryImage} 
            />
            <div className={styles.categoryOverlay}>
              <h3 className={styles.categoryTitle}>Bileklikler</h3>
              <Link to="/bracelet" className={styles.categoryLink}>Keşfet</Link>
            </div>
          </div>
        </div>
      </section>

      
      <section className={styles.mainContent}>
        <h2 className={styles.allProductsTitle}>Neden Bizi Tercih Etmelisiniz?</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.feature}>
            <i className="fas fa-gem"></i>
            <h3>El Yapımı</h3>
            <p>Her parça özenle el işçiliği ile üretilir</p>
          </div>
          <div className={styles.feature}>
            <i className="fas fa-award"></i>
            <h3>Kalite</h3>
            <p>En kaliteli malzemeler kullanılır</p>
          </div>
          <div className={styles.feature}>
            <i className="fas fa-shipping-fast"></i>
            <h3>Hızlı Teslimat</h3>
            <p>Güvenli ve hızlı kargo</p>
          </div>
        </div>
      </section>

     
      <section className={styles.newsletter}>
        <div className={styles.newsletterContent}>
          <h2>Yeni Koleksiyonlardan Haberdar Olun</h2>
          <p>En yeni ürünler ve özel fırsatlardan ilk siz haberdar olun</p>
          <form className={styles.newsletterForm}>
            <input type="email" placeholder="E-posta adresiniz" />
            <button type="submit">Abone Ol</button>
          </form>
        </div>
      </section>

      <section className={styles.gameSection}>
        <h2 className={styles.allProductsTitle}>Kazanmak için Yılanı Besle !</h2>
        <p className={styles.gameDescription}>
          1000 puan toplayarak 10 TL'lik kupon kazanma şansı yakalayın!
        </p>
        <JewelryGame />
      </section>
    </div>
  );
};

export default HomePage;
