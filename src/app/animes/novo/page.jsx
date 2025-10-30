"use client";

import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import api from "@/services/api";

export default function NovoAnimePage() {
  const [anime, setAnime] = useState({ nome: "", genero: "" });
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/animes", anime);
      setMensagem(`✅ Anime cadastrado: ${res.data.nome}`);
      setErro(false);
      setAnime({ nome: "", genero: "" });
    } catch (err) {
      console.error(err);
      setMensagem("❌ Erro ao cadastrar novo anime");
      setErro(true);
    }
  };

  return (
    <Container>
      <Header>
        <Title>Cadastrar Anime</Title>
        <BackButton href="/animes">← Voltar</BackButton>
      </Header>

      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Nome do Anime"
          value={anime.nome}
          onChange={(e) => setAnime({ ...anime, nome: e.target.value })}
          required
        />
        <Input
          type="text"
          placeholder="Gênero"
          value={anime.genero}
          onChange={(e) => setAnime({ ...anime, genero: e.target.value })}
          required
        />
        <SubmitButton type="submit">Salvar</SubmitButton>
      </Form>

      <Message $error={erro}>{mensagem}</Message>
    </Container>
  );
}



// 🎨 Estilos com Styled Components
const Container = styled.div`
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  color: #1e293b;
`;

const BackButton = styled(Link)`
  background-color: #64748b;
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #475569;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #f8fafc;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 0.8rem;
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }
`;

const SubmitButton = styled.button`
  background-color: #2563eb;
  color: white;
  padding: 0.8rem;
  border-radius: 8px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #1d4ed8;
  }
`;

const Message = styled.p`
  margin-top: 1rem;
  font-weight: 500;
  color: ${(props) => (props.$error ? "#dc2626" : "#16a34a")};
`;
