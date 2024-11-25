import React, { useContext, useEffect, useState } from 'react';
import './Shop.css';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import Item from '../../components/item/Item';

const Shop = ({ category }) => {
  const { allProducts } = useContext(AppContext);
  const [products, setProducts] = useState([]); // Produits filtrés par catégorie
  const [sortedProducts, setSortedProducts] = useState([]); // Produits après tri
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortType, setSortType] = useState('latest');

  // Met à jour les produits filtrés lorsqu'une catégorie est sélectionnée
  useEffect(() => {
    const handleCategory = () => {
      const filteredProducts = !category
        ? allProducts
        : allProducts.filter((p) => p.category === category);
      setProducts(filteredProducts);
      setTotalPages(Math.ceil(filteredProducts.length / 12));
      setCurrentPage(1); // Réinitialise la page à 1 lors du changement de catégorie
    };
    handleCategory();
  }, [category, allProducts]);

  // Trie les produits lorsqu'un type de tri est sélectionné
  useEffect(() => {
    const sortProduct = () => {
      const fpCopy = [...products]; // Crée une copie pour éviter de modifier l'original
      switch (sortType) {
        case 'hightolow':
          setSortedProducts(fpCopy.sort((a, b) => b.price - a.price));
          break;
        case 'lowtohigh':
          setSortedProducts(fpCopy.sort((a, b) => a.price - b.price));
          break;
        case 'latest':
        default:
          setSortedProducts(fpCopy.sort((a, b) => new Date(b.date) - new Date(a.date)));
          break;
      }
    };
    sortProduct();
  }, [sortType, products]);

  const currentProducts = sortedProducts.slice(
    (currentPage - 1) * 12,
    currentPage * 12
  );

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="shop">
      <div className="container">
        <div className="header d-flex align-items-center justify-content-between mt-4">
          <div className="title d-flex gap-2">
            <Link to="/">home</Link> /{' '}
            <p className="fw-bold">{category ? category : 'shop'}</p>
          </div>
          <div className="filter d-flex align-items-center gap-4">
            <p>
              Showing {currentProducts.length} of {products.length} results
            </p>
            <select
              onChange={(e) => setSortType(e.target.value)}
              className="p-2"
            >
              <option value="latest">Sort by latest</option>
              <option value="hightolow">Sort by high to low </option>
              <option value="lowtohigh">Sort by low to high </option>
            </select>
          </div>
        </div>
        <div className="product-container my-5">
          {currentProducts.map((product, index) => {
            return (
              <Item id={product._id} key={product._id} name={product.name} price={product.price} image={`http://localhost:4000/images/${product.image[0]}`}/>
            );
          })}
        </div>
        <div className="pages-number d-flex justify-content-center align-items-center gap-2 mb-5">
          <i
            onClick={handlePrev}
            className={`fa-solid fa-angle-left ${
              currentPage === 1 && 'hide'
            }`}
          ></i>
          {[...Array(totalPages).keys()].map((page) => {
            return (
              <p
                onClick={() => setCurrentPage(page + 1)}
                key={page}
                className={currentPage === page + 1 && 'active'}
              >
                {page + 1}
              </p>
            );
          })}
          <i
            onClick={handleNext}
            className={`fa-solid fa-angle-right ${
              currentPage === totalPages && 'hide'
            }`}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default Shop;
