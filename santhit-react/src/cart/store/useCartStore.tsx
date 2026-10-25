import type { CartItem } from "../dto/CartItem.ts";
import type { ProductDto } from "../../product/dto/ProductDto.ts";
import { create } from "zustand/react";
import { createJSONStorage, persist } from "zustand/middleware";

interface CartStore {
    cartItems: CartItem[];
    addToCart: (item: ProductDto, quantity: number) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
    totalAmount: () => number;
}

export const toCartItem = (
    item: ProductDto,
    quantity: number = 1
): CartItem => {
    return {
        productId: item.id,
        name: item.name,
        image: item.image,
        price: item.price,
        size: item.size,
        category: item.category,
        invitationTemplate: item.invitationTemplate,
        quantity: quantity,
    };
};

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            // ✅ cartItems
            cartItems: [],
            addToCart: (item, quantity) => {
                const exists = get().cartItems.some(
                    (itm) => itm.productId === item.id
                );
                // Already in cart
                if (exists) {
                    return;
                }
                const cartItem = toCartItem(item, quantity);
                set({
                    cartItems: [
                        ...get().cartItems,
                        cartItem,
                    ],
                });
            },
            removeFromCart: (id) => {
                set({
                    cartItems: get().cartItems.filter(
                        (itm) => itm.productId !== id
                    ),
                });
            },
            clearCart: () => {
                set({
                    cartItems: [],
                });
            },
            // ✅ price × quantity
            totalAmount: () => {
                return get().cartItems.reduce(
                    (total, item) =>
                        total + item.price * item.quantity,
                    0
                );
            },
        }),
        {
            name: "cartItems",
            storage: createJSONStorage(() => localStorage),
        }
    )
);