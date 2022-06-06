import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoCadastro from "../../assets/cadastro-ico.jpg"
import { ToastContainer, toast } from 'react-toastify';

import "./styles.css";
import { FiXCircle, FiEdit, FiUserX } from "react-icons/fi";
import api from "../../services/api";

export default function Alunos() {
    const  [nome, setNome] = useState('');
    const[alunos, setAlunos] = useState([]);

    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');

    const navigate = useNavigate();

    const authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    useEffect(() => {
        api.get('https://localhost:44311/api/alunos', authorization).then((response) => {
            setAlunos(response.data);
        })
    })

    async function logout() {
        try {
            localStorage.clear();
            localStorage.setItem('token','');
            authorization.headers = '';
            navigate("/");
        } catch(err) {
            toast.error('erro: ' + err, {
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
        <div className="aluno-container">
            <header>
                <img src={logoCadastro} alt="Cadastro" />
                <span>Bem-vindo <strong>{email}</strong>!</span>
                <Link  className="button" to="/aluno/novo/0">Novo Aluno</Link>
                <button type="button" className="" onClick={logout}>
                    <FiXCircle size={35} color="#17202a"/>
                </button>
            </header>

            <form action="">
                <input type="text" placeholder="Nome" />
                <button type="button" className="button">
                    Filtrar aluno por nome (parcial)
                </button>
            </form>
            <h1>Relação de alunos</h1>
            <ul>
                {alunos.map(aluno => 
                    <li>
                    <b>Nome:</b>{aluno.nome}<br/><br/>
                    <b>Email:</b>{aluno.email}<br/><br/>
                    <b>Idade:</b>{aluno.idade}<br/><br/>
                    <button type="button" className="">
                        <FiEdit size={35} color="#17202a"/>
                    </button>
                    <button type="button" className="">
                        <FiUserX size={35} color="#17202a"/>
                    </button>
                    </li>
                )}
            </ul>

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