import * as React from 'react';
import { Modal, ModalBody, ModalHeader, Button } from 'reactstrap';
import { CartItemData } from './CartItem';

interface RemoveItemModalProps {
    isOpen: boolean,
    item: CartItemData,
    onModalToggle: () => void,
    onRemoveItem: () => void,
}

const RemoveItemModal = (props: RemoveItemModalProps) => {
    return (
        <Modal id="remove-cart-item-modal" centered={true} isOpen={props.isOpen} toggle={props.onModalToggle} zIndex={9999}>
            <ModalHeader id="remove-cart-item-modal-header" toggle={props.onModalToggle}>
                Remove Item From Cart?
            </ModalHeader>
            <ModalBody id="remove-cart-item-modal-body">
                <p>Are you sure you want to remove {props.item.name} from your cart?</p>
                <br />
                <div style={{ textAlign: 'right' }}>
                    <Button color="primary" onClick={props.onModalToggle}>No</Button>
                    &nbsp;
                    <Button color="danger" onClick={props.onRemoveItem}>Yes</Button>
                </div>
            </ModalBody>
        </Modal>
    );
}

export default RemoveItemModal;