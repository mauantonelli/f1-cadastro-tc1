import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

export default function Cadastro() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    nacionalidade: "",
    equipe: "",
    titulos: 0,
  });

  const [errors, setErrors] = useState({});

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
      const saved = localStorage.getItem("cadastroF1");
      const pilotos = saved ? JSON.parse(saved) : [];
      const novosPilotos = [...pilotos, form];
      localStorage.setItem("cadastroF1", JSON.stringify(novosPilotos));
      setForm({ nome: "", nacionalidade: "", equipe: "", titulos: 0 });
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  }

  return (
    <div className="cadastro-container">
      <h1>🏎️ Cadastro F1 - Pilotos</h1>

      <form onSubmit={handleSubmit} noValidate>
        <input type="text" name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} />
        {errors.nome && <p className="erro">{errors.nome}</p>}

        <input type="text" name="nacionalidade" placeholder="Nacionalidade" value={form.nacionalidade} onChange={handleChange} />
        {errors.nacionalidade && <p className="erro">{errors.nacionalidade}</p>}

        <select name="equipe" value={form.equipe} onChange={handleChange}>
          <option value="">Equipe</option>
          <option value="Mercedes">Mercedes</option>
          <option value="Red Bull">Red Bull</option>
          <option value="Ferrari">Ferrari</option>
          <option value="McLaren">McLaren</option>
          <option value="Williams">Williams</option>
          <option value="Aston Martin">Aston Martin</option>
          <option value="Alpine">Alpine</option>
          <option value="AlphaTauri">AlphaTauri</option>
          <option value="Alfa Romeo">Alfa Romeo</option>
          <option value="Haas">Haas</option>
          <option value="Sauber">Sauber</option>
          <option value="Toro Rosso">Toro Rosso</option>
          <option value="Lotus">Lotus</option>
          <option value="Force India">Force India</option>
          <option value="Jaguar">Jaguar</option>
          <option value="Brawn GP">Brawn GP</option>
          <option value="Renault">Renault</option>
          <option value="Benetton">Benetton</option>
          <option value="BRM">BRM</option>
          <option value="Tyrrell">Tyrrell</option>
          <option value="March">March</option>
          <option value="Brabham">Brabham</option>
          <option value="Ligier">Ligier</option>
          <option value="Minardi">Minardi</option>
          <option value="Super Aguri">Super Aguri</option>
          <option value="HRT">HRT</option>
          <option value="Caterham">Caterham</option>
          <option value="Spyker">Spyker</option>
          <option value="Toyota">Toyota</option>
          <option value="Virgin Racing">Virgin Racing</option>
          <option value="Pacific">Pacific</option>
        </select>

        {errors.equipe && <p className="erro">{errors.equipe}</p>}

        <label>
          Títulos:{" "}
          <input type="number" name="titulos" value={form.titulos} onChange={handleChange} min="0" />
        </label>
        {errors.titulos && <p className="erro">{errors.titulos}</p>}

        <button type="submit" className="botao-principal">Cadastrar</button>
      </form>

      <button onClick={() => navigate("/pilotos")} className="botao-secundario">
        Ver pilotos cadastrados
      </button>
    </div>
  );
}
