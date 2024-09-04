import React, { useState } from 'react';
import styles from "@/styles/AddProduct.module.css";
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { AppDispatch } from '@/store';
import { addProductAsync } from '@/store/productSlice';

const AddProduct = () => {
  const [product, setProduct] = useState({
    title: '',
    price: '',
    image: '',
    category: '',
    description: '',
  });

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Dispatch the add product action
    await dispatch(addProductAsync({
      title: product.title,
      price: Number(product.price),
      image: product.image,
      category: product.category,
      description: product.description,
    }));

    // Redirect to the product listing page after adding the product
    router.push('/');
  };

  return (
    <div className="container">
      <h1 className={styles.title}>Add Product</h1>
      <form onSubmit={handleSubmit} className={styles["product-form"]}>
        <input
          type="text"
          name="title"
          placeholder="Product Title"
          value={product.title}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Product Price"
          value={product.price}
          onChange={handleChange}
          required
        />
        <input
          type="url"
          name="image"
          placeholder="Product Image URL"
          value={product.image}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Product Category"
          value={product.category}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Product Description"
          value={product.description}
          onChange={handleChange}
          required
        />
        <button type="submit" className={styles["submit-button"]}>Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
