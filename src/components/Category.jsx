import React from "react";
import {useParams} from "react-router";
import { useEffect, useState } from "react";
import getProductsForCategory from "../productList";
import "./category.css"
import FilterByCategory from "./FIlters/FilterByCategory";
import FilterByName from "./FIlters/FilterByName";
import FilterByPrice from "./FIlters/FilterByPrice";
import CartSection from "./CartSection";
import Coupon from "./Coupon";
import ItemModal from "./ItemModal";

const Category = ({ selectedLanguage }) => {
    
    const {categoryId} = useParams();
    let offersData = getProductsForCategory(parseInt(categoryId));
    const mappedOffersData = offersData.map(item => item.category);
    const categoryList = [...new Set(mappedOffersData)];

    const [category, setCategory] = useState(offersData);
    const [categoryFilter, setCategoryFilter] = useState("");
    const [filteredName, setFilteredName] = useState("");
    const [filteredPrice, setFilteredPrice] = useState("");
    const [numOfProducts, setNumOfProducts] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [cartIsOpen, setCartIsOpen] = useState(false);
    const [discountValue, setDiscountValue] = useState("")
    const [wasClicked, setWasClicked] = useState(false);
    const [priceAfterDiscount, setPriceAfterDiscount] = useState(0)
    
    const [showModal, setShowModal] = useState(false);
    const [modalName, setModalName] = useState("")
    const [modalCategory, setModalCategory] = useState("")
    const [modalDescription, setModalDescription] = useState("");
    const [modalShortDescription, setModalShortDescription] = useState("");
    const [modalPrice, setModalPrice] = useState(0);
    const [modalImg, setModalImg] = useState("")
    
    useEffect(()=>{
        setCategory(offersData)
    },[categoryId]);

    const handleMoreInfo = (item) => {
        setShowModal(true);
        setModalImg(item.image);
        setModalName(item.name);
        setModalCategory(item.category);
        setModalDescription(item.description);
        setModalShortDescription(item.shortDescription);
        setModalPrice(item.price);
    }

    const onButtonClick = (id) =>{
        let newArr = [];
        newArr = [...getProductsForCategory(1), ...getProductsForCategory(2), ...getProductsForCategory(3)];
        
        newArr.map((item) => {
            if(item.id === id){
                if(item.isAdded === true){
                setNumOfProducts(number => number - 1);
                item.isAdded = false; 
                setTotalPrice((price) => price - Number(item.price.substring(1)));
                setPriceAfterDiscount((price) => price - Number(item.price.substring(1)));
            }else{
                setNumOfProducts(number => number + 1);
                item.isAdded = true;
                setTotalPrice((price) => price + Number(item.price.substring(1)));
                setPriceAfterDiscount((price) => price + Number(item.price.substring(1)));
            }

        }
        return item;
        })
        
    }

    const onChangeCategory = (e) => {
        let categorySelected = e.target.value;
        setCategoryFilter(categorySelected);
        let newArr = [...getProductsForCategory(1), ...getProductsForCategory(2), ...getProductsForCategory(3)];
        newArr = offersData.filter((item) => {
            return (item.category === categorySelected &&
                (filteredName
                ? item.name.toLowerCase().includes(filteredName)
                : true) && 
                (filteredPrice 
                ? Number(item.price.substring(1)) > Number(filteredPrice)
                : true)
                );
        })
        setCategory(newArr);
    }

    const onChangeName = (e) =>{
        const nameSelected = e.target.value.toLowerCase();
        setFilteredName(nameSelected);

        let result = [];
        result = offersData.filter((item)=> 
        item.name.toLowerCase().includes(nameSelected) &&
        (categoryFilter
        ? item.category === categoryFilter
        : true) &&
        (filteredPrice 
        ? Number(item.price.substring(1)) > Number(filteredPrice)
        : true)
        );
        
        setCategory(result);
    }

    const onChangePrice = (e) =>{
        const chosenPrice = e.target.value;
        setFilteredPrice(chosenPrice);

        let result = [];
        result = offersData.filter((item) => 
        Number(item.price.substring(1)) < Number(chosenPrice) &&
        (categoryFilter
            ? item.category === categoryFilter
            : true) &&
            (filteredName
            ? item.name.toLowerCase().includes(filteredName)
            : true)
        );
        
        setCategory(result);
    };

    const openCart = () => {
        if(numOfProducts > 0){
            let newArr = [...getProductsForCategory(1), ...getProductsForCategory(2), ...getProductsForCategory(3)]
            let arr = newArr.filter(item=> {
                return (
                    item.isAdded
                )
            })
            setCartIsOpen(true);
            setCategory(arr);
        }
    }

    const closeCart = () => {
        if(cartIsOpen){
            let newArr = [];
            newArr = offersData;
            setCartIsOpen(false);
            setCategory(newArr);
        }
    }


    useEffect(()=>{
        setPriceAfterDiscount(totalPrice);
    },[totalPrice])

    const discountHandler = (e) => {
        const myCoupon = e.target.value;
        setDiscountValue(myCoupon);
    }

    const applyDiscount = () => {
        if(discountValue > 0 && Number(discountValue) && wasClicked===false){
            let discount = totalPrice * discountValue/100;
            setPriceAfterDiscount(totalPrice - discount)
            setWasClicked(true);
        } else {
            alert("Invalid Coupon");
        }
    }

    const ResetAll = () => {
        // let newArr = [];
        // newArr = [...getProductsForCategory(1), ...getProductsForCategory(2), ...getProductsForCategory(3)]
        setCategory(offersData.map(item=>{
                if(item.isAdded === true){
                item.isAdded = false; 
                }
                return item;
            }));
        setCategoryFilter("");
        setFilteredName("");
        setFilteredPrice(0);
        setNumOfProducts(0);
        setCartIsOpen(false);
        setTotalPrice(0);
        setWasClicked(false);
        setDiscountValue('');
        setPriceAfterDiscount(0);
    }

    return (
        <>
        <div className="filterArea">
           {/* aici voi pune filtrele */}
        <FilterByCategory 
        onChangeCategory={onChangeCategory}
        categoryList={categoryList}
        categoryFilter={categoryFilter}
        selectedLanguage={selectedLanguage}
        />

        <FilterByName 
        filteredName={filteredName}
        onChangeName={onChangeName}
        selectedLanguage={selectedLanguage}
        />

        <FilterByPrice 
        onChangePrice={onChangePrice}
        filteredPrice={filteredPrice}
        selectedLanguage={selectedLanguage}
        />

        <Coupon 
            discountValue={discountValue}
            discountHandler={discountHandler}
            applyDiscount={applyDiscount}
            selectedLanguage={selectedLanguage}
        />

        <CartSection 
            openCart={openCart}
            closeCart={closeCart}
            totalPrice={totalPrice}
            numOfProducts={numOfProducts}
            priceAfterDiscount={priceAfterDiscount}
            selectedLanguage={selectedLanguage}
        />

        <button title="Reset Everything" className="resetBtn" onClick={ResetAll}>
            <i class="far fa-trash-alt"></i>
        </button>
        </div>
        

        <div className="Products">
        {category.map((item)=>{
        return( 
        <div key={item.name} className="shopItem">
            <img src={item.image} alt={item.name} />
            <p>{selectedLanguage.labelForName} : {item.name}</p>
            <p>{selectedLanguage.labelForCategory} : {item.category}</p>
            <p>{selectedLanguage.labelForPrice} : {item.price}</p>
            <button onClick={() => onButtonClick(item.id)} className="btn">
            {item.isAdded ? selectedLanguage.labelForRemove : selectedLanguage.labelForAdd} 
            </button>
            <button className="more-info-btn" onClick={() => handleMoreInfo(item)}>more info...</button>
        </div>
        )
    })}
        </div>

        <ItemModal 
        show={showModal}
        onHide={()=> setShowModal(false)}
        modalImg={modalImg}
        modalName={modalName}
        modalCategory={modalCategory}
        modalDescription={modalDescription}
        modalShortDescription={modalShortDescription}
        modalPrice={modalPrice}
        selectedLanguage={selectedLanguage}
        />
        </>
    )
}

export default Category;