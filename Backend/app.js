import express from 'express';
import tarefasRota from './src/routes/tarefas.js';

const app = express();

app.use(express.json());
app.use('/', tarefasRota);

export default app;
