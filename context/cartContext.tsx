"use client";
import { cartProduct } from "@/types/interface";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface CartContextType {
  cart: cartProduct[];
  addToCart: (product: cartProduct) => void;
  removeFromCart: (index: number) => void;
  updateProductCount: (productId: string, count: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<cartProduct[]>([]);

  const addToCart = (product: cartProduct) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (p) => p._id === product._id && p.size === product.size
      );
      if (existingProduct) {
        return prevCart.map((p) =>
          p._id === product._id && p.size === product.size
            ? { ...p, count: p.count + product.count }
            : p
        );
      } else {
        return [...prevCart, { ...product, count: product.count }];
      }
    });
  };

  const removeFromCart = (index: number) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const updateProductCount = (productId: string, count: number) => {
    setCart((prevCart) =>
      prevCart.map((product) =>
        product._id === productId ? { ...product, count } : product
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateProductCount }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
