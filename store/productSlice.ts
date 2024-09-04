import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from '../services/productService';
import { ProductType } from '@/shared/types';

interface ProductState {
  products: ProductType[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

// Async actions using createAsyncThunk
export const fetchProductsAsync = createAsyncThunk<ProductType[]>(
  'products/fetchProducts',
  async () => {
    const products = await fetchProducts();
    return products;
  }
);

export const addProductAsync = createAsyncThunk<ProductType, Omit<ProductType, 'id'>>(
  'products/addProduct',
  async (newProduct) => {
    const product = await addProduct(newProduct);
    return product;
  }
);

export const updateProductAsync = createAsyncThunk<ProductType, { id: number; product: Omit<ProductType, 'id'> }>(
  'products/updateProduct',
  async ({ id, product }) => {
    const updatedProduct = await updateProduct(id, product);
    return updatedProduct;
  }
);

export const deleteProductAsync = createAsyncThunk<void, number>(
  'products/deleteProduct',
  async (id) => {
    await deleteProduct(id);
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action: PayloadAction<ProductType[]>) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(addProductAsync.fulfilled, (state, action: PayloadAction<ProductType>) => {
        state.products.push(action.payload);
      })
      .addCase(updateProductAsync.fulfilled, (state, action: PayloadAction<ProductType>) => {
        const index = state.products.findIndex((product) => product.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.products = state.products.filter((product) => product.id !== action.meta.arg);
      });
  },
});

export default productSlice.reducer;
