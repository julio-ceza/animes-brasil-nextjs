"use client";
/**
 * Essa linha é obrigatória no App Router (pasta app/) do Next.js quando o componente usa hooks do React como 
 * useState ou useEffect.
 * 
 * Ela informa ao Next.js que esse componente deve ser renderizado no navegador (client side), não no servidor.
 * 
*/

import { useEffect, useState } from "react";

export default function AnimesAntigoPage() {

  /**
   * Importa os dois hooks principais:
   *   - useState → guarda dados ou estados dentro do componente (por exemplo, a lista de animes).
   *   - useEffect → executa efeitos colaterais (como buscar dados da API) depois que o componente renderiza.
   * 
  */
  const [animes, setAnimes] = useState([]);

  // Usando fetch()
  useEffect(() => {
    fetch("http://localhost:8080/animes")
      .then((res) => res.json())
      .then((data) => setAnimes(data))
      .catch((err) => console.error("Erro ao buscar animes:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lista de Animes (fetch)</h1>

      {/* O que acontece aqui:
          - O JSX é HTML misturado com JavaScript;
          - {animes.map(...)} percorre a lista e renderiza cada anime como <li>;
          - key={p.id} é importante para o React identificar cada item de forma única. */}
      <ul>
        {animes.map((p) => (
          <li key={p.id}>
            {p.nome} — R$ {p.genero}
          </li>
        ))}
      </ul>
    </div>
  );
}
