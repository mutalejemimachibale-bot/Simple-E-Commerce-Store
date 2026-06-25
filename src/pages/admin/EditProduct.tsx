import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, AlertCircle } from 'lucide-react';
import { useProductStore } from '../../stores/productStore';
import { CATEGORIES } from '../../types';

export default function EditProduct() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, updateProduct } = useProductStore();

  const product = products.find(p => p.id === id);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Electronics' as 'Electronics' | 'Clothing' | 'Books',
    price: '',
    description: '',
    image: '',
    stock: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price.toString(),
        description: product.description,
        image: product.image,
        stock: product.stock.toString()
      });
    }
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <h1 className="font-display font-bold text-2xl text-text-primary mb-4">
            Product Not Found
          </h1>
          <Link
            to="/admin/products"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim() || formData.name.length < 2 || formData.name.length > 100) {
      newErrors.name = 'Name must be between 2 and 100 characters';
    }

    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0 || price > 10000) {
      newErrors.price = 'Price must be between 0.01 and 10000';
    }

    if (!formData.description.trim() || formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    if (!formData.image.trim()) {
      newErrors.image = 'Image URL is required';
    }

    const stock = parseInt(formData.stock);
    if (isNaN(stock) || stock < 0 || stock > 10000) {
      newErrors.stock = 'Stock must be between 0 and 10000';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    updateProduct(id!, {
      name: formData.name.trim(),
      category: formData.category,
      price: parseFloat(formData.price),
      description: formData.description.trim(),
      image: formData.image.trim(),
      stock: parseInt(formData.stock)
    });

    navigate('/admin/products');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        to="/admin/products"
        className="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors mb-6"
      >
        <ArrowLeft className="h-5 w-5" />
        Back to Products
      </Link>

      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h1 className="font-display font-bold text-2xl text-text-primary mb-8">
          Edit Product
        </h1>

        {Object.keys(errors).length > 0 && (
          <div className="flex items-center gap-3 bg-error bg-opacity-10 text-error p-4 rounded-xl mb-6">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <p>Please fix the errors below before submitting</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-text-primary font-semibold mb-2">
              Product Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent transition-all ${
                errors.name ? 'border-error' : 'border-gray-300'
              }`}
            />
            {errors.name && <p className="text-error text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-text-primary font-semibold mb-2">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-text-primary font-semibold mb-2">
                Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                max="10000"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent transition-all ${
                  errors.price ? 'border-error' : 'border-gray-300'
                }`}
              />
              {errors.price && <p className="text-error text-sm mt-1">{errors.price}</p>}
            </div>

            <div>
              <label className="block text-text-primary font-semibold mb-2">
                Stock Quantity
              </label>
              <input
                type="number"
                min="0"
                max="10000"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent transition-all ${
                  errors.stock ? 'border-error' : 'border-gray-300'
                }`}
              />
              {errors.stock && <p className="text-error text-sm mt-1">{errors.stock}</p>}
            </div>
          </div>

          <div>
            <label className="block text-text-primary font-semibold mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent transition-all resize-none ${
                errors.description ? 'border-error' : 'border-gray-300'
              }`}
            />
            {errors.description && <p className="text-error text-sm mt-1">{errors.description}</p>}
          </div>

          <div>
            <label className="block text-text-primary font-semibold mb-2">
              Image URL
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent transition-all ${
                errors.image ? 'border-error' : 'border-gray-300'
              }`}
            />
            {errors.image && <p className="text-error text-sm mt-1">{errors.image}</p>}
            {formData.image && (
              <div className="mt-4">
                <p className="text-text-secondary text-sm mb-2">Preview:</p>
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg border"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/128?text=Invalid+Image';
                  }}
                />
              </div>
            )}
          </div>

          <div className="flex gap-4 pt-4">
            <Link
              to="/admin/products"
              className="flex-1 py-4 border-2 border-gray-300 text-text-primary rounded-xl font-bold hover:bg-gray-100 transition-all text-center"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="flex-1 py-4 bg-primary text-white rounded-xl font-bold hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
            >
              <Save className="h-5 w-5" />
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
