import { ProductType } from "@/shared/types";
import URLS from "@/shared/urls";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "@/styles/ProductCard.module.css";

const ProductCard = ({ product }: { product: ProductType }) => {
  return (
    <div className={styles["product-item"]}>
      <Image
        className={styles["product-image"]}
        src={product.image}
        alt={product.title}
        width={500}
        height={500}
      />
      <h2 className={styles["product-title"]}>{product.title}</h2>
      <p className={styles["product-price"]}>${product.price}</p>
      <Link href={URLS.productDetails(product)} className={styles["product-link"]}>
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;
