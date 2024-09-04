import { ProductType } from "./types";

const URLS = {
  home: "/",
  productDetails: (product : ProductType) => `/product/${product.id}`,
  addProduct: "/add-product"
}

export default URLS;