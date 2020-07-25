import React, { Component } from 'react';
import { CartButton, AddToCartButton } from './CartSystem.ts';
import { getCurrentPageBgColor, getMonochromeColor } from 'color-functions-hexipi';
import './App.css';

class CartButtonDemo extends Component {
    state = {
        cartItems: [],
        wasItemAdded: false,
    };

    addItemToCart = (item) => {
        const currentCart = [...this.state.cartItems];
        currentCart.push(item);

        this.setState({
            cartItems: currentCart,
            wasItemAdded: true,
        });
    }

    resetItemAddedFlag = () => this.setState({ wasItemAdded: false });
    updateCart = (items) => this.setState({ cartItems: items });
    clearCart = () => this.setState({ cartItems: [] });

    render() {
        return (
            <div className="App-header">
                <CartButton
                    sidePanelBgColor={getMonochromeColor(getCurrentPageBgColor(), 4)}
                    cartItems={this.state.cartItems}
                    wasItemAdded={this.state.wasItemAdded}
                    resetWasItemAddedFlag={this.resetItemAddedFlag}
                    updateCart={this.updateCart}
                    clearCart={this.clearCart}
                />

                <section>
                    Test Item #1&nbsp;
                    <AddToCartButton 
                        itemData={{ _id: 1, name: "Test Item #1", unit_price: 4.99, quantity: 1 }}
                        addItemToCart={this.addItemToCart}
                    />
                    <br />
                    <br />
                    Test Item #2&nbsp;
                    <AddToCartButton 
                        itemData={{ _id: 1, name: "Test Item #2", unit_price: 10.99, quantity: 1 }}
                        addItemToCart={this.addItemToCart}
                    />
                </section>
            </div>
        );
    }
}

export default CartButtonDemo;