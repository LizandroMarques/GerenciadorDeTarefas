import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { dataAtualFormatada } from "../utils/date";

function NovaTarefa({ tarefaEmEdicao, onSave, fetchTarefas }) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState("Aberto");

  // Atualiza os campos quando tarefaEmEdicao mudar
  useEffect(() => {
    if (tarefaEmEdicao) {
      setTitulo(tarefaEmEdicao.titulo);
      setDescricao(tarefaEmEdicao.descricao);
      setStatus(tarefaEmEdicao.status);
    } else {
      setTitulo("");
      setDescricao("");
      setStatus("Aberto");
    }
  }, [tarefaEmEdicao]);

  const handleSalvar = async () => {
    if (titulo.trim().length < 5 || titulo.trim().length > 50) {
      alert("O título deve ter entre 5 e 50 caracteres.");
      return;
    }

    if (descricao.trim().length < 5 || descricao.trim().length > 3000) {
      alert("A descrição deve ter entre 5 e 3000 caracteres.");
      return;
    }

    try {
      if (tarefaEmEdicao) {
        await onSave({
          id: tarefaEmEdicao.id,
          titulo: titulo.trim(),
          descricao: descricao.trim(),
          status,
          dataCriacao: tarefaEmEdicao.dataCriacao,
        });
      } else {
        // POST
        await fetch("http://localhost:3000/tarefas", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            titulo: titulo.trim(),
            descricao: descricao.trim(),
            status,
            dataCriacao: dataAtualFormatada(),
          }),
        });

        // Atualiza a lista de tarefas chamando fetchTarefas do App
        await fetchTarefas();
      }

      // limpa campos
      setTitulo("");
      setDescricao("");
      setStatus("Aberto");
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar tarefa.");
    }
  };

  return (
    <Card sx={{ margin: 1, padding: 0 }}>
      <CardContent>
        <Grid container spacing={2} alignItems="flex-start">
          <Grid item xs={12} sm={5} sx={{ width: "1300px" }}>
            <Typography variant="subtitle1">Título</Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Digite o título, min 5 max 50 caracteres."
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />

            <Typography variant="subtitle1" sx={{ marginTop: 1 }}>
              Descrição
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Digite a descrição, min 5 max 3000 caracteres."
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />

            <Typography variant="subtitle1" sx={{ marginTop: 1 }}>
              Status
            </Typography>
            <TextField
              select
              fullWidth
              variant="outlined"
              size="small"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="Aberto">Aberto</MenuItem>
              <MenuItem value="Concluído">Concluído</MenuItem>
            </TextField>

            <Button
              variant="contained"
              color="warning"
              sx={{ marginTop: 1 }}
              onClick={handleSalvar}
            >
              {tarefaEmEdicao ? "Salvar Alterações" : "Cadastrar"}
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default NovaTarefa;
