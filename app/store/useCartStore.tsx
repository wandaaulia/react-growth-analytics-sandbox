

import { create } from "zustand";


export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
}

export interface CartItem extends Product{
    quantity : number;
}

type CartState = {
   cart: CartItem[],
   addToCart: (product: Product) => void;
//    removeFromCart: (productId: string) => void;
//    clearCart: () => void
}

const useCartStore = create<CartState>()((set) => ({
    cart: [],
    addToCart: (product) => 
        set((state) => {
        const isProductInCart = state.cart.find((item) => item.id === product.id);

        if(isProductInCart) {
            return {
              cart : state.cart.map((item) => 
                 item.id === product.id ? {...item, quantity: item.quantity + 1} : item
            ),
            }
        }

        return { cart: [...state.cart, {...product, quantity : 1}]}
    })
}))

