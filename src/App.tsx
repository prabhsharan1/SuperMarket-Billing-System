import React, { useState } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import BillingSection from './components/BillingSection';
import type { Product } from './types';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<'products' | 'billing'>('products');

  const handleAddProduct = (product: Product) => {
    if (products.some((p) => p.productNo === product.productNo)) {
      alert('Product number already exists!');
      return;
    }
    setProducts([...products, product]);
  };

  const handleEditProduct = (product: Product) => {
    setProducts(
      products.map((p) => (p.productNo === product.productNo ? product : p))
    );
    setEditingProduct(null);
  };

  const handleDeleteProduct = (productNo: number) => {
    setProducts(products.filter((p) => p.productNo !== productNo));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'products'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Manage Products
          </button>
          <button
            onClick={() => setActiveTab('billing')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'billing'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Billing
          </button>
        </div>

        {activeTab === 'products' && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold mb-4">Product List</h2>
              <ProductList
                products={products}
                onEdit={setEditingProduct}
                onDelete={handleDeleteProduct}
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <ProductForm
                onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
                initialProduct={editingProduct || undefined}
              />
            </div>
          </div>
        )}

        {activeTab === 'billing' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Billing</h2>
            <BillingSection products={products} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;