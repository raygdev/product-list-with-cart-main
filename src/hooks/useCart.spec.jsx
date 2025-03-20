import { test, expect, describe } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCart } from "./useCart";
import ShoppingCartProvider from "../context/cart-provider";

describe("useCart hook", () => {
  const Wrapper = ({ children }) => (
    <ShoppingCartProvider>{children}</ShoppingCartProvider>
  );

  const createMockItem = () => {
    const data = globalThis.data;
    const mockItem = {
      id: 0,
      image: data[0].image.thumbnail,
      quantity: 1,
      name: data[0].name,
      price: data[0].price.toFixed(2),
    };

    return mockItem;
  };

  const renderWithHookAndItem = () => {
    const mockItem = createMockItem();
    const { result } = renderHook(() => useCart(), { wrapper: Wrapper });
    const { addToCart, removeItem, increaseQuantity, decreaseQuantity } =
      result.current;
    return {
      mockItem,
      result,
      addToCart,
      removeItem,
      increaseQuantity,
      decreaseQuantity,
    };
  };

  test("addToCart adds an item to the cart", () => {
    const { mockItem, result } = renderWithHookAndItem();

    const { addToCart } = result.current;

    act(() => {
      addToCart(mockItem);
    });

    expect(result.current.cart).toEqual([mockItem]);
  });

  test("increaseQuantity increases the item quantity", () => {
    const { mockItem, result, addToCart, increaseQuantity } =
      renderWithHookAndItem();

    act(() => {
      addToCart(mockItem);
      increaseQuantity(mockItem.id);
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].quantity).toBe(2);
  });

  test("handles adding multiple items to the cart", () => {
    const { mockItem: mockItem1, result, addToCart } = renderWithHookAndItem();
    const mockItem2 = { ...mockItem1, id: 1 };

    act(() => {
      addToCart(mockItem1);
      addToCart(mockItem2);
    });

    expect(result.current.cart).toHaveLength(2);
    expect(result.current.cart[0]).toEqual(mockItem1);
    expect(result.current.cart[1]).toEqual(mockItem2);
  });

  test("handles updating quantity for the correct item", () => {
    const {
      mockItem: mockItem1,
      result,
      addToCart,
      increaseQuantity,
    } = renderWithHookAndItem();
    const mockItem2 = { ...mockItem1, id: 1 };

    act(() => {
      addToCart(mockItem1);
      addToCart(mockItem2);
      increaseQuantity(mockItem2.id);
    });

    const [item1, item2] = result.current.cart;

    expect(item1.id).toBe(mockItem1.id);
    expect(item2.id).toEqual(mockItem2.id);

    expect(item1.quantity).toEqual(1);
    expect(item2.quantity).toEqual(2);
  });

  test("decrease quantity removes item from cart if quantity is 1", () => {
    const { mockItem, result, addToCart, decreaseQuantity } =
      renderWithHookAndItem();

    act(() => {
      addToCart(mockItem);
    });

    expect(result.current.cart).toHaveLength(1);

    act(() => {
      decreaseQuantity(mockItem.id);
    });

    expect(result.current.cart).toHaveLength(0);
  });

  test("decrease quantity handles decreasing a quantity greater than 1", () => {
    const { mockItem, result, addToCart, increaseQuantity, decreaseQuantity } =
      renderWithHookAndItem();

    act(() => {
      addToCart(mockItem);
      increaseQuantity(mockItem.id);
    });

    expect(result.current.cart[0].quantity).toEqual(2);

    act(() => {
      decreaseQuantity(mockItem.id);
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].quantity).toEqual(1);
  });

  test("removes the whole item from the cart", () => {
    const { mockItem, result, addToCart, removeItem, increaseQuantity } =
      renderWithHookAndItem();

    act(() => {
      addToCart(mockItem);
      increaseQuantity(mockItem.id);
    });

    expect(result.current.cart[0].quantity).toEqual(2);

    act(() => {
      removeItem(mockItem.id);
    });

    expect(result.current.cart).toHaveLength(0);
  });

  test("removes the correct item from the cart", () => {
    const {
      mockItem: mockItem1,
      result,
      addToCart,
      removeItem,
    } = renderWithHookAndItem();
    const mockItem2 = { ...mockItem1, id: 1 };

    act(() => {
      addToCart(mockItem1);
      addToCart(mockItem2);
    });

    act(() => {
      removeItem(mockItem1.id);
    });

    expect(result.current.cart).toHaveLength(1);

    expect(result.current.cart[0].id).toEqual(mockItem2.id);
  });
});
