import * as React from 'react';
// import * as PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import * as uniqid from 'uniqid';
import { CartItemData } from './CartItem';

interface AddToCartButtonProps {
    itemData: CartItemData,
    buttonText?: string,
    buttonColor?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link',
    doesUpdateQuantity?: boolean,
    addItemToCart: (item: CartItemData) => void
}

const AddToCartButton: React.FunctionComponent<AddToCartButtonProps> = (props: AddToCartButtonProps) => {
    const { 
        itemData, 
        buttonText = 'Add to Cart', 
        buttonColor = 'primary' as 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link', 
        doesUpdateQuantity = true, 
        addItemToCart 
    } = props;

    const addToCart = () => {
        const item: CartItemData = {
            cart_item_id: uniqid(),
            ...itemData,
        };

        addItemToCart(item);
    }

    return <Button color={buttonColor} onClick={addToCart}>{buttonText}</Button>
}

//@ts-ignore
// AddToCartButton.propTypes = {
//     itemData: PropTypes.object.isRequired, //Must be a JSON object with properties { _id, name, unit_price, quantity }
//     addItemToCart: PropTypes.func.isRequired,
//     buttonText: PropTypes.string,
//     buttonColor: PropTypes.string, //Colors from bootstrap, eg. "primary", "secondary", "warning", "danger", etc.
//     doesUpdateQuantity: PropTypes.bool,
// }

export default AddToCartButton;