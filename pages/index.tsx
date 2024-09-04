import React, { useEffect, useState } from "react";
import { ProductType } from "@/shared/types";
import { useRouter } from "next/router";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import styles from "@/styles/ProductList.module.css";

const ITEMS_PER_PAGE = 8;
type ProductListTypes = { products: Array<ProductType> };

export default function ProductList({ products }: ProductListTypes) {
  const router = useRouter();
  const { query } = router;

  // Extract search and page query params
  const searchTerm = (query.search as string) || "";
  const currentPage = parseInt((query.page as string) || "1", 10);

  // State for filtered products
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);

  // Filter and search products when search term or page changes
  useEffect(() => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

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
      <div className={styles["product-list"]}>
        {paginatedProducts.map((product: ProductType) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {/* Pagination controls */}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />

    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();

  return {
    props: {
      products,
    },
  };
}
