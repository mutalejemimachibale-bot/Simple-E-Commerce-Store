import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { CATEGORIES } from '../types';
import { useProductStore } from '../stores/productStore';

export default function FilterSidebar() {
  const {
    selectedCategory,
    setCategory,
    priceRange,
    setPriceRange
  } = useProductStore();

  const [localMinPrice, setLocalMinPrice] = useState(priceRange[0]);
  const [localMaxPrice, setLocalMaxPrice] = useState(priceRange[1]);
  const [isOpen, setIsOpen] = useState(false);

  const handlePriceApply = () => {
    const min = Math.max(0, localMinPrice);
    const max = Math.min(10000, localMaxPrice);
    if (min <= max) {
      setPriceRange([min, max]);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-4 right-4 z-40 bg-primary text-white p-4 rounded-full shadow-lg"
      >
        <Filter className="h-6 w-6" />
      </button>

      <aside className={`
        fixed lg:static inset-0 z-30 lg:z-auto bg-white lg:bg-transparent transform transition-transform duration-300 lg:transform-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        w-72 lg:w-64 p-6 lg:p-0 h-full lg:h-auto overflow-y-auto
      `}>
        <div className="lg:sticky lg:top-24">
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <h2 className="font-display font-bold text-xl text-text-primary">Filters</h2>
            <button onClick={() => setIsOpen(false)} className="text-text-secondary">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-display font-semibold text-lg text-text-primary mb-4">
              Categories
            </h3>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === ''}
                  onChange={() => setCategory('')}
                  className="w-4 h-4 text-primary focus:ring-primary"
                />
                <span className="text-text-primary group-hover:text-primary transition-colors">
                  All Categories
                </span>
              </label>
              {CATEGORIES.map(category => (
                <label key={category} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === category}
                    onChange={() => setCategory(category)}
                    className="w-4 h-4 text-primary focus:ring-primary"
                  />
                  <span className="text-text-primary group-hover:text-primary transition-colors">
                    {category}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 mt-6">
            <h3 className="font-display font-semibold text-lg text-text-primary mb-4">
              Price Range
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-text-secondary text-sm">Min Price</label>
                <input
                  type="number"
                  value={localMinPrice}
                  onChange={(e) => setLocalMinPrice(Number(e.target.value))}
                  min={0}
                  max={10000}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
              </div>
              <div>
                <label className="text-text-secondary text-sm">Max Price</label>
                <input
                  type="number"
                  value={localMaxPrice}
                  onChange={(e) => setLocalMaxPrice(Number(e.target.value))}
                  min={0}
                  max={10000}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
              </div>
              <button
                onClick={handlePriceApply}
                className="w-full py-2 bg-secondary text-white rounded-lg hover:bg-opacity-90 transition-colors font-semibold"
              >
                Apply Price Filter
              </button>
            </div>

            <div className="mt-4 flex justify-between text-sm text-text-secondary">
              <span>Current: ${priceRange[0]}</span>
              <span> - </span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
