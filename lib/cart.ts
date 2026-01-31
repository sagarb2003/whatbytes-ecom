import { Product, CartItem } from "@/types";

const CART_KEY = "shopping-cart";

export const getCart = (): CartItem[] => {
    if (typeof window === "undefined") return [];
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
};

export const addToCart = (product: Product, quantity: number = 1) => {
    if (typeof window === "undefined") return;
    const cart = getCart();
    const existingItem = cart.find((item) => item.id === product.id);

    let updatedCart;
    if (existingItem) {
        updatedCart = cart.map((item) =>
            item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
        );
    } else {
        updatedCart = [...cart, { ...product, quantity }];
    }

    localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cart-updated"));
};

export const removeFromCart = (productId: string) => {
    if (typeof window === "undefined") return;
    const cart = getCart();
    const updatedCart = cart.filter((item) => item.id !== productId);
    localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cart-updated"));
};

export const updateCartQuantity = (productId: string, quantity: number) => {
    if (typeof window === "undefined") return;
    if (quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    const cart = getCart();
    const updatedCart = cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
    );
    localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cart-updated"));
};

export const getCartTotalItems = (): number => {
    const cart = getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
};

export const getItemQuantity = (productId: string): number => {
    const cart = getCart();
    const item = cart.find((i) => i.id === productId);
    return item ? item.quantity : 0;
};
