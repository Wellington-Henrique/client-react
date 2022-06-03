import React from "react";
import { Link } from "react-router-dom";
import logoCadastro from "../../assets/cadastro-ico.jpg"

import "./styles.css";
import { FiXCircle, FiEdit, FiUserX } from "react-icons/fi";

export default function Alunos() {
    return (
        <div className="aluno-container">
            <header>
                <img src={logoCadastro} alt="Cadastro" />
                <span>Bem-vindo <strong>Desenvolvedor</strong>!</span>
                <Link  className="button" to="/aluno/novo/0">Novo Aluno</Link>
                <button type="button" className="">
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
                <li>
                    <b>Nome:</b>{}<br/><br/>
                    <b>Email:</b>{}<br/><br/>
                    <b>Idade:</b>{}<br/><br/>
                    <button type="button" className="">
                        <FiEdit size={35} color="#17202a"/>
                    </button>
                    <button type="button" className="">
                        <FiUserX size={35} color="#17202a"/>
                    </button>
                </li>
            </ul>
        </div>
    )
}