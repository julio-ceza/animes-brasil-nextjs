"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";

export default function Animes() {
  const [animes, setAnimes] = useState([]);

  // ✅ Mude para true se quiser forçar o uso de dados mockados
  const USE_MOCK = false;

  // ✅ Lista de animes fake (mock)
  const mockAnimes = [
    { id: 1, nome: "Naruto", genero: "Ação" },
    { id: 2, nome: "Attack on Titan", genero: "Fantasia sombria" },
    { id: 3, nome: "One Piece", genero: "Aventura" },
    { id: 4, nome: "Demon Slayer", genero: "Ação" },
  ];

  useEffect(() => {
    if (USE_MOCK) {
      console.log("⚙️ Usando dados mockados (modo offline).");
      setAnimes(mockAnimes);
      return;
    }

    // 🧩 Tenta buscar da API, se falhar usa os mockados
    fetch("http://localhost:8080/animes")
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar da API");
        return res.json();
      })
      .then((data) => setAnimes(data))
      .catch((err) => {
        console.warn("⚠️ API indisponível, usando mock:", err.message);
        setAnimes(mockAnimes);
      });
  }, []);

  return (
    <Container>
      <Header>
        <Title>Lista de Animes</Title>
        <AddButton href="/animes/novo">+ Novo Anime</AddButton>
      </Header>

      <AnimeList>
        {animes.map((a) => (
          <AnimeItem key={a.id}>
            <strong>{a.nome}</strong>
            <span>Gênero: {a.genero}</span>
          </AnimeItem>
        ))}
      </AnimeList>
    </Container>
  );
}

// 💅 Estilos com Styled Components
const Container = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
`;

const AddButton = styled(Link)`
  background-color: #2563eb;
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #1d4ed8;
  }
`;

const AnimeList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  gap: 1rem;
`;

const AnimeItem = styled.li`
  background-color: #f1f5f9;
  border-radius: 10px;
  padding: 1rem 1.5rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  strong {
    color: #0f172a;
    font-size: 1.1rem;
  }

  span {
    display: block;
    color: #475569;
    font-size: 0.95rem;
  }
`;
