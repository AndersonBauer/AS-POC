import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-4">Seu carrinho está vazio 😢</h2>
        <Link to="/" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">Voltar às compras</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Seu Carrinho</h1>
      <div className="space-y-4 bg-white p-6 rounded-2xl shadow-md border border-gray-100">
        {cart.map((item) => (
          <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between border-b pb-4 gap-4">
            <div className="flex items-center gap-4 w-full sm:w-1/2">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
              <div>
                <h3 className="font-bold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-500">Unitário: R$ {Number(item.price).toFixed(2)}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 justify-between w-full sm:w-auto">
              <div className="flex flex-col items-center">
                <div className="flex items-center border rounded-lg overflow-hidden">
                  <button onClick={() => updateQuantity(item.id, -1, item.stock)} className="px-3 py-1 bg-gray-50 hover:bg-gray-100 font-bold">-</button>
                  <span className="px-4 py-1 font-medium">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1, item.stock)} className="px-3 py-1 bg-gray-50 hover:bg-gray-100 font-bold">+</button>
                </div>
                {item.quantity === item.stock && (
                  <span className="text-[10px] text-amber-600 font-semibold mt-1">Máx. Estoque</span>
                )}
              </div>
              <p className="font-bold text-gray-900 min-w-[80px] text-right">R$ {(item.price * item.quantity).toFixed(2)}</p>
              <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 font-medium">Remover</button>
            </div>
          </div>
        ))}

        <div className="flex flex-col sm:flex-row justify-between items-center pt-6 mt-6 border-t-2">
          <button onClick={clearCart} className="text-gray-500 hover:text-gray-700 font-medium mb-4 sm:mb-0">Esvaziar Carrinho</button>
          <div className="text-right w-full sm:w-auto">
            <p className="text-gray-600 text-sm">Total Geral:</p>
            <p className="text-3xl font-black text-blue-600">R$ {cartTotal.toFixed(2)}</p>
            <button className="w-full mt-4 bg-green-600 text-white py-3 px-8 rounded-xl font-bold hover:bg-green-700 transition shadow-md shadow-green-100">
              Finalizar Compra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}