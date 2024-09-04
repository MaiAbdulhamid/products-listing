import React, { useState } from 'react';
import styles from "@/styles/AddProduct.module.css";

const AddProduct = () => {
  const [product, setProduct] = useState({
    title: '',
    price: '',
    image: '',
    category: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('https://fakestoreapi.com/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    const data = await response.json();
    console.log('Product added:', data);

    // Clear form after submission
    setProduct({
      title: '',
      price: '',
      image: '',
      category: '',
      description: '',
    });
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
