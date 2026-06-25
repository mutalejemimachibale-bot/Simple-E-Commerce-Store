import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Package } from 'lucide-react';
import { useProductStore } from '../../stores/productStore';

export default function AdminProducts() {
  const { products, deleteProduct } = useProductStore();

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteProduct(id);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Electronics':
        return 'bg-secondary text-white';
      case 'Clothing':
        return 'bg-primary text-white';
      case 'Books':
        return 'bg-accent text-text-primary';
      default:
        return 'bg-gray-300 text-text-primary';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-3xl text-text-primary">Products</h1>
          <p className="text-text-secondary mt-2">{products.length} products in catalog</p>
        </div>
        <Link
          to="/admin/products/add"
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-opacity-90 transition-all transform hover:scale-105"
        >
          <Plus className="h-5 w-5" />
          Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center max-w-md mx-auto">
          <div className="bg-gradient-to-br from-primary to-secondary w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="h-10 w-10 text-white" />
          </div>
          <h2 className="font-display font-bold text-xl text-text-primary mb-4">
            No Products Yet
          </h2>
          <p className="text-text-secondary mb-8">
            Start building your catalog by adding your first product.
          </p>
          <Link
            to="/admin/products/add"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-opacity-90 transition-all"
          >
            <Plus className="h-5 w-5" />
            Add Product
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-background">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map(product => (
                  <tr key={product.id} className="hover:bg-background transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div>
                          <p className="font-semibold text-text-primary">{product.name}</p>
                          <p className="text-text-secondary text-sm truncate max-w-xs">
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(product.category)}`}>
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-semibold text-primary">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`font-semibold ${
                        product.stock === 0 ? 'text-error' :
                        product.stock < 10 ? 'text-warning' :
                        'text-text-primary'
                      }`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/admin/products/edit/${product.id}`}
                          className="p-2 text-secondary hover:bg-secondary hover:text-white rounded-lg transition-colors"
                        >
                          <Edit className="h-5 w-5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id, product.name)}
                          className="p-2 text-error hover:bg-error hover:text-white rounded-lg transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
