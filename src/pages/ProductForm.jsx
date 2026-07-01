import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState({ name: '', description: '', price: '', image: '', stock: '' });
  const [errors, setErrors] = useState({});

  const nameRef = useRef();
  const descRef = useRef();
  const priceRef = useRef();
  const imgRef = useRef();
  const stockRef = useRef();

  useEffect(() => {
    if (isEdit) {
      fetch(`http://localhost:3001/products/${id}`)
        .then((res) => res.json())
        .then((data) => setForm(data))
        .catch(() => navigate('/'));
    }
  }, [id, isEdit, navigate]);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = { message: 'Nome é obrigatório', ref: nameRef };
    if (!form.description.trim()) newErrors.description = { message: 'Descrição é obrigatória', ref: descRef };
    if (!form.price || Number(form.price) < 0) newErrors.price = { message: 'Preço deve ser maior ou igual a 0', ref: priceRef };
    if (!form.image.trim()) newErrors.image = { message: 'URL da imagem é obrigatória', ref: imgRef };
    if (!form.stock || Number(form.stock) < 0) newErrors.stock = { message: 'Estoque deve ser maior ou igual a 0', ref: stockRef };

    setErrors(Object.keys(newErrors).reduce((acc, key) => ({ ...acc, [key]: newErrors[key].message }), {}));

    const firstErrorKey = Object.keys(newErrors)[0];
    if (firstErrorKey) {
      newErrors[firstErrorKey].ref.current.focus();
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      ...form,
      price: Number(form.price),
      stock: parseInt(form.stock, 10),
    };

    const url = isEdit ? `http://localhost:3001/products/${id}` : 'http://localhost:3001/products';
    const method = isEdit ? 'PUT' : 'POST';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    navigate('/');
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-md border border-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">{isEdit ? 'Editar Produto' : 'Cadastrar Novo Produto'}</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold mb-1">Nome do Produto</label>
          <input ref={nameRef} type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={`w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 ${errors.name ? 'border-red-500 focus:ring-red-200' : 'focus:ring-blue-200'}`} />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Descrição</label>
          <textarea ref={descRef} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={`w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 ${errors.description ? 'border-red-500 focus:ring-red-200' : 'focus:ring-blue-200'}`} rows="3" />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Preço (R$)</label>
            <input ref={priceRef} type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className={`w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 ${errors.price ? 'border-red-500 focus:ring-red-200' : 'focus:ring-blue-200'}`} />
            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Estoque Inicial</label>
            <input ref={stockRef} type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} className={`w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 ${errors.stock ? 'border-red-500 focus:ring-red-200' : 'focus:ring-blue-200'}`} />
            {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">URL da Imagem</label>
          <input ref={imgRef} type="text" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className={`w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 ${errors.image ? 'border-red-500 focus:ring-red-200' : 'focus:ring-blue-200'}`} />
          {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition mt-4 shadow-md">
          {isEdit ? 'Salvar Alterações' : 'Cadastrar Produto'}
        </button>
      </form>
    </div>
  );
}