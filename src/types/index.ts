export interface Product {
  productNo: string | number;
  name: string;
  price: string | number;
  discount: string | number;
}

export interface CartItem extends Omit<Product, 'productNo' | 'price' | 'discount'> {
  productNo: number;
  price: number;
  discount: number;
  quantity: number;
}