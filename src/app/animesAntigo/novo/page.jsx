"use client";
import { useState } from "react";
import api from "@/services/api";

export default function NovoAnimePage() {
  const [anime, setAnime] = useState({ nome: "", genero: "" });
  const [mensagem, setMensagem] = useState("");

  /**
   * O que acontece:
        Quando o usuário clica em “Salvar”, o evento onSubmit dispara essa função.
        preventDefault() impede o comportamento padrão do HTML (recarregar a página).
        É feita uma requisição POST para /animes no backend (via Axios).

    Se der certo:
        Mostra uma mensagem de sucesso com o nome do anime cadastrado.
        Limpa os campos.
        Se der erro (ex: backend offline, erro 500, etc.), mostra uma mensagem de erro no console e na tela.
  */

  const handleSubmit = async (e) => {
    e.preventDefault();  // evita o recarregamento da página
    try {
      const res = await api.post("/animes", anime); // envia o objeto pro backend

      setMensagem(`Anime cadastrado: ${res.data.nome}`);
      setAnime({ nome: "", preco: "" });
    } catch (err) {
      console.error(err);
      setMensagem("Erro ao cadastrar anime");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Cadastrar Animes (axios)</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-64">
        <input
          type="text"
          placeholder="Nome"
          value={anime.nome}
          onChange={(e) => setAnime({ ...anime, nome: e.target.value })}
          className="border p-2"
        />
        <input
          type="text"
          placeholder="Gênero"
          value={anime.genero}
          onChange={(e) => setAnime({ ...anime, genero: e.target.value })}
          className="border p-2"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Salvar
        </button>
      </form>
      {mensagem && <p className="mt-3 text-green-600">{mensagem}</p>}
    </div>
  );
}
