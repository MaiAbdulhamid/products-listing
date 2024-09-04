import { ProductType } from "@/shared/types";
import URLS from "@/shared/urls";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "@/styles/ProductCard.module.css";
import { deleteProductAsync } from "@/store/productSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { useRouter } from "next/router";
import Button from "./UI/Button";
import { FaEdit, FaTrash } from "react-icons/fa";

const ProductCard = ({ product }: { product: ProductType }) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteProduct = (id: number) => {
    dispatch(deleteProductAsync(id));
  };
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
      <Link
        href={URLS.productDetails(product)}
        className={styles["product-link"]}
      >
        View Details
      </Link>

      <Button
        onClick={() => handleDeleteProduct(product.id)}
        icon={<FaTrash />}
        className="delete-button"
        title="Delete Product"
      />
      <Button
        onClick={() => router.push(URLS.editProduct(product))}
        icon={<FaEdit />}
        className="edit-button"
        title="Edit Product"
      />
    </div>
  );
};

export default ProductCard;
