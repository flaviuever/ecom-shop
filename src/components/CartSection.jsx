import './category.css'

function CartSection({ priceAfterDiscount, closeCart, selectedLanguage,}) {

    return (
            <div className="cart-section" >
                <div className="button-checkout">
                    <button className="btn btn-goToCheckout">{selectedLanguage.labelForGoToCheckout}</button>
                </div>
                <span className={!priceAfterDiscount > 0 ? 'label' : 'label active'}>{selectedLanguage.labelForTotalPrice} : {priceAfterDiscount}</span>
                <button className="returnBtn" onClick={closeCart}>{selectedLanguage.labelForBackToProdList}</button>
            </div>
    )
}

export default CartSection;