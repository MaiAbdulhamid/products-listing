import Image from "next/image";
import styles from "../../styles/ProductDetails.module.css";
import { ProductType } from "@/shared/types";
import URLS from "@/shared/urls";
import { useRouter } from 'next/router';

type ProductDetailsTypes = { product: ProductType };

const ProductDetails = ({ product }: ProductDetailsTypes) => {
  const router = useRouter();

  return (
    <div className="container">
      <h1 className={styles["product-title"]}>{product.title}</h1>
      <div className={styles["product-details"]}>
        <Image
          src={product.image}
          alt={product.title}
          width={500}
          height={500}
          className={styles["product-image"]}
        />
        <div className={styles["product-info"]}>
          <p className={styles["product-description"]}>{product.description}</p>
          <p className={styles["product-category"]}>Category: {product.category}</p>
          <p className={styles["product-price"]}>Price: ${product.price}</p>
          <button onClick={() => router.push(URLS.home)} className={styles["back-button"]}>
            Back to Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

export async function getStaticPaths() {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();

  const paths = products.map((product: ProductType) => ({
    params: { id: product.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: any) {
  const res = await fetch(`https://fakestoreapi.com/products/${params.id}`);
  const product = await res.json();

  return {
    props: {
      product,
    },
  };
}
