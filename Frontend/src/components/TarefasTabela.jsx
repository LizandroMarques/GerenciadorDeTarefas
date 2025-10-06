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
    <TableContainer
      component={Paper}
      sx={{
        maxHeight: "400",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#00a8ff",
          borderRadius: "1px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#f0f0f0",
        },
        scrollbarColor: "#00a8ff #f0f0f0",
      }}
    >
      <Table stickyHeader>
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
