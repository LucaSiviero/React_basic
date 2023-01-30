import React, { useState, useEffect } from "react";
import './Product.css'

const Cart = () => {

    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    const initialCart = JSON.parse(localStorage.getItem("cart")) || [];
    const [cart, setCart] = useState([...initialCart]);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const handleRemoveFromCart = (index) => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
    };

    console.log(cart)

    return (
        <>
            <div className='products'>
                <h2>Cart: {cart.length}</h2>
                <ul>
                    {cart.map((product, index) => (
                        <li key={index}>
                            <div className='product_card'>
                                {console.log(product)}
                                <h3>{product.name} </h3>
                                <img src={product.img} alt=''></img>
                                <p><strong>{product.price}</strong>€</p>
                                <p>{product.description}</p>

                                <button onClick={() => handleRemoveFromCart(index)}>Remove from cart</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Cart;