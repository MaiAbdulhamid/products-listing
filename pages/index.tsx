import React, { useEffect, useState } from "react";
import { ProductType } from "@/shared/types";
import { useRouter } from "next/router";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import styles from "@/styles/ProductList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { fetchProductsAsync, deleteProductAsync } from "../store/productSlice";

const ITEMS_PER_PAGE = 8;

export default function ProductList() {
  const router = useRouter();
  const { query } = router;
  const dispatch = useDispatch<AppDispatch>();

  // Extract search and page query params
  const searchTerm = (query.search as string) || "";
  const currentPage = parseInt((query.page as string) || "1", 10);

  const { products, loading } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);

  // Filter and paginate products
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  // Handler for search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    router.push({
      pathname: "/",
      query: { ...query, search: value, page: "1" }, // Reset to page 1 when search changes
    });
  };

  // Handler for page change
  const handlePageChange = (newPage: number) => {
    router.push({
      pathname: "/",
      query: { ...query, page: newPage.toString() },
    });
  };
  return (
    <div className="container">
      <h1 className={styles.title}>Product Listing</h1>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearchChange}
        className={styles["search-bar"]}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles["product-list"]}>
          {paginatedProducts.map((product: ProductType) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      {/* Pagination controls */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

// export async function getStaticProps() {
//   const res = await fetch("https://fakestoreapi.com/products");
//   const products = await res.json();

//   return {
//     props: {
//       products,
//     },
//   };
// }
