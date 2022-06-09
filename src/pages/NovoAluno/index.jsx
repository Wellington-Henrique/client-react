import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

import "./styles.css";

import { FiCornerDownLeft, FiUserPlus } from "react-icons/fi";

export default function NovoAluno() {
    const[id, setId] = useState(null);
    const[nome, setNome] = useState('');
    const[email, setEmail] = useState('');
    const[idade, setIdade] = useState(0);
    const { alunoId } = useParams();

    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    useEffect(() => {
        if (alunoId === '0')
            return
        else
            loadAluno();
    }, alunoId)

    async function loadAluno(){
        try {
            const response = await api.get(`https://localhost:44311/api/alunos/${alunoId}`, authorization);
            setId(response.data.id);
            setNome(response.data.nome);
            setEmail(response.data.email);
            setIdade(response.data.idade);
        } catch (error){
            alert("Erro ao recuperar o aluno " + error);
            navigate('/alunos');
        }
    }

    async function saveOrUpdate(e) {
        e.preventDefault();

        const data = {
            nome, 
            email, 
            idade
        }

        try {
            if (alunoId === '0')
            {
                await api.post('https://localhost:44311/api/alunos/', data, authorization)
            } else {
                data.id = id;
                await api.put(`https://localhost:44311/api/alunos/${id}`, data, authorization)
            }
        } catch(error) {
            alert('Erro ao gravar aluno:', error)
        }

        navigate("/alunos");
    }

    return (
        <div className="novo-aluno-container">
            <div className="content">
                <section className="form">
                    <FiUserPlus size="105" color="#17202a"/>
                    <h1>{alunoId === '0' ? 'Incluir Novo Aluno' : 'Atualizar Aluno'}</h1>
                    <Link className="back-link" to={"/alunos"}>
                        <FiCornerDownLeft size="25" color="#17202a"/>
                        Retornar
                    </Link>
                </section>

                <form onSubmit={saveOrUpdate}>
                    <input placeholder="Nome"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                    />
                    <input placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input placeholder="Idade"
                        value={idade}
                        onChange={e => setIdade(e.target.value)}
                    />
                    <button className="button" type="submit">{alunoId === '0' ? 'Incluir' : 'Atualizar'}</button>
                </form>
            </div>
        </div>
    )
}