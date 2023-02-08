import React, { useEffect, useState } from 'react'
import './Header.css';
import { useLocation } from 'react-router-dom';



function Header() {

    const location = useLocation();
    const path = location.pathname;
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const [user, setUser] = useState(storedUser);

    function logout() {
        localStorage.removeItem("user");
        setUser([]);
        console.log(user)
    }

    useEffect(() => {
        if (user !== storedUser) {
            window.location.reload();
        }
    }, [JSON.parse(localStorage.getItem("user"))]);

    return (
        <div className='header'>
            <a href='/'>
                <img src="logo.png" className='header_logo' alt='' />
            </a>
            {user === null ? (
                <>
                    <a href='/login' className='login_redirect'>
                        <p>Log in</p>
                    </a>
                    <a href='/signup' className='signup_redirect'>
                        <p>Sign up</p>
                    </a>
                </>
            ) : (
                <a className='logout_redirect' onClick={logout}>
                    <p>Log out</p>
                </a>
            )}

            {path === '/products' ? (
                <>
                    <a href='/cart' className='header_redirect'> Go to Cart</a>
                    <a href='/orders' className='header_redirect'> Go to Orders</a>
                </>
            ) : path === '/' ? (
                <>
                    <a href='/cart' className='header_redirect'> Go to Cart</a>
                    <a href='/products' className='header_redirect'> Go to Products</a>
                    <a href='/orders' className='header_redirect'> Go to Orders</a>

                </>
            ) : (
                <>
                    <a href='/products' className='header_redirect'> Go to Products </a>
                    <a href='/orders' className='header_redirect'> Go to Orders</a>
                </>
            )}

        </div>
    );
}

export default Header