import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context'

import Button from '../button/button'

import CartItem from '../cart-item/cart-item.component'

import './cart-dropdown.styles.scss';

const CartDropdown = ({ dropdown }) => {
    const { cartItems } = useContext(CartContext)

    return (
        <div className={`cart-dropdown-container ${dropdown}`}>
            <div className='cart-items'>
                {cartItems.map(item => <CartItem key={item.id} cartItem={item} />)}
            </div>
            <Button>GO TO CHECKOUT</Button>
        </div>
    )
}

export default CartDropdown;