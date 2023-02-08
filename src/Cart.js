import axios from "axios";
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
    const user = JSON.parse(localStorage.getItem("user"));
    const [cart, setCart] = useState([...initialCart]);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const handleRemoveFromCart = (index) => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
    };

    function getTotal(cart) {
        let total = 0;
        cart.map((product) => (
            total += product.price
        ))

        return total.toFixed(2);
    }

    const handleOrderClick = (cart, user) => {
        if (user != null) {
            axios.post("http://localhost:8080/api/v1/getIdByMail", user).then(
                res => {
                    const new_id = res.data;
                    const new_total = getTotal(cart)

                    const myOrder = {
                        user_id: new_id,
                        total: new_total
                    }

                    console.log(myOrder)
                    axios.post("http://localhost:8080/api/v1/insertOrder", myOrder).then(
                        response => {
                            console.log(response.data);
                        }
                    ).catch(error => {
                        console.error(error)
                    })
                }
            )
            setCart([]);
        }

    }

    return (
        <>
            <div className="cart_details">

                <h2 className="info_header">Cart: {cart.length}</h2>
                <h2 className="info_header"> Total: <strong>{getTotal(cart)}</strong>€</h2>
                <a href="/orders">
                    <button className="order_button" onClick={() => handleOrderClick(cart, user)}>Proceed with order</button>
                </a>
            </div>
            <div className='products'>
                <ul>
                    {cart.map((product, index) => (
                        <li key={index}>
                            <div className='product_card'>
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