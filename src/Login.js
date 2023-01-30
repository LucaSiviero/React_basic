import axios from 'axios';
import React, { useState } from 'react';
import './Login.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        // qui inserire il codice per inviare i dati del modulo
        console.log(formData);
        axios.post("http://localhost:8080/api/v1/selectUser", formData).then(
            res => {
                console.log(res.data);
            }
        ).catch(error => {
            console.error(error);
        });
    };

    return (
        <>
            <h2>Login</h2>
            <div className='form'>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
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
