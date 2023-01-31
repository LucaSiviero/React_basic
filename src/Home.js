import React, { useEffect, useState } from 'react'

function Home() {

   const [user, setUser] = useState();

    useEffect (() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        setUser(storedUser);
        //console.log(storedUser["mail"]);
    }, []);

    return (
        <>
            <div>Hello {user?.["mail"]}</div>
        </>
    )
}

export default Home