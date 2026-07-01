import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-6xl font-black text-gray-300 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Ops! A página que você procura sumiu no estoque.</p>
      <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium">
        Voltar para a Home
      </Link>
    </div>
  );
}