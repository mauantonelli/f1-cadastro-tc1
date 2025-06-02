import { useEffect, useState } from "react";

export default function PilotosPage() {
  const [pilotos, setPilotos] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("cadastroF1");
    if (saved) setPilotos(JSON.parse(saved));
  }, []);

  function handleDelete(index) {
    const novos = [...pilotos];
    novos.splice(index, 1);
    setPilotos(novos);
    localStorage.setItem("cadastroF1", JSON.stringify(novos));
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Pilotos cadastrados</h1>
      {pilotos.length === 0 && <p>Nenhum piloto cadastrado.</p>}

      {pilotos.map((p, i) => (
        <div key={i} style={{ marginBottom: 20 }}>
          <p><b>Nome:</b> {p.nome}</p>
          <p><b>Nacionalidade:</b> {p.nacionalidade}</p>
          <p><b>Equipe:</b> {p.equipe}</p>
          <p><b>Títulos:</b> {p.titulos}</p>
          <button onClick={() => handleDelete(i)}>Deletar</button>
        </div>
      ))}

      <button onClick={() => window.history.back()}>Voltar</button>
    </div>
  );
}
