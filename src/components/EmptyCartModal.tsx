import * as React from 'react';
import { Modal, ModalBody, ModalHeader, Button } from 'reactstrap';

interface EmptyCartModalProps {
    isOpen: boolean,
    onModalToggle: () => void,
    onEmptyCart: () => void,
}

const EmptyCartModal = (props: EmptyCartModalProps) => {
    return (
        <Modal id="empty-cart-modal" centered={true} isOpen={props.isOpen} toggle={props.onModalToggle} zIndex={9999}>
            <ModalHeader id="empty-cart-modal-header" toggle={props.onModalToggle}>
                Empty Cart?
            </ModalHeader>
            <ModalBody id="empty-cart-modal-body">
                <p>Are you sure you want to empty your cart?</p>
                <br />
                <div style={{ textAlign: 'right' }}>
                    <Button color="primary" onClick={props.onModalToggle}>No</Button>
                    &nbsp;
                    <Button color="danger" onClick={props.onEmptyCart}>Yes</Button>
                </div>
            </ModalBody>
        </Modal>
    );
}

export default EmptyCartModal;