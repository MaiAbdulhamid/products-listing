# Product Listing App

This is a **Product Listing App** built with **Next.js** and **TypeScript**, leveraging **Redux** for state management and **Next.js Image Optimization** for performance optimization. The app allows users to:

- View a list of products.
- Search and filter products.
- Add a new product.
- Edit an existing product.
- Delete a product.
- Pagination for easy navigation.
- Responsive design for mobile and desktop views.

## **Features Added**

1. **API Logic Separated into Services Folder:**
   - All API interactions (fetching, adding, updating, and deleting products) are encapsulated in the `services/productService.ts` file for better code organization.

2. **State Management with Redux:**
   - The app uses **Redux** for state management, allowing centralized and predictable state updates. The `store/productSlice.ts` file contains all the logic for managing product data.

3. **Reusable Button Component:**
   - A reusable `Button` component (`components/Button.tsx`) is created for all button elements, enhancing code reusability and styling consistency.

4. **Icons for Actions:**
   - The **Edit** and **Delete** buttons have been replaced with icons using the `react-icons` library, improving the user interface.

5. **Responsive Design:**
   - The app is designed to be responsive, providing a great user experience on both desktop and mobile devices.

6. **Pagination:**
   - A pagination component allows users to navigate through products easily.

7. **SEO and Performance Optimization:**
   - Next.js features such as `next/image` are used for optimized image loading.

## **Getting Started**

Follow these instructions to set up and run the application locally.

### **Prerequisites**

- **Node.js** (v14 or above)
- **npm** (v6 or above)

### **Installation**

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/product-listing-app.git
   cd product-listing-app

2. **Clone the Repository:**

   ```bash
   npm install

3. **Run the Development Server:**
   ```bash
   npm run dev

The app will be available at http://localhost:3000.

Usage Instructions
Product Listing:
The homepage (/) displays a list of products.
Use the search bar to filter products by title.
Use the pagination controls at the bottom to navigate through pages.
Add Product:
Navigate to the Add Product page via the "Add Product" link in the navbar.
Fill out the form and click "Add Product" to add a new product to the list.
Edit Product:
Click the edit icon next to any product to navigate to the Edit Product page.
Modify the product details and click "Update Product" to save changes.
Delete Product:
Click the delete icon next to any product to remove it from the list.
Project Structure
plaintext
Copy code
├── components
│   ├── Button.tsx          # Reusable button component
│   ├── Footer.tsx          # Footer component
│   ├── Navbar.tsx          # Navbar component
│   └── Pagination.tsx      # Pagination component
├── pages
│   ├── _app.tsx            # Custom App component
│   ├── index.tsx           # Product listing page
│   ├── add-product.tsx     # Add product page
│   └── edit-product
│       └── [id].tsx        # Edit product page
├── public                  # Public assets (e.g., images, icons)
├── services
│   └── productService.ts   # API logic for fetching, adding, updating, and deleting products
├── store
│   ├── index.ts            # Redux store setup
│   └── productSlice.ts     # Redux slice for managing product state
└── styles
    └── globals.css         # Global styles
Technical Details
React: A JavaScript library for building user interfaces.
Next.js: A React framework with built-in support for server-side rendering, static site generation, and more.
Redux Toolkit: A set of tools to simplify Redux development.
TypeScript: A typed superset of JavaScript that compiles to plain JavaScript.
React Icons: A collection of popular icons as React components.
Additional Notes
Ensure that the backend API (https://fakestoreapi.com/products) is accessible for the app to work correctly.
The app is set up to handle image optimization via Next.js; ensure you have the required domain configured in next.config.js.
To Do:
Integrate a real backend service for persistent data storage.
Improve form validation and error handling.
