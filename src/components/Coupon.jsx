const Coupon = ({discountValue, discountHandler, applyDiscount, selectedLanguage}) => {
    return (
        <>
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
        </>
    )
}

export default Coupon;