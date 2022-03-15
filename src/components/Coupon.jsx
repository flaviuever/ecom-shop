import React from "react"
const Coupon = ({discountValue, 
    discountHandler, 
    applyDiscount, 
    selectedLanguage, 
    cartIsOpen}) => {
    
    return (
        <div className="coupon-area">
            <input 
                className="inputCoupon"
                type="text" 
                value={discountValue} 
                onChange={discountHandler} 
                placeholder={ selectedLanguage.labelForCoupon}
            />

            <button className="applyBtn"
                    onClick={applyDiscount}>
                {selectedLanguage.labelForApplyCoupon}
            </button>
        </div>
    )
}

export default Coupon;