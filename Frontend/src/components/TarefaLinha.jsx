// TarefaRow.jsx
import React from "react";
import {
  TableRow,
  TableCell,
  Checkbox,
  Typography,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

export default function TarefaLinha({
  tarefa,
  onEdit,
  onDelete,
  onToggleStatus,
}) {
  const handleCheckboxChange = () => {
    const novoStatus = tarefa.status === "Concluído" ? "Aberto" : "Concluído";

    const tarefaAtualizada = {
      titulo: tarefa.titulo,
      descricao: tarefa.descricao,
      status: novoStatus,
      dataCriacao: tarefa.dataCriacao, // mantém a data original
    };

    onToggleStatus(tarefa.id, tarefaAtualizada);
  };

  return (
    <TableRow>
      <TableCell>
        <div style={{ textAlign: "center" }}>
          <Typography variant="body1">{tarefa.dataCriacao}</Typography>
          <Checkbox
            checked={tarefa.status === "Concluído"}
            onChange={() => handleCheckboxChange(tarefa.id, tarefa.status)}
          />
        </div>
      </TableCell>

      <TableCell>
        <Typography variant="subtitle1" fontWeight="bold">
          {tarefa.titulo}
        </Typography>
        <Typography variant="body2">{tarefa.descricao}</Typography>
      </TableCell>

      <TableCell>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>
            <IconButton color="primary" onClick={() => onEdit(tarefa)}>
              <Edit />
            </IconButton>
            <IconButton color="error" onClick={() => onDelete(tarefa.id)}>
              <Delete />
            </IconButton>
          </div>
          <Typography variant="body2">{tarefa.status}</Typography>
        </div>
      </TableCell>
    </TableRow>
  );
}
