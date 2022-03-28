import 'bootstrap/dist/css/bootstrap.min.css';
import getProductsForCategory from "../productList";
import "./promotions.css"
import { Carousel } from 'react-bootstrap';
import React, { useState, useEffect } from 'react'

const Random = ({ onButtonClick, selectedLanguage }) =>{
        let random1 = getProductsForCategory(1)[Math.floor(Math.random()*32)];
        let random2 = getProductsForCategory(2)[Math.floor(Math.random()*38)];
        let random3 = getProductsForCategory(3)[Math.floor(Math.random()*28)];

        console.log(random1);
        console.log(typeof random1)

return (
        <div className="carousel-wrapper">
        <Carousel className='carousel'>
                <Carousel.Item className='carousel-item'>
                        <span className='priceTag'>{Number(random1.price) / 2}$</span>
                        <span className='promoTag'>-50%</span>
                        <center><img
                        className="image"
                        src={random1.image_url}
                        alt="First slide"
                        /></center>
                        <div className="text">
                                <ul>
                                        <li>Name: {random1.name}</li>
                                        <li>Category: {random1.tagline}</li>
                                        <li>Short Description:{random1.shortDescription}</li>
                                </ul>
                        </div>
                </Carousel.Item>
                <Carousel.Item className='carousel-item'>
                        <span className='priceTag'>{Number(random2.price) / 2}$</span>
                        <span className='promoTag'>-50%</span>
                        <center><img
                        className="image"
                        src={random2.image_url}
                        alt="Second slide"
                        /></center>
                        <div className="text">
                                <ul>
                                        <li>Name: {random2.name}</li>
                                        <li>Category: {random2.tagline}</li>
                                        <li>Short Description:{random2.shortDescription}</li>
                                </ul>
                                
                        </div>
                </Carousel.Item>
                <Carousel.Item className='carousel-item'>
                        <span className='priceTag'>{Number(random3.price) / 2}$</span>
                        <span className='promoTag'>-50%</span>
                        <center><img
                        className="image"
                        src={random3.image_url}
                        alt="Third slide"
                        /></center>
                        <div className="text">
                                <ul>
                                        <li>Name: {random3.name}</li>
                                        <li>Category: {random3.tagline}</li>
                                        <li>Short Description:{random3.shortDescription}</li>
                                </ul>
                        </div>
                </Carousel.Item>
        </Carousel>
        </div>
        )
}

export default Random;