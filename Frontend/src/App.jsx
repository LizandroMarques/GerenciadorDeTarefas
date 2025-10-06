import { useState, useEffect } from "react";
import "./App.css";
import NovaTarefa from "./components/NovaTarefa";
import TarefasTabela from "./components/TarefasTabela";
import { Snackbar, Alert } from "@mui/material";
import { dataAtualFormatada } from "./utils/date";
import planilhaImg from "./assets/planilha.png";

export default function App() {
  const [tarefas, setTarefas] = useState([]);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
  });
  const [tarefaEmEdicao, setTarefaEmEdicao] = useState(null);

  const fetchTarefas = async () => {
    try {
      const res = await fetch("http://localhost:3000/tarefas");
      const data = await res.json();
      setTarefas(data);

      setSnackbar({
        open: true,
        message: "Tarefa salva com sucesso!",
      });
    } catch (err) {
      console.error("Erro ao buscar tarefas", err);
    }
  };

  useEffect(() => {
    fetchTarefas();
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

  return (
    <div id="windows">
      <aside id="divEsquerda"></aside>
      <main id="content">
        <header id="header">
          <img
            src={planilhaImg}
            alt="imagemPlanilha"
            height={"100px"}
            width={"100px"}
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
          <TarefasTabela
            tarefas={tarefas}
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
