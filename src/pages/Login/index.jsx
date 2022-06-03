import React from 'react';
import './styles.css';
import logoImg from '../../assets/login.jpg';

export default function Login () {
    return (
        <div className="login-container">
            <section className="form">
                <img src={logoImg} alt="Login" id="img1"/>
                <form>
                    <h1>Cadastro de Alunos</h1>
                    <input type="text" placeholder='Email'/>
                    <input type="password" id="password" placeholder='Password'/>
                    <button className="button" type="submit">Login</button>
                </form>
            </section>
        </div>
    )
}