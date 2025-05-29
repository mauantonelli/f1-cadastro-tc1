import { useState, useEffect } from "react";

export default function App() {
  const [form, setForm] = useState({
    nome: "",
    nacionalidade: "",
    equipe: "",
    titulos: 0,
  });

  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(() => {
    const saved = localStorage.getItem("cadastroF1");
    return saved ? JSON.parse(saved) : [];
  });

  function validate() {
    const newErrors = {};
    if (!form.nome.trim()) newErrors.nome = "Nome obrigatório";
    if (!form.nacionalidade.trim()) newErrors.nacionalidade = "Nacionalidade obrigatória";
    if (!form.equipe.trim()) newErrors.equipe = "Escolha sua equipe";
    if (form.titulos < 0) newErrors.titulos = "Número inválido";
    return newErrors;
  }

  function handleChange(e) {
    const { name, value, type } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      const novosPilotos = [...submittedData, form];
      setSubmittedData(novosPilotos);
      localStorage.setItem("cadastroF1", JSON.stringify(novosPilotos));
      setErrors({});
      setForm({
        nome: "",
        nacionalidade: "",
        equipe: "",
        titulos: 0,
      });
    } else {
      setErrors(validationErrors);
    }
  }

  function handleDelete(index) {
    const novosPilotos = [...submittedData];
    novosPilotos.splice(index, 1);
    setSubmittedData(novosPilotos);
    localStorage.setItem("cadastroF1", JSON.stringify(novosPilotos));
  }

  useEffect(() => {
    const saved = localStorage.getItem("cadastroF1");
    if (saved && submittedData.length === 0) setSubmittedData(JSON.parse(saved));
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#111",
        color: "#eee",
        fontFamily: "Arial, sans-serif",
        padding: 20,
        boxSizing: "border-box",
        overflowX: "auto",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          maxWidth: 420,
          width: "100%",
          backgroundColor: "#1e1e1e",
          padding: 30,
          borderRadius: 8,
          boxShadow: "0 0 20px rgba(225, 16, 0, 0.85)",
        }}
      >
        <h1
          style={{
            color: "#e10600",
            textAlign: "center",
            marginBottom: 24,
            fontWeight: "bold",
            fontSize: "1.8rem",
          }}
        >
          Cadastro F1 - Pilotos
        </h1>

        <form onSubmit={handleSubmit} noValidate>
          <label style={{ display: "block", marginBottom: 16 }}>
            Nome:
            <input
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: 10,
                marginTop: 6,
                borderRadius: 6,
                border: "1px solid #555",
                backgroundColor: "#222",
                color: "#eee",
                fontSize: "1rem",
              }}
            />
            {errors.nome && (
              <small style={{ color: "#ff4c4c", marginTop: 4, display: "block" }}>
                {errors.nome}
              </small>
            )}
          </label>

          <label style={{ display: "block", marginBottom: 16 }}>
            Nacionalidade:
            <input
              type="text"
              name="nacionalidade"
              value={form.nacionalidade}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: 10,
                marginTop: 6,
                borderRadius: 6,
                border: "1px solid #555",
                backgroundColor: "#222",
                color: "#eee",
                fontSize: "1rem",
              }}
            />
            {errors.nacionalidade && (
              <small style={{ color: "#ff4c4c", marginTop: 4, display: "block" }}>
                {errors.nacionalidade}
              </small>
            )}
          </label>

          <label style={{ display: "block", marginBottom: 16 }}>
            Equipe:
            <select
              name="equipe"
              value={form.equipe}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: 10,
                marginTop: 6,
                borderRadius: 6,
                border: "1px solid #555",
                backgroundColor: "#222",
                color: "#eee",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              <option value="">Selecione</option>
              <option value="Mercedes">Mercedes</option>
              <option value="Red Bull">Red Bull</option>
              <option value="Ferrari">Ferrari</option>
              <option value="McLaren">McLaren</option>
              <option value="Williams">Williams</option>
              <option value="Lotus">Lotus</option>
              <option value="Tyrrell">Tyrrell</option>
              <option value="Brabham">Brabham</option>
            </select>
            {errors.equipe && (
              <small style={{ color: "#ff4c4c", marginTop: 4, display: "block" }}>
                {errors.equipe}
              </small>
            )}
          </label>

          <label style={{ display: "block", marginBottom: 24 }}>
            Número de títulos do piloto:
            <input
              type="number"
              name="titulos"
              min="0"
              value={form.titulos}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: 10,
                marginTop: 6,
                borderRadius: 6,
                border: "1px solid #555",
                backgroundColor: "#222",
                color: "#eee",
                fontSize: "1rem",
                cursor: "text",
              }}
            />
            {errors.titulos && (
              <small style={{ color: "#ff4c4c", marginTop: 4, display: "block" }}>
                {errors.titulos}
              </small>
            )}
          </label>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: 12,
              backgroundColor: "#e10600",
              color: "#fff",
              fontWeight: "700",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              fontSize: "1.1rem",
              transition: "background-color 0.25s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#b00500")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#e10600")}
          >
            Cadastrar
          </button>
        </form>

        {submittedData.length > 0 && (
          <div
            style={{
              marginTop: 32,
              padding: 20,
              backgroundColor: "#333",
              borderRadius: 8,
              boxShadow: "0 0 15px rgba(225,16,0,0.8)",
              fontSize: "1rem",
              maxHeight: "40vh",
              overflowY: "auto",
            }}
          >
            <h2 style={{ marginBottom: 14, fontWeight: "600" }}>Dados cadastrados:</h2>
            {submittedData.map((piloto, index) => (
              <div
                key={index}
                style={{
                  marginBottom: 20,
                  paddingBottom: 10,
                  borderBottom: "1px solid #555",
                }}
              >
                <p>
                  <b>Nome:</b> {piloto.nome}
                </p>
                <p>
                  <b>Nacionalidade:</b> {piloto.nacionalidade}
                </p>
                <p>
                  <b>Equipe:</b> {piloto.equipe}
                </p>
                <p>
                  <b>Campeão:</b> {piloto.titulos > 0 ? "Sim" : "Não"}
                </p>
                <p>
                  <b>Títulos:</b> {piloto.titulos}
                </p>
                <button
                  onClick={() => handleDelete(index)}
                  style={{
                    marginTop: 10,
                    width: "100%",
                    padding: 8,
                    backgroundColor: "#555",
                    color: "#eee",
                    fontWeight: "600",
                    border: "none",
                    borderRadius: 6,
                    cursor: "pointer",
                    fontSize: "0.9rem",
                    transition: "background-color 0.25s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#777")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#555")}
                >
                  Deletar cadastro
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
