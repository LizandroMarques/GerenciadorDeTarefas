// TarefasTable.jsx
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import TarefaLinha from "./TarefaLinha";

export default function TarefasTabela({
  tarefas,
  onEdit,
  onDelete,
  onToggleStatus,
}) {
  return (
    <TableContainer component={Paper}>
      <Table>
        {/* <TableHead>
          <TableRow>
            <TableCell>Data</TableCell>
            <TableCell>Tarefa</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead> */}
        <TableBody>
          {tarefas.map((t) => (
            <TarefaLinha
              key={t.id}
              tarefa={t}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleStatus={onToggleStatus}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
