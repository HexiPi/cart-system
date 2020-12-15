import React from 'react';

const Checkout = props => {
    const renderItems = cartItems => {
        return cartItems.map(item => (
            <p>
                {item.name}:<br />
                &nbsp;&nbsp;&nbsp;&nbsp;Quantity: {item.quantity}<br />
                &nbsp;&nbsp;&nbsp;&nbsp;Unit Price: ${item.unit_price}<br />
                &nbsp;&nbsp;&nbsp;&nbsp;Total Price: ${item.quantity * item.unit_price}
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