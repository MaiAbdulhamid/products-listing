import URLS from '@/shared/urls';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href={URLS.home} className="navbar-link">Home</Link>
        <Link href={URLS.addProduct} className="navbar-link">Add Product</Link>
      </div>
    </nav>
  );
};

export default Navbar;
