import React, { useState } from 'react';
import type { Product } from '../types';

interface ProductFormProps {
  onSubmit: (product: Product) => void;
  initialProduct?: Product;
}

export default function ProductForm({ onSubmit, initialProduct }: ProductFormProps) {
  const [product, setProduct] = useState<Product>(
    initialProduct || {
      productNo: '',
      name: '',
      price: '',
      discount: '',
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...product,
      productNo: Number(product.productNo),
      price: Number(product.price),
      discount: Number(product.discount),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
      <div>
        <label htmlFor="productNo" className="block text-sm font-medium text-gray-700">
          Product No
        </label>
        <input
          type="number"
          id="productNo"
          value={product.productNo}
          onChange={(e) => setProduct({ ...product, productNo: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          min="0"
          required
        />
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Product Name
        </label>
        <input
          type="text"
          id="name"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Price
        </label>
        <input
          type="number"
          id="price"
          step="0.01"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          min="0"
          required
        />
      </div>

      <div>
        <label htmlFor="discount" className="block text-sm font-medium text-gray-700">
          Discount (%)
        </label>
        <input
          type="number"
          id="discount"
          value={product.discount}
          onChange={(e) => setProduct({ ...product, discount: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          min="0"
          max="100"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {initialProduct ? 'Update Product' : 'Add Product'}
      </button>
    </form>
  );
}