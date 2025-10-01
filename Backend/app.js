import express from 'express';
import cors from 'cors';
import tarefasRota from './src/routes/tarefas.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', tarefasRota);

export default app;
