import React from 'react'
import { useState, useEffect } from "react";
import NotificationBanner from "./NotificationBanner";
import './Product.css'

import axios from 'axios';

/* Ricordati di rendere disponibili i prodotti presi dal database dopo che sono stati caricati. Perché così facendo, se le api rest non funzionano, i prodotti non sono persistenti. */
function Product() {

    /*{ id: 1, name: "Eloquent JavaScript", price: 9.99, image: 'https://eloquentjavascript.net/img/cover.jpg', description: "A Modern Introduction to Programming." },
    { id: 2, name: "NVIDIA RTX 4090", price: 19.99, image: 'https://images.nvidia.com/aem-dam/Solutions/geforce/ada/rtx-4090/geforce-rtx-4090-product-gallery-full-screen-3840-3.jpg' },
    { id: 3, name: "Eastpak Bag", price: 29.99, image: 'https://cartonlineitalia.it/wp-content/uploads/2021/07/032546446202-Eastpak-Padded-Pakr-Colore-Black.jpg' },
    { id: 4, name: "Western Digital Caviar Blue 1TB", price: 39.99, image: 'https://m.media-amazon.com/images/I/81yHZDfM3GL._AC_SY450_.jpg' },*/

    const initialProducts = JSON.parse(localStorage.getItem("products")) || [];
    const [products, setProducts] = useState(initialProducts);

    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/showProducts").then(response => {
            console.log(response.data);
            setProducts(response.data)
        }).catch(error => {
            console.log(error);
        })
    }, []);

    console.log(products);

    const initialCart = JSON.parse(localStorage.getItem("cart")) || [];
    const [cart, setCart] = useState([...initialCart]);
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem("products", JSON.stringify(products))
    }, [products]);

    const handleAddToCart = (product) => {
        setCart([...cart, product]);
        setShowNotification(true);
    };

    function hideNotification() {
        setShowNotification(false);
    }

    return (
        <>
            <h2 className='info_header'> Products</h2>

            <div className='products'>
                <ul>
                    {products.map((product, index) => (
                        <li key={index}>
                            <div className='product_card'>
                                <h3>{product.name} </h3>
                                <img src={product.img}></img>
                                <p><strong>{product.price}</strong>€</p>
                                <p>{product.description}</p>

                                <button onClick={() => handleAddToCart(product)}>Add to cart</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            {showNotification && <NotificationBanner onHide={hideNotification} />}
        </>
    )
}

export default Product