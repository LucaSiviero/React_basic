import axios from 'axios';
import React, { useEffect, useState } from 'react'


function Order() {

    const [user, setUser] = useState();

    useEffect (() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        setUser(storedUser)
    }, []);

    return (
        <div>
            {user === null ? (
                <div>Please Log in first</div>
            ):
            
            (
                <div> Your orders
                </div>
            )}
        </div>
    );
}

export default Order;