import React, { useEffect, useState } from 'react'
import './Home.css'

function Home() {

    const [user, setUser] = useState();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        setUser(storedUser);
        //console.log(storedUser["mail"]);
    }, []);

    return (
        <>
            <div className='home_div'>
                <h2 className='greetings'>Hello {user?.["mail"]}</h2>
                <span className='home_redirects'>
                    <a href='/orders'>
                        Your orders
                    </a>
                </span>
            </div>
        </>
    )
}

export default Home