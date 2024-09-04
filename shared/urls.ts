import { ProductType } from "./types";

const URLS = {
  home: "/",
  productDetails: (product : ProductType) => `/product/${product.id}`,
  addProduct: "/add-product",
  editProduct: (product : ProductType) => `/edit-product/${product.id}`
}

export default URLS;