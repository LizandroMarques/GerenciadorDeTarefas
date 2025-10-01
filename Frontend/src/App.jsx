import { useState, useEffect } from "react";
import "./App.css";
import NovaTarefa from "./components/NovaTarefa";
import TarefasTabela from "./components/TarefasTabela";
import { Snackbar, Alert } from "@mui/material";
import { dataAtualFormatada } from "./utils/date";

export default function App() {
  const [tarefas, setTarefas] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [tarefaEmEdicao, setTarefaEmEdicao] = useState(null);

  // Função para buscar tarefas do backend
  const fetchTarefas = async () => {
    try {
      const res = await fetch("http://localhost:3000/tarefas");
      const data = await res.json();
      setTarefas(data);
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
      setSnackbarOpen(true);
    } catch (err) {
      console.error(err);
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

      await fetchTarefas(); // Recarrega a lista após atualização
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div id="windows">
      <header id="header">
        <h2>GERENCIADOR DE TAREFAS</h2>
      </header>

      <aside id="divEsquerda"></aside>

      <main id="content">
        <section id="topCentral">
          <NovaTarefa
            tarefaEmEdicao={tarefaEmEdicao}
            onSave={async (tarefaAtualizada) => {
              try {
                if (tarefaAtualizada.id) {
                  // Edição
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
                  // Cadastro via POST
                  await fetch("http://localhost:3000/tarefas", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      titulo: tarefaAtualizada.titulo,
                      descricao: tarefaAtualizada.descricao,
                      status: tarefaAtualizada.status,
                      dataCriacao: dataAtualFormatada(),
                    }),
                  });
                }

                // Atualiza a lista completa de tarefas
                await fetchTarefas();
                setTarefaEmEdicao(null); // limpa o formulário
              } catch (err) {
                console.error(err);
                alert("Erro ao salvar tarefa.");
              }
            }}
            fetchTarefas={fetchTarefas} // <- ESSA LINHA É OBRIGATÓRIA
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
      </main>

      <aside id="divDireita"></aside>

      <footer id="footer">@2025 v1.0</footer>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Tarefa excluída com sucesso!
        </Alert>
      </Snackbar>
    </div>
  );
}
