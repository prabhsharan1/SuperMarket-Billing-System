import React from 'react';
import { ShoppingCart } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingCart size={32} />
            <h1 className="text-2xl font-bold">SuperMart POS</h1>
          </div>
          <div className="text-sm">
            <p className="opacity-90">Modern Billing Solution</p>
          </div>
        </div>
      </div>
    </header>
  );
}