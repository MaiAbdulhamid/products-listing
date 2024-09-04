import { ProductType } from "@/shared/types";

const API_URL = 'https://fakestoreapi.com/products';

// Fetch all products
export const fetchProducts = async (): Promise<ProductType[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};

// Fetch a single product by ID
export const fetchProductById = async (id: number): Promise<ProductType> => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  return response.json();
};

// Add a new product
export const addProduct = async (product: Omit<ProductType, 'id'>): Promise<ProductType> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    throw new Error('Failed to add product');
  }
  return response.json();
};

// Update an existing product
export const updateProduct = async (id: number, product: Omit<ProductType, 'id'>): Promise<ProductType> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    throw new Error('Failed to update product');
  }
  return response.json();
};

// Delete a product
export const deleteProduct = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete product');
  }
};
