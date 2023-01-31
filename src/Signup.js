import axios from 'axios';
import React, { useState } from 'react';
import  { useNavigate } from 'react-router-dom'
import './Login.css';


function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validateName(name) {
    return /^[A-Za-z ]+$/.test(name);
}

function validatePassword(password) {
    if (password.length < 8) {
        return false;
    }
    return true;
}


const Signup = () => {
    const [formData, setFormData] = useState({
        name:'',
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
        
        if(!validatePassword(formData["password"])){
            alert("La password deve contenere almeno 8 caratteri")
        }

        if(!validateName(formData["name"])) {
            alert("Il campo nome può contenere solo lettere e spazi")
        }
        
        else {
            axios.post("http://localhost:8080/api/v1/insertUser", formData).then(
                res => {
                    console.log(res.data);
                    localStorage.setItem("user", JSON.stringify(formData))
                    navigate("/");
                }
            ).catch(error => {
                console.log("Eror")
                console.error(error);
            });
        }
    };
    

    return (
        <>
            <h2 className='signup_header'>Signup</h2>
            <div className='form'>
                <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

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

export default Signup;
