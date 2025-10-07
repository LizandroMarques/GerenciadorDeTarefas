import { useState, useEffect } from "react";
import "./App.css";
import NovaTarefa from "./components/NovaTarefa";
import TarefasTabela from "./components/TarefasTabela";
import { Snackbar, Alert, TextField, MenuItem } from "@mui/material";
import { dataAtualFormatada } from "./utils/date";
import { parseData } from "./utils/date";
import planilhaImg from "./assets/planilha.png";
import { DatasetRounded } from "@mui/icons-material";

export default function App() {
  const [tarefas, setTarefas] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
  });
  const [tarefaEmEdicao, setTarefaEmEdicao] = useState(null);
  const [isFirstRender, setIsFirstRender] = useState(true);

  //useState dos filtros
  const [filtroStatus, setFiltroStatus] = useState("Todos");
  const [ordem, setOrdem] = useState("dataDesc");
  const [buscaTitulo, setBuscaTitulo] = useState("");

  const fetchTarefas = async () => {
    try {
      const res = await fetch("http://localhost:3000/tarefas");
      const data = await res.json();
      setTarefas(data);

      //não mostrará o snackbar no primeiro carregamento
      if (!isFirstRender) {
        setSnackbar({
          open: true,
          message: "Tarefa salva com sucesso!",
        });
      }
    } catch (err) {
      console.error("Erro ao buscar tarefas", err);
    }
  };

  useEffect(() => {
    fetchTarefas();
    setIsFirstRender(false); //setará a flag isFisrtRender para false para aparecer a mensagem quando salvar alguma tarefa
  }, []);

  const handleEdit = (tarefa) => {
    setTarefaEmEdicao(tarefa);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/tarefas/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erro ao excluir tarefa");
      setTarefas((prev) => prev.filter((t) => t.id !== id));

      setSnackbar({
        open: true,
        message: "Tarefa excluída com sucesso!",
      });
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        message: "Erro ao excluir tarefa.",
      });
    }
  };

  const handleToggleStatus = async (id, tarefaAtualizada) => {
    try {
      const res = await fetch(`http://localhost:3000/tarefas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tarefaAtualizada),
      });
      if (!res.ok) throw new Error("Erro ao atualizar status");
      await fetchTarefas();
    } catch (err) {
      console.error(err);
    }
  };

  const tarefasFiltradas = tarefas
    .filter((t) => {
      if (filtroStatus !== "Todos" && t.status !== filtroStatus) return false;
      if (
        buscaTitulo &&
        !t.titulo.toLowerCase().includes(buscaTitulo.toLowerCase())
      )
        return false;
      return true;
    })
    .sort((a, b) => {
      if (ordem === "alfabeticaAsc") return a.titulo.localeCompare(b.titulo);
      if (ordem === "alfabeticaDesc") return b.titulo.localeCompare(a.titulo);
      if (ordem === "dataAsc") {
        console.log(
          "a.dataCriacao" + a.dataCriacao,
          "parseData: " + parseData(a.dataCriacao)
        );
        return parseData(a.dataCriacao) - parseData(b.dataCriacao);
      }
      if (ordem === "dataDesc")
        return parseData(b.dataCriacao) - parseData(a.dataCriacao);
      return 0;
    });

  return (
    <div id="windows">
      <aside id="divEsquerda"></aside>
      <main id="content">
        <header id="header">
          <img
            src={planilhaImg}
            alt="imagemPlanilha"
            height={"70px"}
            width={"70px"}
          ></img>
          <h2>GERENCIADOR DE TAREFAS</h2>
        </header>
        <section id="topCentral">
          <NovaTarefa
            tarefaEmEdicao={tarefaEmEdicao}
            onSave={async (tarefaAtualizada) => {
              try {
                if (tarefaAtualizada.id) {
                  const res = await fetch(
                    `http://localhost:3000/tarefas/${tarefaAtualizada.id}`,
                    {
                      method: "PUT",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(tarefaAtualizada),
                    }
                  );
                  if (!res.ok) throw new Error("Erro ao atualizar tarefa");
                } else {
                  await fetch("http://localhost:3000/tarefas", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      ...tarefaAtualizada,
                      dataCriacao: dataAtualFormatada(),
                    }),
                  });
                }
                await fetchTarefas();
                setTarefaEmEdicao(null);
                setSnackbar({
                  open: true,
                  message: "Tarefa salva com sucesso!",
                });
              } catch (err) {
                console.error(err);
                setSnackbar({
                  open: true,
                  message: "Erro ao salvar tarefa.",
                });
              }
            }}
            fetchTarefas={fetchTarefas}
          />
        </section>
        <section id="central">
          <div id="filtro">
            <TextField
              label="Buscar por título"
              size="small"
              value={buscaTitulo}
              onChange={(e) => setBuscaTitulo(e.target.value)}
              sx={{
                width: "100%",
                minWidth: "50px",
                maxWidth: "800px",
                marginRight: "10px",
              }}
            />

            <TextField
              select
              label="Status"
              size="small"
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
              style={{ maxWidth: 150, marginRight: "10px" }}
            >
              <MenuItem value="Todos">Todos</MenuItem>
              <MenuItem value="Aberto">Aberto</MenuItem>
              <MenuItem value="Concluído">Concluído</MenuItem>
            </TextField>

            <TextField
              select
              label="Ordenar por"
              size="small"
              value={ordem}
              onChange={(e) => setOrdem(e.target.value)}
              style={{ maxWidth: 230 }}
            >
              <MenuItem value="dataDesc">Data (mais recente)</MenuItem>
              <MenuItem value="dataAsc">Data (mais antiga)</MenuItem>
              <MenuItem value="alfabeticaAsc">Título (A-Z)</MenuItem>
              <MenuItem value="alfabeticaDesc">Título (Z-A)</MenuItem>
            </TextField>
          </div>
          <TarefasTabela
            tarefas={tarefasFiltradas}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleStatus={handleToggleStatus}
          />
        </section>
        <footer id="footer">@2025 v1.0</footer>
      </main>
      <aside id="divDireita"></aside>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
