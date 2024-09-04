import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchProductsAsync, updateProductAsync } from '../../store/productSlice';
import styles from "@/styles/AddProduct.module.css";

const EditProduct = () => {
  const router = useRouter();
  const { id } = router.query; // Get the product ID from the URL

  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.products);
  const [product, setProduct] = useState({
    id: '',
    title: '',
    price: '',
    image: '',
    category: '',
    description: '',
  });

  // Load the product data from Redux when the component mounts
  useEffect(() => {
    if (!id) return; // Wait for the ID to be available
    dispatch(fetchProductsAsync());
  }, [id, dispatch]);

  // Find the product to edit from the Redux store
  useEffect(() => {
    if (id && products.length > 0) {
      const productToEdit = products.find((p) => p.id === Number(id));
      if (productToEdit) {
        setProduct({
          id: String(productToEdit.id),
          title: productToEdit.title,
          price: String(productToEdit.price),
          image: productToEdit.image,
          category: productToEdit.category,
          description: productToEdit.description,
        });
      }
    }
  }, [id, products]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Dispatch the update product action
    await dispatch(updateProductAsync({
      id: Number(product.id),
      product: {
        title: product.title,
        price: Number(product.price),
        image: product.image,
        category: product.category,
        description: product.description,
      },
    }));

    // Redirect to the product listing page after updating the product
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
        <button type="submit" className={styles["submit-button"]}>Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
