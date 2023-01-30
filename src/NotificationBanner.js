import React, { useEffect } from 'react';
import './NotificationBanner.css';
import { CSSTransition } from 'react-transition-group';

function NotificationBanner(props) {
    useEffect(() => {
        const timer = setTimeout(() => {
            props.onHide();
        }, 2000);
        return () => clearTimeout(timer);
    }, [props.onHide]);

    return (
        <>
            <div className='notification_banner'>
                Prodotto Aggiunto al Carrello!
            </div>
        </>
    );
}

export default NotificationBanner;