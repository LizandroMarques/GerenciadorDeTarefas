// TarefaLinha.jsx
import React from "react";
import { FiberManualRecord } from "@mui/icons-material";
import {
  TableRow,
  TableCell,
  Checkbox,
  Typography,
  IconButton,
  TextField,
} from "@mui/material";
import { Edit, Delete, CheckCircle, Cancel } from "@mui/icons-material";

export default function TarefaLinha({
  tarefa,
  onEdit,
  onDelete,
  onToggleStatus,
}) {
  const handleCheckboxChange = () => {
    const novoStatus = tarefa.status === "Concluído" ? "Aberto" : "Concluído";

    const tarefaAtualizada = {
      ...tarefa,
      status: novoStatus,
    };

    onToggleStatus(tarefa.id, tarefaAtualizada);
  };

  const handleDescricaoChange = (e) => {
    const tarefaAtualizada = {
      ...tarefa,
      descricao: e.target.value,
    };
    onEdit(tarefaAtualizada);
  };

  return (
    <TableRow
      sx={{
        backgroundColor: tarefa.status === "Concluído" ? "#f0f0f0" : "inherit",
      }}
    >
      {/* Primeira coluna: menor */}
      <TableCell sx={{ width: 120, textAlign: "center" }}>
        <Typography variant="body1">{tarefa.dataCriacao}</Typography>
        <Checkbox
          checked={tarefa.status === "Concluído"}
          onChange={handleCheckboxChange}
        />
      </TableCell>

      {/* Coluna do meio: maior */}
      <TableCell sx={{ width: "auto" }}>
        <Typography variant="subtitle1" fontWeight="bold">
          {tarefa.titulo}
        </Typography>

        <TextField
          value={tarefa.descricao}
          onChange={handleDescricaoChange}
          variant="standard"
          multiline
          fullWidth
          InputProps={{ disableUnderline: true }}
          inputProps={{ maxLength: 300 }}
        />
      </TableCell>

      {/* Última coluna: ações + status */}
      <TableCell sx={{ width: 150 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <IconButton color="primary" onClick={() => onEdit(tarefa)}>
            <Edit />
          </IconButton>
          <IconButton color="error" onClick={() => onDelete(tarefa.id)}>
            <Delete />
          </IconButton>

          {/* Ícone de status */}
          {tarefa.status === "Aberto" ? (
            <FiberManualRecord style={{ color: "green" }} />
          ) : (
            <FiberManualRecord style={{ color: "GrayText" }} />
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}
