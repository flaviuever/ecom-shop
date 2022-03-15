    import React from "react";
    // import IconButton from '@mui/material/IconButton';
    import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
    import Badge from "@mui/material/Badge";
    import { styled } from "@mui/material/styles";
    import { useParams } from "react-router";
    import { useEffect, useState } from "react";
    import { Link } from "react-router-dom";
    import getProductsForCategory from "../productList";
    import Language from "./Language";
    import FilterByCategory from "./FIlters/FilterByCategory";
    import FilterByName from "./FIlters/FilterByName";
    import FilterByPrice from "./FIlters/FilterByPrice";
    import CartSection from "./CartSection";
    import Coupon from "./Coupon";
    import ItemModal from "./ItemModal";
    import logo from "../pictures/ecom-logo.png";
    import Loader from "./Loader";
    import "./category.css";

    // butonul checkout trebuie sa ma duca pe pagina de cos
    // adauga buton la produsele din carousel
    // schimba logo
    // modific filtrele


    const Category = ({ selectedLanguage, setSelectedLanguage }) => {
    const apiURL = 'https://fakestoreapi.com/products';

    const { categoryId } = useParams();
    let offersData = getProductsForCategory(parseInt(categoryId));
    const mappedOffersData = offersData.map((item) => item.category);
    const categoryList = [...new Set(mappedOffersData)];

    const [isLoading, setIsLoading] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState("");
    const [category, setCategory] = useState(offersData);
    const [categoryFilter, setCategoryFilter] = useState("");
    const [filteredName, setFilteredName] = useState("");
    const [filteredPrice, setFilteredPrice] = useState("");
    const [numOfProducts, setNumOfProducts] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [cartIsOpen, setCartIsOpen] = useState(false);
    const [discountValue, setDiscountValue] = useState("");
    const [wasClicked, setWasClicked] = useState(false);
    const [priceAfterDiscount, setPriceAfterDiscount] = useState(0);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showCartDropdown, setShowCartDropdown] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalName, setModalName] = useState("");
    const [modalCategory, setModalCategory] = useState("");
    const [modalDescription, setModalDescription] = useState("");
    const [modalShortDescription, setModalShortDescription] = useState("");
    const [modalPrice, setModalPrice] = useState(0);
    const [modalImg, setModalImg] = useState("");

    const fetchProducts = async () => {
        const response = await fetch(apiURL);
        if(response.status === 200){
            const allProducts = await response.json();
            setCategory(allProducts);
        }
        setIsLoading(true);
    }

    useEffect(() => {
        setCategory(offersData);
    }, [categoryId]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleMoreInfo = (item) => {
        setShowModal(true);
        setModalImg(item.image);
        setModalName(item.name);
        setModalCategory(item.category);
        setModalDescription(item.description);
        setModalShortDescription(item.shortDescription);
        setModalPrice(item.price);
    };

    const onButtonClick = (id) => {
        let newArr = [];
        newArr = [
        ...getProductsForCategory(1),
        ...getProductsForCategory(2),
        ...getProductsForCategory(3),
        ];

        newArr.map((item) => {
        if (item.id === id) {
            if (item.isAdded === true) {
            setNumOfProducts((number) => number - 1);
            item.isAdded = false;
            setTotalPrice((price) => price - Number(item.price));
            setPriceAfterDiscount(
                (price) => price - Number(item.price)
            );
            } else {
            setNumOfProducts((number) => number + 1);
            item.isAdded = true;
            setTotalPrice((price) => price + Number(item.price));
            setPriceAfterDiscount(
                (price) => price + Number(item.price)
            );
            }
        }
        return item;
        });
    };

    const onChangeCategory = (e) => {
        let categorySelected = e.target.value;
        setCategoryFilter(categorySelected);
        let newArr = [
        ...getProductsForCategory(1),
        ...getProductsForCategory(2),
        ...getProductsForCategory(3),
        ...category
        ];
        newArr = offersData.filter((item) => {
        return (
            item.category === categorySelected &&
            (filteredName
            ? item.name.toLowerCase().includes(filteredName)
            : true) &&
            (filteredPrice
            ? Number(item.price) > Number(filteredPrice)
            : true)
        );
        });
        setCategory(newArr);
    };

    const onChangeName = (e) => {
        const nameSelected = e.target.value.toLowerCase();
        setFilteredName(nameSelected);

        let result = [];
        result = offersData.filter(
        (item) =>
            item.name.toLowerCase().includes(nameSelected) &&
            (categoryFilter ? item.category === categoryFilter : true) &&
            (filteredPrice
            ? Number(item.price) > Number(filteredPrice)
            : true)
        );

        setCategory(result);
    };

    const onChangePrice = (e) => {
        const chosenPrice = e.target.value;
        setFilteredPrice(chosenPrice);

        let result = [];
        result = offersData.filter(
        (item) =>
            Number(item.price) < Number(chosenPrice) &&
            (categoryFilter ? item.category === categoryFilter : true) &&
            (filteredName ? item.name.toLowerCase().includes(filteredName) : true)
        );

        setCategory(result);
    };

    const openCart = () => {
        if (numOfProducts > 0) {
        let newArr = [
            ...getProductsForCategory(1),
            ...getProductsForCategory(2),
            ...getProductsForCategory(3),
        ];
        let arr = newArr.filter((item) => {
            return item.isAdded;
        });
        setCartIsOpen(true);
        setCategory(arr);
        }
    };

    const closeCart = () => {
        if (cartIsOpen) {
        let newArr = [];
        newArr = offersData;
        setCartIsOpen(false);
        setCategory(newArr);
        setShowCartDropdown(false);
        }
    };

    useEffect(() => {
        setPriceAfterDiscount(totalPrice);
    }, [totalPrice]);

    const discountHandler = (e) => {
        const myCoupon = e.target.value;
        setDiscountValue(myCoupon);
    };

    const applyDiscount = () => {
        if (discountValue > 0 && Number(discountValue) && wasClicked === false) {
        let discount = (totalPrice * discountValue) / 100;
        setPriceAfterDiscount(totalPrice - discount);
        setWasClicked(true);
        } else {
        alert("Invalid Coupon");
        }
    };

    const goToShopList = () => {
        let newArr = [];
        newArr = offersData;
        setCategory(newArr);
    };

    const showFilterArea = () => {
        if (!showDropdown) {
        setShowDropdown(true);
        } else {
        setShowDropdown(false);
        }
    };

    const showCartArea = () => {
        if (!showCartDropdown) {
        setShowCartDropdown(true);
        } else {
        setShowCartDropdown(false);
        }
    };

    const ResetAllFilters = () => {
        setFilteredName("");
        setFilteredPrice("");
        setCategoryFilter("");
        setCategory(offersData);
        setWasClicked(false);
        setDiscountValue("");
    };

    const searchForProduct = () => {
        let result = [];
        result = offersData.filter((item) =>
        item.name.toLowerCase().includes(selectedProduct)
        );
        setCategory(result);
    };

    const StyledBadge = styled(Badge)(({ theme }) => ({
        "& .MuiBadge-badge": {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: "0 4px",
        },
    }));

    return (
        <div className="main-page">
        <div className="filterArea">
            <div className="logo-area">
            <h2 className="logo">THE STREET STORE</h2>
            <div className="input-bar">
                <input
                className="logo-input-search"
                onChange={(e) => setSelectedProduct(e.target.value)}
                type="search"
                placeholder="You have the freedom to choose anything"
                />
                <button className="search-btn" onClick={searchForProduct}>
                <i className="fas fa-search"></i>
                </button>
            </div>
            <Link
                to="/category/"
                className="back-to-products btn"    
            >
                See main products
            </Link>
            </div>
            <div className="right-side">
            <Language
                selectedLanguage={selectedLanguage}
                setSelectedLanguage={setSelectedLanguage}
            />
            <div className="dropdown">
                <button className="filter-area btn" onClick={showFilterArea}>
                Filter area
                </button>
                <div
                className={
                    showDropdown ? "dropdown-menu active" : "dropdown-menu"
                }
                onMouseLeave={() => setShowDropdown(false)}
                >
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

                <button
                    title="Reset Everything"
                    className="resetBtn"
                    onClick={ResetAllFilters}
                >
                    <i className="far fa-trash-alt"></i>
                </button>
                </div>
            </div>

            <div className="category-cart">
                <div className="icon-btn-area" onClick={showCartArea}>
                <button
                    className="cart-icon"
                    aria-label="cart"
                    onClick={openCart}
                >
                    {/* // onMouseEnter={() => setShowCartDropdown(true)}> */}
                    {/* onMouseLeave={() => setShowCartDropdown(false)} */}
                    <StyledBadge badgeContent={numOfProducts} color="secondary">
                    <ShoppingCartIcon />
                    </StyledBadge>
                </button>
                </div>

                <div
                className={
                    !showCartDropdown ? "cart-dropdown" : "cart-dropdown active"
                }
                onMouseLeave={() => setShowCartDropdown(false)}
                >
                <Coupon
                    cartIsOpen={cartIsOpen}
                    setCartIsOpen={setCartIsOpen}
                    discountValue={discountValue}
                    discountHandler={discountHandler}
                    applyDiscount={applyDiscount}
                    selectedLanguage={selectedLanguage}
                />
                <CartSection
                    cartIsOpen={cartIsOpen}
                    openCart={openCart}
                    closeCart={closeCart}
                    totalPrice={totalPrice}
                    numOfProducts={numOfProducts}
                    priceAfterDiscount={priceAfterDiscount}
                    selectedLanguage={selectedLanguage}
                    showCartDropdown={showCartDropdown}
                    setShowCartDropdown={setShowCartDropdown}
                />
                </div>
            </div>
            </div>
        </div>

        <div className="Products">
            {isLoading ? category.map((item) => {
            return (
                <div key={item.id} className="shopItem">
                    <img src={item.image} alt={item.name} />
                    <p>
                        {selectedLanguage.labelForName} : {item.title}
                    </p>
                    <p>
                        {selectedLanguage.labelForCategory} : {item.category}
                    </p>
                    <p>
                        {selectedLanguage.labelForPrice} : ${item.price}
                    </p>
                    <button onClick={() => onButtonClick(item.id)} className="btn">
                        {item.isAdded
                        ? selectedLanguage.labelForRemove
                        : selectedLanguage.labelForAdd}
                    </button>
                    <button
                        className="more-info-btn"
                        onClick={() => handleMoreInfo(item)}
                    >
                        more info...
                    </button>
                </div>
            );
            }) : <Loader />}

        </div>

        <ItemModal
            show={showModal}
            onHide={() => setShowModal(false)}
            modalImg={modalImg}
            modalName={modalName}
            modalCategory={modalCategory}
            modalDescription={modalDescription}
            modalShortDescription={modalShortDescription}
            modalPrice={modalPrice}
            selectedLanguage={selectedLanguage}
        />
        </div>
    );
    };

    export default Category;
