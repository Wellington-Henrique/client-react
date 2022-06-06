import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../../services/api";
import logoImg from '../../assets/login.jpg';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './styles.css';

export default function Login () {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    const navigate = useNavigate();

    async function Login(e) {
        e.preventDefault()

        const data = {
            email, password
        }

        try {
            const response = await api.post('https://localhost:44311/api/account/loginuser', data);

            localStorage.setItem('email', email);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('expiration', response.data.expiration);

            navigate("/alunos");
        } catch (err) {
            //alert(`Falha: ${err.message}`);

            toast.error('Não foi possível efetuar o login!', {
                position: "top-right",
                theme: "colored",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: false,
            });
        }
    }

    return (
        <div className="login-container">
            <section className="form">
                <img src={logoImg} alt="Login" id="img1"/>
                <form onSubmit={Login}>
                    <h1>Cadastro de Alunos</h1>

                    <input placeholder='Email' 
                        value={email} 
                        onChange={e => setEmail(e.target.value)}
                    />

                    <input type="password" placeholder='Password'
                        value={password} 
                        onChange={e => setPassword(e.target.value)}
                    />

                    <button className="button" type="submit">Login</button>
                </form>
            </section>

            <ToastContainer
                position="top-right"
                theme="colored"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    )
}