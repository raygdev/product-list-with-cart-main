import { expect, test, describe, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Card from './card'
import ShoppingCartProvider from '../../context/cart-provider'
import React from 'react'
import './card.css'
import { useCart } from '../../hooks/useCart'

describe('Card Component', () => {
    let cartToTest = []

    beforeEach(() => {
        cartToTest = []
    })

    function renderAndFireAddToCart() {
        const data = globalThis.data
        render(
          <ShoppingCartProvider>
            <Card dessert={data[0]} image={data[0].image} index={0} />
            <CartInspector inspectCart={cartInspect} />
          </ShoppingCartProvider> 
        )

        const addToCartButton = screen.getByRole('button', { name: /add to cart/i})

        expect(addToCartButton).toBeVisible()

        fireEvent.click(addToCartButton)
    }

    function CartInspector ({ inspectCart }) {
        const { cart } = useCart()
        inspectCart(cart)
        return null
    }

    function cartInspect(cart) {
        cartToTest = cart
    }
    test('renders the card',async () => {
      const data = globalThis.data
      render(
        <ShoppingCartProvider>
            <Card dessert={data[0]} image={data[0].image} index={0} />
        </ShoppingCartProvider>
      )
      expect(screen.getByRole('heading').textContent).toBe(data[0].name)
      
    })

    test('when add to cart is clicked, it disappears and a button group appears', async () => {
        renderAndFireAddToCart()

        await waitFor(() => {
            expect(screen.queryByRole('button', { name: /add to cart/i})).not.toBeInTheDocument()
            expect(screen.getAllByRole('button')).toHaveLength(2)
        })
    })

    test('adds an item to the cart', async () => {
        renderAndFireAddToCart()

        await waitFor(() => {
          expect(screen.queryByRole('button', { name: /add to cart/i })).not.toBeInTheDocument()
          expect(cartToTest[0].id).toBe(0)
        })
    })

    test('increases the item quantity after adding to cart', async () => {
        renderAndFireAddToCart()
        
        const increaseButton = screen.getByRole('button', { name: /add on/i })

        fireEvent.click(increaseButton)

        expect(cartToTest[0].quantity).toEqual(2)
    })

    test('decreases the item quantity after adding 2 items', async () => {
        renderAndFireAddToCart()
        
        const increaseButton = screen.getByRole('button', { name: /add on/i })

        fireEvent.click(increaseButton)

        fireEvent.click(screen.getByRole('button', { name: /remove one/i }))

        expect(cartToTest[0].quantity).toEqual(1)
    })

    test('removes item from cart if quantity is only one', async () => {
        renderAndFireAddToCart()

        fireEvent.click(screen.getByRole('button', { name: /remove one/i }))

        expect(cartToTest[0]).toBeUndefined()
    })
})