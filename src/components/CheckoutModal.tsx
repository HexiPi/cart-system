import * as React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { CartItemsTotalsData } from './CartButton';
import { CartItemData } from './CartItem';

interface CheckoutModalProps {
    isOpen: boolean,
    cartItems: CartItemData[],
    totalsData: CartItemsTotalsData,
    checkoutPage: React.Component,
    onCheckoutModalClose: () => void,
    onCheckoutModalCancel: () => void,
}

const CheckoutModal = (props: CheckoutModalProps) => {
    const injectOnCheckoutModalCloseToTarget = (target: any) => {
        const targetClass = target.props.class;
        var targetClassName = target.props.className;
        
        if (!targetClassName) targetClassName = "";
        if (targetClass) targetClassName = `${targetClassName} ${targetClass}`;
    
        return React.cloneElement(target, 
            { 
                className: `${targetClassName}`,
                cartItems: props.cartItems,
                totalsData: props.totalsData,
                closeCheckoutModal: props.onCheckoutModalClose,
                checkoutModalCancel: props.onCheckoutModalCancel
            }
        );
    }

    return (
        <Modal id="checkout-modal" size="lg" centered={true} isOpen={props.isOpen} toggle={props.onCheckoutModalClose} zIndex={9999}>
            <ModalHeader id="checkout-modal-header" toggle={props.onCheckoutModalClose}>
                Checkout
            </ModalHeader>
            <ModalBody id="checkout-modal-body">
                {injectOnCheckoutModalCloseToTarget(props.checkoutPage)}
            </ModalBody>
        </Modal>
    );
}

export default CheckoutModal;