import React, { useState } from 'react';
import type { Product, CartItem } from '../types';
import { ShoppingCart, Plus, Minus, X } from 'lucide-react';

interface BillingSectionProps {
  products: Product[];
}

export default function BillingSection({ products }: BillingSectionProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [productNo, setProductNo] = useState('');

  const addToCart = () => {
    const product = products.find((p) => p.productNo === parseInt(productNo));
    if (product) {
      const existingItem = cart.find((item) => item.productNo === product.productNo);
      if (existingItem) {
        setCart(
          cart.map((item) =>
            item.productNo === product.productNo
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } else {
        setCart([...cart, { ...product, quantity: 1 }]);
      }
      setProductNo('');
    }
  };

  const updateQuantity = (productNo: number, delta: number) => {
    setCart(
      cart.map((item) =>
        item.productNo === productNo
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item
      ).filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (productNo: number) => {
    setCart(cart.filter((item) => item.productNo !== productNo));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const itemTotal = item.price * item.quantity;
      const discount = itemTotal * (item.discount / 100);
      return total + (itemTotal - discount);
    }, 0);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center space-x-4 mb-6">
        <input
          type="number"
          value={productNo}
          onChange={(e) => setProductNo(e.target.value)}
          placeholder="Enter Product No"
          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        <button
          onClick={addToCart}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add to Cart
        </button>
      </div>

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.productNo}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex-1">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-gray-500">
                ${item.price.toFixed(2)} (-{item.discount}%)
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item.productNo, -1)}
                  className="p-1 rounded-full hover:bg-gray-200"
                >
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.productNo, 1)}
                  className="p-1 rounded-full hover:bg-gray-200"
                >
                  <Plus size={16} />
                </button>
              </div>
              <button
                onClick={() => removeItem(item.productNo)}
                className="text-red-600 hover:text-red-800"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between text-lg font-semibold">
            <span>Total:</span>
            <span>${calculateTotal().toFixed(2)}</span>
          </div>
          <button
            onClick={() => setCart([])}
            className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Complete Purchase
          </button>
        </div>
      )}

      {cart.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <ShoppingCart size={48} className="mx-auto mb-4 opacity-50" />
          <p>Cart is empty</p>
        </div>
      )}
    </div>
  );
}