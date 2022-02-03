import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import getProductsForCategory from "../productList";
import "./promotions.css"

const Random = ({ onButtonClick, selectedLanguage }) =>{

    let random1 = getProductsForCategory(1)[Math.floor(Math.random()*33)];
    let random2 = getProductsForCategory(2)[Math.floor(Math.random()*38)];
    let random3 = getProductsForCategory(3)[Math.floor(Math.random()*28)];
    console.log(random1);
    console.log(typeof random1)

return (
        <div className="component">
        <Carousel className="carousel" autoPlay={true} interval={3000} infiniteLoop={true}>
        <Carousel.Item>
        <div className="randomItem">
                <img src={random1.image} alt={random1.name} />
                <p>Name: {random1.name}</p>
                <p>Category: {random1.category}</p>
                <p>Description:{random1.description}</p>
                <p>Short Description:{random1.shortDescription}</p>
                <p>Price:{random1.price}</p>
        </div>
        </Carousel.Item>
        <Carousel.Item>
        <div className="randomItem">
        <img src={random2.image} alt={random2.name} />
                <p>Name: {random2.name}</p>
                <p>Category: {random2.category}</p>
                <p>Description:{random2.description}</p>
                <p>Short Description:{random2.shortDescription}</p>
                <p>Price:{random2.price}</p>
        </div>
        </Carousel.Item>
        <Carousel.Item>
        <div className="randomItem">
        <img src={random3.image} alt={random3.name} />
                <p>Name: {random3.name}</p>
                <p>Category: {random3.category}</p>
                <p>Description:{random3.description}</p>
                <p>Short Description:{random3.shortDescription}</p>
                <p>Price:{random3.price}</p>
        </div>
        </Carousel.Item>
        </Carousel>
        </div>
 
    )
}

export default Random;