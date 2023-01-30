import React from 'react'
import './Header.css';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";

function Header() {

    const location = useLocation();
    const path = location.pathname;

    return (
        <div className='header'>
            <a href='/'>
                <img src="logo.png" className='header_logo' alt='' />
            </a>
            {path === '/products' ? (
                <a href='/cart' className='header_redirect'> Go to Cart</a>
            ) : path === '/' ? (
                <>
                    <a href='/cart' className='header_redirect'> Go to Cart</a>
                    <a href='/products' className='header_redirect'> Go to Products</a>
                </>
            ) : (
                <a href='/products' className='header_redirect'> Go to Products </a>
            )}
        </div>
    );
}

export default Header