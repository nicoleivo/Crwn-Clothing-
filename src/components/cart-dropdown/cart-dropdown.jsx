import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'

import { CartContext } from '../../contexts/cart.context'

import Button from '../button/button'

import CartItem from '../cart-item/cart-item.component'

import './cart-dropdown.styles.scss';

const CartDropdown = ({ dropdown }) => {
    const { cartItems } = useContext(CartContext)
    const navigate = useNavigate()

    const goToCheckoutHandler = () => {
        navigate('/checkout')
    }

    return (
        <div className={`cart-dropdown-container ${dropdown}`}>
            <div className='cart-items'>
                {cartItems.map(item => <CartItem key={item.id} cartItem={item} />)}
            </div>
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </div>
    )
}

export default CartDropdown;