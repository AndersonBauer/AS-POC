import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { cart } = useCart();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        <Link
          to="/"
          className="text-3xl font-bold text-blue-600 hover:text-blue-700 transition"
        >
          MiniShop
        </Link>

        <nav className="flex items-center gap-4">

          <Link
            to="/"
            className="font-medium text-gray-700 hover:text-blue-600 transition"
          >
            Produtos
          </Link>

          <Link
            to="/cadastro"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            Novo Produto
          </Link>

          <Link
            to="/carrinho"
            className="relative bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition"
          >
            🛒 Carrinho

            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

        </nav>
      </div>
    </header>
  );
}