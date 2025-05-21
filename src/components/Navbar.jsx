import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectProducts } from "../redux/selectors";
import css from "./Navbar.module.css";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const products = useSelector(selectProducts);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setShowResults(query.length > 0);
  };

  const handleProductClick = (productId) => {
    setSearchQuery("");
    setShowResults(false);
    navigate(`/product/${productId}`);
  };

  const filteredProducts = products
    .filter(
      (product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, 5); // En fazla 5 sonuç göster

  return (
    <div className={css.navbarContainer}>
      <nav className={css.nav}>
        <div className={css.logo}>
          <Link to="/">Meandmo Acc</Link>
        </div>

        <div className={css.searchContainer}>
          <input
            type="text"
            placeholder="Ürün ara..."
            value={searchQuery}
            onChange={handleSearch}
            className={css.searchInput}
          />
          {showResults && (
            <div className={css.searchResults}>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className={css.searchResultItem}
                    onClick={() => handleProductClick(product.id)}
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className={css.searchResultImage}
                    />
                    <div className={css.searchResultInfo}>
                      <h4>{product.title}</h4>
                      <p>${product.price}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className={css.noResults}>Sonuç bulunamadı</div>
              )}
            </div>
          )}
        </div>

        <ul className={css.list}>
          <li>
            <Link to="/">Ana Sayfa</Link>
          </li>
          <li>
            <Link to="/allProducts">Tüm Ürünler</Link>
          </li>
          <li>
            <Link to="/necklace">Kolyeler</Link>
          </li>
          <li>
            <Link to="/bracelet">Bileklikler</Link>
          </li>
          <li>
            <Link to="/ourMission">Hakkımızda</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
