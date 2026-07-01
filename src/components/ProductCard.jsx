import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const outOfStock = product.stock === 0;

  return (
    <div
      className="
        bg-white
        rounded-2xl
        shadow-md
        hover:shadow-2xl
        hover:-translate-y-2
        duration-300
        overflow-hidden
        border border-gray-200
        flex
        flex-col
      "
    >
      {/* Imagem */}
      <div className="h-56 bg-slate-100 flex items-center justify-center p-5">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full object-contain transition duration-300 hover:scale-110"
        />
      </div>

      {/* Conteúdo */}
      <div className="p-5 flex flex-col flex-1">

        <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
          {product.name}
        </h2>

        <p className="text-3xl font-bold text-blue-600 mb-4">
          R$ {Number(product.price).toFixed(2)}
        </p>

        {outOfStock ? (
          <span className="w-fit bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold mb-5">
            ❌ Esgotado
          </span>
        ) : (
          <span className="w-fit bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold mb-5">
            📦 {product.stock} disponíveis
          </span>
        )}

        <div className="mt-auto">

          <Link
            to={`/produto/${product.id}`}
            className="
              block
              text-center
              bg-blue-600
              hover:bg-blue-700
              text-white
              font-semibold
              py-3
              rounded-xl
              transition
            "
          >
            Ver Detalhes
          </Link>

        </div>

      </div>
    </div>
  );
}