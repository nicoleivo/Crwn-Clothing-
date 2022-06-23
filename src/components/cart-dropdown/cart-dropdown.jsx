import Button from '../button/button'

import './cart-dropdown.styles.scss';

const CartDropdown = ({ dropdown }) => {
    return (
        <div className={`cart-dropdown-container ${dropdown}`}>
            <div className='cart-items' />
            <Button>GO TO CHECKOUT</Button>
        </div>
    )
}

export default CartDropdown;