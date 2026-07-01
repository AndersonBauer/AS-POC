import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Erro ao buscar produtos:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-10 font-medium">Carregando catálogo...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Nossos Produtos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col justify-between p-4">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
            <div>
              <h2 className="text-lg font-bold text-gray-800 line-clamp-1">{product.name}</h2>
              <p className="text-xl font-semibold text-blue-600 my-2">R$ {Number(product.price).toFixed(2)}</p>
              {product.stock === 0 ? (
                <span className="inline-block bg-red-100 text-red-700 text-xs px-2.5 py-1 rounded-full font-semibold mb-4">Esgotado</span>
              ) : (
                <span className="inline-block bg-green-100 text-green-700 text-xs px-2.5 py-1 rounded-full font-semibold mb-4">Em estoque: {product.stock}</span>
              )}
            </div>
            <Link to={`/produto/${product.id}`} className="block text-center w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition">
              Ver Detalhes
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}