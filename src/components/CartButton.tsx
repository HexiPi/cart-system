import * as React from 'react';
import { CSSProperties } from 'react';
// import * as PropTypes from 'prop-types';
import ReactSnackBar from 'react-js-snackbar';
import { getContrastYIQ } from 'color-functions-hexipi';
import { Button, Badge } from 'reactstrap';
import { CartItem, CartItemData } from './CartItem';
import '../css/cartButtonStyle.css';

const WhiteShoppingCart = require('../assets/shopping_cart-white-24dp.svg') as string;
const BlackShoppingCart = require('../assets/shopping_cart-black-24dp.svg') as string;

interface CartButtonProps {
    buttonIcon: object,
    buttonColor: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link',
    sidePanelBgColor: string,
    toastText: string,
    cartEmptyText: string,
    taxPercentage: number,
    cartItems: CartItemData[],
    wasItemAdded: boolean,
    resetWasItemAddedFlag: () => void,
    updateCart: (cartItems: CartItemData[]) => void,
    clearCart: () => void
}

class CartButton extends React.Component<CartButtonProps, {}> {
    static defaultProps = {
        buttonColor: 'primary' as 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link',
        sidePanelBgColor: 'grey',
        toastText: 'Added to Cart!',
        cartEmptyText: 'Oh No! Your Cart is Empty!',
        taxPercentage: 8.25
    }

    state = {
        sidePanelShow: false,
    };

    componentDidUpdate = (prevProps: CartButtonProps) => {
        if (!prevProps.wasItemAdded && this.props.wasItemAdded) {
            setTimeout(() => {
                this.props.resetWasItemAddedFlag();
            }, 2000);
        }
    }

    cartButtonOnClick = () => this.setState({ sidePanelShow: !this.state.sidePanelShow, });

    renderButtonIcon = (isForSnackBar?: boolean) => {
        if (this.props.buttonIcon === undefined) {
            return <img src={(!isForSnackBar && (this.props.buttonColor === 'warning' || this.props.buttonColor === 'light')) ? BlackShoppingCart : WhiteShoppingCart} alt="shopping cart" />;
        }

        return this.props.buttonIcon;
    }

    updateCartItem = (item: CartItemData) => {
        const currCart = [...this.props.cartItems];

        const itemIndex = currCart.findIndex(it => it.cart_item_id === item.cart_item_id);
        currCart[itemIndex] = item;

        this.props.updateCart(currCart);
    }

    removeCartItem = (item: CartItemData) => {
        const res = window.confirm(`Are you sure you want to remove '${item.name}' from your cart?`);

        if (res) {
            const currCart = [...this.props.cartItems];

            const itemIndex = currCart.findIndex(it => it.cart_item_id === item.cart_item_id);
            
            if (itemIndex > -1) {
                currCart.splice(itemIndex, 1);
            }

            if (currCart.length === 0) {
                this.props.clearCart();
            }
            else {
                this.props.updateCart(currCart);
            }
        }
    }

    emptyCart = () => {
        const res = window.confirm('Are you sure you want to empty your cart?');

        if (res) {
            this.props.clearCart();
        }
    }

    renderCartItems = () => {
        const renderedItems: object[] = [];
        this.props.cartItems.forEach((item: CartItemData) => {
            renderedItems.push(
                <CartItem
                    key={item.cart_item_id}
                    cart_item_id={item.cart_item_id}
                    _id={item._id}
                    name={item.name}
                    unit_price={item.unit_price}
                    quantity={item.quantity}
                    updateItem={this.updateCartItem}
                    removeItem={this.removeCartItem} 
                />
            );
        });

        return renderedItems;
    }

    renderCartControlButtons = () => {
        return (
            <div className="cart-control-button-container">
                <Button color="danger" style={{float: 'left'}} onClick={this.emptyCart}>Empty Cart</Button>
                &nbsp;
                <Button color="success" style={{float: 'right'}}>Checkout</Button>
            </div>
        );
    }

    renderTotals = () => {
        let subtotal = 0.00;

        this.props.cartItems.forEach(item => {
            subtotal += parseFloat(item.unit_price.toString()) * parseInt(item.quantity.toString());
        });

        const tax = subtotal * (parseFloat(this.props.taxPercentage.toString()) / 100);
        const grandTotal = subtotal + tax;

        return (
            <div className="total-container" style={{ color: getContrastYIQ(this.props.sidePanelBgColor) }}>
                <h5><span>Subtotal</span>: ${subtotal.toFixed(2)}</h5>
                <br />
                <h5><span>Tax</span>: ${tax.toFixed(2)}</h5>
                <br />
                <h3 style={{fontWeight: 'bolder'}}><span>Total</span>: ${grandTotal.toFixed(2)}</h3>
            </div>
        );
    }

    renderInnerCartPanelContent = () => {
        const innerPanelHeading = (this.props.cartItems.length === 0) ? this.props.cartEmptyText : "Checkout";
        let innerPanelHeadingStyle: CSSProperties = {};
        innerPanelHeadingStyle.color = getContrastYIQ(this.props.sidePanelBgColor);
        let innerPanelContent = <div></div>;

        if (this.props.cartItems.length > 0) {
            innerPanelHeadingStyle.textDecoration = 'underline';
            innerPanelContent = (
                <div>
                    {this.renderCartControlButtons()}
                    <br />
                    {this.renderCartItems()}
                    <br />
                    {this.renderCartControlButtons()}
                    <br />
                    <div className="totals-divider" style={{ borderColor: getContrastYIQ(this.props.sidePanelBgColor) }}></div>
                    {this.renderTotals()}
                </div>
            );
        }

        return (
            <div className="inner-cart-panel">
                <div className="inner-cart-panel-heading" style={innerPanelHeadingStyle}>{innerPanelHeading}</div>
                {innerPanelContent}
            </div>
        );
    };

    render() {
        const buttonContent = (this.state.sidePanelShow) ? <span style={{fontSize: '1.5em'}}>&times;</span> : <div>{this.renderButtonIcon()}&nbsp;<Badge color="danger">{this.props.cartItems.length}</Badge></div>
        const buttonColor = (this.state.sidePanelShow) ? "danger" : this.props.buttonColor;

        return (
            <div>
                {/* <Snackbar
                    anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                    open={this.state.isAddToCartToastShown}
                    message={this.props.toastText}
                    onClose={() => this.setState({ isAddToCartToastShown: false })}
                    autoHideDuration={2000}
                /> */}
                <ReactSnackBar Icon={this.renderButtonIcon(true)} Show={this.props.wasItemAdded}>{this.props.toastText}</ReactSnackBar>
                <Button className="cart-button" color={buttonColor} onClick={this.cartButtonOnClick}>{buttonContent}</Button>
                <div className={`side-cart-panel ${(this.state.sidePanelShow) ? "slide-show" : "slide-hide" }`} style={{ backgroundColor: this.props.sidePanelBgColor }}>
                    {this.renderInnerCartPanelContent()}
                </div>
                <div className={`cart-transparent-film ${(this.state.sidePanelShow) ? "slide-show" : "slide-hide" }`} hidden={(!this.state.sidePanelShow)} onClick={this.cartButtonOnClick}></div>
            </div>
        );
    }
};

// //@ts-ignore
// CartButton.propTypes = {
//     buttonIcon: PropTypes.object,
//     buttonColor: PropTypes.string,
//     sidePanelBgColor: PropTypes.string,
//     toastText: PropTypes.string,
//     cartEmptyText: PropTypes.string,
//     taxPercentage: PropTypes.number.isRequired,
//     cartItems: PropTypes.array.isRequired,
//     wasItemAdded: PropTypes.bool,
//     resetWasItemAddedFlag: PropTypes.bool,
//     updateCart: PropTypes.func,
//     clearCart: PropTypes.func,
// }

// //@ts-ignore
// CartButton.defaultProps = {
//     buttonIcon: <ShoppingCart/>,
//     buttonColor: 'primary',
//     sidePanelBgColor: 'grey',
//     toastText: 'Added to Cart!',
//     cartEmptyText: 'Oh No! Your Cart is Empty!',
//     taxPercentage: 8.25,
//     cartItems: [], //Each item has a JSON object with properties { cart_item_id, _id, name, unit_price, quantity }
//     wasItemAdded: false,
//     resetWasItemAddedFlag: () => {},
//     updateCart: (_: CartItemData[]) => {},
//     clearCart: () => {},
// }

export default CartButton;