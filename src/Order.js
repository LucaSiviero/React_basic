import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Order.css'

function Order() {

    const [user, setUser] = useState();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        setUser(storedUser)
        axios.post("http://localhost:8080/api/v1/getIdByMail", storedUser).then(
            res => {
                let id = res.data;
                console.log("Id is", id);
                axios.get(`http://localhost:8080/api/v1/showOrders/${id}`).then(
                    response => {
                        console.log("Orders are: ", response.data);
                        setOrders(response.data);
                    }
                )
            }
        ).catch(error => {
            console.error(error);
        })
    }, []);

    return (
        <div>
            {user === null ? (
                <div>Please Log in first</div>
            ) :

                (
                    <div>
                        <h2 className='info_header'> Orders </h2>
                        <div className='order_list'>
                            <ul>
                                {orders.map((order, index) => (
                                    <li key={index}>
                                        <div className='order_card'>
                                            <h3>Order #{order.id} </h3>
                                            <p>Total: <strong>{order.total}</strong>€</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
        </div>
    );
}

export default Order;