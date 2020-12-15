import * as React from 'react';
import { CSSProperties } from 'react';
// import * as PropTypes from 'prop-types';
import ReactSnackBar from 'react-js-snackbar';
import { getContrastYIQ } from 'color-functions-hexipi';
import { Button, Badge } from 'reactstrap';
import { CartItem, CartItemData, CartItemDataDefaults } from './CartItem';
import CheckoutModal from './CheckoutModal';
import EmptyCartModal from './EmptyCartModal';
import RemoveItemModal from './RemoveItemModal';
import '../css/cartButtonStyle.css';

import WhiteShoppingCart from '../assets/shopping_cart-white-24dp.svg';
import BlackShoppingCart from '../assets/shopping_cart-black-24dp.svg';
// const WhiteShoppingCart = require('../assets/shopping_cart-white-24dp.svg') as string;
// const BlackShoppingCart = require('../assets/shopping_cart-black-24dp.svg') as string;

export interface CartItemsTotalsData {
    subtotal: number,
    tax: number,
    grandTotal: number,
}

interface CartButtonProps {
    buttonIcon: object,
    buttonColor: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link',
    sidePanelBgColor: string,
    toastText: string,
    cartEmptyText: string,
    taxPercentage: number,
    cartItems: CartItemData[],
    wasItemAdded: boolean,
    checkoutPage: React.Component,
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
        showCheckoutModal: false,
        showEmptyCartModal: false,
        showRemoveCartItemModal: false,
        itemForRemoval: { 
            itemData: CartItemDataDefaults,
        },
        totalsData: {
            subtotal: 0.00,
            tax: 0.00,
            grandTotal: 0.00,
        }
    };

    componentDidUpdate = (prevProps: CartButtonProps) => {
        if (!prevProps.wasItemAdded && this.props.wasItemAdded) {
            setTimeout(() => {
                this.props.resetWasItemAddedFlag();
            }, 2000);
        }

        if (JSON.stringify(prevProps.cartItems) !== JSON.stringify(this.props.cartItems)) {
            this.calculateTotals(this.props.cartItems);
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

    emptyCart = () => {
        this.setState({ showEmptyCartModal: true });
    }

    calculateTotals = (cartItems: CartItemData[], callback: () => void = () => {}) => {
        let subtotal = 0.00;

        cartItems.forEach(item => {
            subtotal += parseFloat(item.unit_price.toString()) * parseInt(item.quantity.toString());
        });

        const tax = subtotal * (parseFloat(this.props.taxPercentage.toString()) / 100);
        const grandTotal = subtotal + tax;

        this.setState({
            totalsData: {
                subtotal: Number(subtotal.toFixed(2)),
                tax: Number(tax.toFixed(2)),
                grandTotal: Number(grandTotal.toFixed(2))
            }
        }, callback);
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
                    removeItem={() => this.setState({ showRemoveCartItemModal: true, itemForRemoval: { itemData: item } })} 
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
                <Button color="success" style={{float: 'right'}} onClick={() => this.setState({ showCheckoutModal: !this.state.showCheckoutModal, sidePanelShow: false })}>Checkout</Button>
            </div>
        );
    }

    renderTotals = () => {
        return (
            <div className="total-container" style={{ color: getContrastYIQ(this.props.sidePanelBgColor) }}>
                <h5><span>Subtotal</span>: ${this.state.totalsData.subtotal.toFixed(2)}</h5>
                <br />
                <h5><span>Tax</span>: ${this.state.totalsData.tax.toFixed(2)}</h5>
                <br />
                <h3 style={{fontWeight: 'bolder'}}><span>Total</span>: ${this.state.totalsData.grandTotal.toFixed(2)}</h3>
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

    renderModals = () => (
        <div>
            <CheckoutModal
                isOpen={this.state.showCheckoutModal}
                cartItems={this.props.cartItems}
                totalsData={this.state.totalsData}
                checkoutPage={this.props.checkoutPage}
                onCheckoutModalClose={() => this.setState({ showCheckoutModal: false })}
                onCheckoutModalCancel={() => this.setState({ showCheckoutModal: false, sidePanelShow: true })}
            />

            <EmptyCartModal
                isOpen={this.state.showEmptyCartModal}
                onModalToggle={() => this.setState({ showEmptyCartModal: !this.state.showEmptyCartModal })}
                onEmptyCart={() => { this.props.clearCart(); this.setState({ showEmptyCartModal: !this.state.showEmptyCartModal }); }}
            />

            <RemoveItemModal
                isOpen={this.state.showRemoveCartItemModal}
                item={this.state.itemForRemoval.itemData}
                onModalToggle={() => this.setState({ showRemoveCartItemModal: !this.state.showRemoveCartItemModal })}
                onRemoveItem={() => { this.removeCartItem(this.state.itemForRemoval.itemData); this.setState({ showRemoveCartItemModal: !this.state.showRemoveCartItemModal, itemForRemoval: { itemData: CartItemDataDefaults } }); }}
            />
        </div>
    );

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
                {this.renderModals()}
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