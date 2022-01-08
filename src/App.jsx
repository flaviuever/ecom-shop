import React from "react";
import getProductsForCategory from "./productList";

const App = () => {
    console.log('Products for category with id 1')
    console.log(getProductsForCategory(1))
    console.log('Products for category with id 2')
    console.log(getProductsForCategory(2))
    console.log('Products for category with id 3')
    console.log(getProductsForCategory(3))
    return (
        <div>
            <div>Promotions</div>
            <div>Winter Offer</div>
            <div>Spring Offer</div>
            <div>Autumn Offer</div>
        </div>
    )
};

export default App;
