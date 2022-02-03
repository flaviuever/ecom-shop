import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';


function CartSection({ openCart, 
    numOfProducts,  
    priceAfterDiscount, 
    closeCart,
    selectedLanguage}) {
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));
    
    return (
        <div className="cart">
        <button className="returnBtn" onClick={closeCart}>{selectedLanguage.labelForBackToProdList}</button>
        <span className='label'>{selectedLanguage.labelForTotalPrice} : {priceAfterDiscount}</span>

<IconButton aria-label="cart" onClick={openCart}>
    <StyledBadge badgeContent={numOfProducts} color="secondary">
        <ShoppingCartIcon />
    </StyledBadge>
</IconButton>
        </div>
    )
}

export default CartSection;