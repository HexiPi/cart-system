import * as React from 'react';
import { Button, ButtonGroup, Card, CardBody, CardTitle, CardSubtitle, Input } from 'reactstrap';
import '../css/cartItemStyle.css';

import Close from '../assets/close-black-18dp.svg';
import Delete from '../assets/delete-white-24dp.svg';
// const Close = require('../assets/close-black-18dp.svg') as string;
// const Delete = require('../assets/delete-white-24dp.svg') as string;

interface CartItemData {
    cart_item_id?: string,
    _id: string,
    name: string,
    unit_price: number,
    quantity: number
}

interface CartItemProps {
    cart_item_id: string,
    _id: string,
    name: string,
    unit_price: number,
    quantity: number,
    updateItem: (itemData: CartItemData) => void,
    removeItem: (itemData: CartItemData) => void
};

const CartItemDataDefaults: CartItemData = { _id: '', name: '', unit_price: 0.00, quantity: 0 };

class CartItem extends React.Component<CartItemProps, {}> {
    static defaultProps = {
        cart_item_id: '',
    }

    state = {
        itemPrice: (this.props.unit_price * (this.props.quantity)).toFixed(2),
        quantity: this.props.quantity,
    };

    removeItem = () => this.props.removeItem(this.props);

    incrementQuantity = () => {
        const newQuantity = this.state.quantity + 1;
        const newPrice = (parseFloat(this.props.unit_price.toString()) * newQuantity).toFixed(2);

        this.setState({ 
            quantity: newQuantity, 
            itemPrice: newPrice
        }, () => this.props.updateItem({ 
            ...this.props, 
            quantity: newQuantity 
        }));
    }

    decrementQuantity = () => {
        if (this.state.quantity <= 1) {
            this.removeItem();
        }
        else {
            const newQuantity = this.state.quantity - 1;
            const newPrice = (parseFloat(this.props.unit_price.toString()) * newQuantity).toFixed(2);

            this.setState({ 
                quantity: newQuantity, 
                itemPrice: newPrice
            }, () => this.props.updateItem({ 
                ...this.props, 
                quantity: newQuantity 
            }));
        }
    }

    renderQuantityButtons = () => (
        <div className="cart-item-quantity-button-group">
            <ButtonGroup>
                {
                    (this.state.quantity === 1)
                    ?
                        <Button color="danger" onClick={this.decrementQuantity}><img src={Delete} alt="remove item" /></Button>
                    :
                        <Button color="dark" onClick={this.decrementQuantity}>-</Button>
                }
                <Input className="cart-item-quantity-input" type="number" value={this.state.quantity} disabled={true} />
                <Button color="dark" onClick={this.incrementQuantity}>+</Button>
            </ButtonGroup>            
        </div>
    );

    render() {
        return (
            <Card className="cart-item-container">
                <CardBody>
                    <div className="remove-item-button-container">
                        <Button className="remove-item-button" color="link" onClick={this.removeItem}><img src={Close} alt="remove item" /></Button>
                    </div>
                    <CardTitle className="cart-item-title">{this.props.name}</CardTitle>
                    <CardSubtitle className="cart-item-price">{`$${this.state.itemPrice}`}</CardSubtitle>
                    <br />
                    {this.renderQuantityButtons()}
                </CardBody>
            </Card>
        );
    }
}

export { CartItem, CartItemDataDefaults};
export type { CartItemData };