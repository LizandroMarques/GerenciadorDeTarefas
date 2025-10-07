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
import { Padding } from "@mui/icons-material";

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
    <Grid
      container
      spacing={1}
      direction="column"
      sx={{
        backgroundColor: "#ffffffff",
        padding: "10px",
      }}
    >
      {/* Linha 1: Título */}
      <Grid item>
        <TextField
          label="Título"
          variant="outlined"
          size="small"
          fullWidth
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
      </Grid>

      {/* Linha 2: Descrição */}
      <Grid item>
        <TextField
          label="Descrição"
          variant="outlined"
          size="small"
          fullWidth
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
      </Grid>

      {/* Linha 3: Status + Combo + Botão */}
      <Grid item>
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <TextField
              select
              label="Status"
              variant="outlined"
              size="small"
              style={{ width: 120 }}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="Aberto">Aberto</MenuItem>
              <MenuItem value="Concluído">Concluído</MenuItem>
            </TextField>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{ marginTop: 1 }}
              onClick={handleSalvar}
            >
              {tarefaEmEdicao ? "Salvar Alterações" : "Cadastrar"}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default NovaTarefa;
