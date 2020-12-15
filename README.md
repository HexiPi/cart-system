# __Cart System React.JS Component by _#HexiPi___

## __<u>Installation:</u>__

````
npm install cart-system-hexipi --save

OR

yarn add cart-system-hexipi
````

## __<u>Example of Usage:</u>__

````javascript
import React, { Component } from 'react';
import { CartButton, AddToCartButton } from 'cart-system-hexipi';
import { getCurrentPageBgColor, getMonochromeColor } from 'color-functions-hexipi';
import CheckoutPage from './checkout';
import './App.css';

class CartButtonDemo extends Component {
    state = {
        cartItems: [], //Holds the items added to the cart as an array of JSON objects
        wasItemAdded: false, //Flag that indicates whether an item was recently
                                //added to the cart
    };

    //Used to add items to the cart array
    addItemToCart = (item) => {
        const currentCart = [...this.state.cartItems];
        currentCart.push(item);

        this.setState({
            cartItems: currentCart,
            wasItemAdded: true,
        });
    }

    //Used to reset the "wasItemAdded" flag
    resetItemAddedFlag = () => this.setState({ wasItemAdded: false });
    
    //Used to update the cart items, whenever the user updates a cart item's quantity
    updateCart = (items) => this.setState({ cartItems: items });

    //Used to clear the cart items
    clearCart = () => this.setState({ cartItems: [] });

    render() {
        return (
            <div className="App-header">
                <CartButton
                    sidePanelBgColor={
                        getMonochromeColor(getCurrentPageBgColor(), 4)
                    }
                    cartItems={this.state.cartItems}
                    wasItemAdded={this.state.wasItemAdded}
                    resetWasItemAddedFlag={this.resetItemAddedFlag}
                    updateCart={this.updateCart}
                    clearCart={this.clearCart}
                    checkoutPage={<CheckoutPage />}
                />

                <section>
                    Test Item #1&nbsp;
                    <AddToCartButton 
                        itemData={
                            { 
                                _id: 1, 
                                name: "Test Item #1", 
                                unit_price: 4.99, 
                                quantity: 1 
                            }
                        }
                        addItemToCart={this.addItemToCart}
                    />
                    <br />
                    <br />
                    Test Item #2&nbsp;
                    <AddToCartButton 
                        itemData={
                            { 
                                _id: 2, 
                                name: "Test Item #2", 
                                unit_price: 10.99, 
                                quantity: 1 
                            }
                        }
                        addItemToCart={this.addItemToCart}
                        target={
                            <button className="button-transparent">
                                Add to Cart
                            </button>
                        }
                    />
                </section>
            </div>
        );
    }
}

export default CartButtonDemo;
````

## __<u>Attributes & Data Types for CartButton:</u>__

### Below is a list of all the available __attributes__:
<br>

````typescript
interface CartButtonProps {
    //The array of the type "CartItemData" that will contain the items that are 
    //in the user's cart;
    //This is simply a property that is passed into the CartButton component;
    //Its state should be maintained externally
    cartItems: CartItemData[],

    //The tax percentage that will be charged
    taxPercentage: number,

    //The flag that indicates whether an item was recently added to the cart;
    //This is simply a property that is passed into the CartButton component;
    //Its state should be maintained externally
    wasItemAdded: boolean,

    //The custom checkout page that would appear when the 
    //user is ready to check out
    checkoutPage: React.Component,

    //The optional custom icon that is displayed on the CartButton
    buttonIcon?: object,

    //The optional color value that determines the color of the CartButton;
    //The colors are based on Bootstrap button colors
    buttonColor?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' 
                | 'info' | 'light' | 'dark' | 'link',

    //The optional custom color of the cart side panel
    sidePanelBgColor?: string,

    //The optional custom text that would be displayed whenever the user
    //adds an item to the cart
    toastText?: string,

    //The optional custom text that would be displayed on the cart side panel
    //whenever the user's cart is empty
    cartEmptyText?: string,

    //The callback that is executed so that the "wasItemAdded" 
    //flag can be reset
    resetWasItemAddedFlag: () => void,

    //The callback that is executed so that the cart items 
    //can be updated
    updateCart: (cartItems: CartItemData[]) => void,

    //The callback that is executed so that the cart items 
    //can be cleared
    clearCart: () => void
}
````
#### <u>Note:</u> Most attributes are technically optional since they already have default values assigned to them (with the exception of the cartItems and the wasItemAdded attributes). However the ones that are actually optional (marked with a "?") will not be shown or used by default. __All callback functions are required if you actually want the cart system to work properly.__
<br>

### Below are all the available values of the __CartButtonProps__ default values:
<br>

````typescript
CartButtonProps.defaultProps = {
    //A tax percentage of 8.25%
    taxPercentage: 8.25,

    buttonColor: 'primary' as 'primary' | 'secondary' | 'success' | 'danger' 
                | 'warning' | 'info' | 'light' | 'dark' | 'link',

    sidePanelBgColor: 'grey',

    toastText: 'Added to Cart!',

    cartEmptyText: 'Oh No! Your Cart is Empty!'
}
````
<br>

### The following describes the props that are made available to the component that is passed into the __checkout__ attribute, which could then be used as needed.

<br>

### Below are all the available values of the __CheckoutPageProps__ interface:

````typescript
interface CheckoutPageProps {
    //The array of the type "CartItemData" that will contain the items that are 
    //in the user's cart
    cartItems: CartItemData[],

    //The JSON object of the type "CartItemsTotalsData" that will contain the 
    //subtotal, tax, and grand total values of the items in the user's cart
    totalsData: CartItemsTotalsData,

    //Triggers the checkout page to close
    closeCheckoutModal: () => void,

    //Triggers the checkout process to cancel
    checkoutModalCancel: () => void
}
````

<br>

### Below are all the available values of the __CartItemData__ interface:
<br>

````typescript
interface CartItemData {
    //The item's unique ID;
    //This should be the same ID that represents your item on your database
    _id: string,

    //The name of the item or a title that describes it
    name: string,

    //Cost per unit item in USD;
    //More supported currencies will be added in the future
    unit_price: number,

    //Quantity of the item
    quantity: number,

    //The optional ID that is assigned to the item while it is in the cart;

    //This is different from the "_id" field, as this is only used while the item
    //is in the cart and is not static, meaning it could be different every time
    //the item is added to the cart;

    //It is recommended that this field is left empty, as the AddToCartButton
    //component automatically assigns this field a value
    cart_item_id?: string,
}
````
#### <u>Note:</u> This is the format of the JSON object that should be used whenever assigning the itemData attribute on the AddToCartButton component. You may add additional properties or data to the JSON object as necessary (example: color, category, yearOfManufacture, etc.), but __the above properties are the essential properties that are required so that cart system can work properly__.
<br>

### Below are all the available values of the __CartItemsTotalsData__ interface:

````typescript
interface CartItemsTotalsData {
    //Subtotal amount of the items in the user's cart
    subtotal: number,

    //Total tax amount of the items in the user's cart
    tax: number,

    //Grand total amount (subtotal + tax) of the items in the user's cart
    grandTotal: number,
}
````
<br>

### Below is a (crappy 😅) __sample checkout page__ showing how to use the __CheckoutPageProps__ :

````javascript
import React from 'react';

const Checkout = props => {
    const renderItems = cartItems => {
        return cartItems.map(item => (
            <p>
                {item.name}:<br />
                &nbsp;&nbsp;&nbsp;&nbsp;Quantity: {item.quantity}<br />
                &nbsp;&nbsp;&nbsp;&nbsp;Unit Price: ${item.unit_price}<br />
                &nbsp;&nbsp;&nbsp;&nbsp;
                    Total Price: ${item.quantity * item.unit_price}
            </p>
        ));
    }

    return (
        <div>
            <button onClick={props.checkoutModalCancel}>Cancel</button>
            &nbsp;
            <button onClick={props.closeCheckoutModal}>Submit Order</button>
            <br /><br />
            <div>
                {renderItems(props.cartItems)}
            </div>
            <br /><br />
            Subtotal: ${props.totalsData.subtotal.toFixed(2)}<br />
            Tax: ${props.totalsData.tax.toFixed(2)}<br />
            Grand Total: ${props.totalsData.grandTotal.toFixed(2)}
            <br /><br />
            <button onClick={props.checkoutModalCancel}>Cancel</button>
            &nbsp;
            <button onClick={props.closeCheckoutModal}>Submit Order</button>
        </div>
    );
}

export default Checkout;
````
<br>

## __<u>Attributes & Data Types for AddToCartButton:</u>__

### Below is a list of all the available __attributes__:
<br>

````typescript
interface AddToCartButtonProps {
    //The JSON object of the type "CartItemData" that holds the data of the
    //item associated with the AddToCartButton;
    //The data must follow the structure of the "CartItemData" interface,
    //but it may include extra properties as necessary.
    itemData: CartItemData,

    //The optional custom text that the AddToCartButton will display
    buttonText?: string,

    //The optional color value that determines the color of the CartButton;
    //The colors are based on Bootstrap button colors
    buttonColor?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' 
                | 'info' | 'light' | 'dark' | 'link',

    //IMPLEMENTATION TO COME...
    doesUpdateQuantity?: boolean,

    //The optional custom button or component that will trigger the
    //"add to cart" action;
    //Using this property will disable the "buttonText" and "buttonColor" properties
    //Any customizations need to be done externally
    target?: any,

    //The callback that is executed when the AddToCartButton is clicked;
    //The "item" parameter holds the data of the item 
    //which is of the type "CartItemData"
    addItemToCart: (item: CartItemData) => void
}
````

#### <u>Note:</u> Most attributes are technically optional since they already have default values assigned to them (with the exception of the itemData attribute). However the ones that are actually optional (marked with a "?") will not be shown or used by default. __All callback functions are required if you actually want the cart system to work properly.__
<br>

### Below are all the available values of the __AddToCartButtonProps__ default values:
<br>

````typescript
AddToCartButtonProps.defaultProps = {
    buttonText = 'Add to Cart',

    buttonColor = 'primary' as 'primary' | 'secondary' | 'success' | 'danger' 
                | 'warning' | 'info' | 'light' | 'dark' | 'link', 

    doesUpdateQuantity = true,

    target = null,
}
 
````
<br>

### Below are all the available values of the __CartItemData__ interface:
<br>

````typescript
interface CartItemData {
    //The item's unique ID;
    //This should be the same ID that represents your item on your database
    _id: string,

    //The name of the item or a title that describes it
    name: string,

    //Cost per unit item in USD;
    //More supported currencies will be added in the future
    unit_price: number,

    //Quantity of the item
    quantity: number,

    //The optional ID that is assigned to the item while it is in the cart;

    //This is different from the "_id" field, as this is only used while the item
    //is in the cart and is not static, meaning it could be different every time
    //the item is added to the cart;

    //It is recommended that this field is left empty, as the AddToCartButton
    //component automatically assigns this field a value
    cart_item_id?: string,
}
````
#### <u>Note:</u> This is the format of the JSON object that should be used whenever assigning the itemData attribute on the AddToCartButton component. You may add additional properties or data to the JSON object as necessary (example: color, category, yearOfManufacture, etc.), but __the above properties are the essential properties that are required so that cart system can work properly__.
<br>