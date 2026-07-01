import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cart, addToCart } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => setProduct(data))
      .catch(() => navigate('*'));
  }, [id, navigate]);

  if (!product) return <div className="text-center py-10">Carregando detalhes...</div>;

  const cartItem = cart.find((item) => item.id === product.id);
  const cartQty = cartItem ? cartItem.quantity : 0;
  const isMaxStock = cartQty >= product.stock;
  const isOutofStock = product.stock === 0;

  const handleDelete = async () => {
    if (window.confirm("Deseja realmente deletar este produto?")) {
      await fetch(`http://localhost:3001/products/${product.id}`, { method: 'DELETE' });
      navigate('/');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-4xl mx-auto md:flex gap-8">
      <img src={product.image} alt={product.name} className="w-full md:w-1/2 h-80 object-cover rounded-xl" />
      <div className="flex flex-col justify-between mt-4 md:mt-0 w-full">
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-3xl font-bold text-blue-600 mb-2">R$ {Number(product.price).toFixed(2)}</p>
          <p className="text-sm text-gray-500 mb-6">Disponível em Estoque: {product.stock}</p>
        </div>

        <div>
          {isMaxStock && !isOutofStock && (
            <p className="text-amber-600 bg-amber-50 border border-amber-200 text-sm p-2.5 rounded-lg mb-3 font-medium">⚠️ Estoque máximo atingido no carrinho!</p>
          )}
          <div className="flex gap-4">
            <button
              onClick={() => addToCart(product)}
              disabled={isOutofStock || isMaxStock}
              className="flex-grow bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isOutofStock ? 'Esgotado' : isMaxStock ? 'Limite Atingido' : 'Adicionar ao Carrinho'}
            </button>
            <button onClick={() => navigate(`/editar/${product.id}`)} className="bg-gray-100 text-gray-700 px-4 rounded-xl hover:bg-gray-200 transition">Editar</button>
            <button onClick={handleDelete} className="bg-red-50 text-red-600 px-4 rounded-xl hover:bg-red-100 transition">Excluir</button>
          </div>
        </div>
      </div>
    </div>
  );
}