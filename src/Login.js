import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';


function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
    if (password.length < 8) {
        return false;
    }
    return true;
}


const Login = () => {
    const [formData, setFormData] = useState({
        mail: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        // qui inserire il codice per inviare i dati del modulo
        console.log(formData);
        if (!validateEmail(formData["mail"])) {
            alert("Email non valida");
        }

        if (!validatePassword(formData["password"])) {
            alert("La password deve contenere almeno 8 caratteri")
        }
        else {
            axios.post("http://localhost:8080/api/v1/selectUser", formData).then(
                res => {
                    console.log(res.data);
                    localStorage.setItem("user", JSON.stringify(formData))
                    navigate("/");
                }
            ).catch(error => {
                console.error(error.response["status"]);
                switch (error.response["status"]) {
                    case 404:
                        alert("Log-in functionality is down at the moment. We'll fix it soon.");
                    case 400:
                        alert("Bad request. Input fields are not correct");
                }
            });
        }
    };




    return (
        <>
            <h2>Login</h2>
            <div className='form'>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="mail">Mail:</label>
                    <input
                        type="email"
                        id="mail"
                        name="mail"
                        value={formData.mail}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">Invia</button>
                </form>
            </div>
        </>
    );
};

export default Login;
