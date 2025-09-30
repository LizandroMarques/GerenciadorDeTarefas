import express from 'express';
import {
	createTarefa,
	deleteTarefa,
	getTarefa,
	getTarefas,
	updateTarefa,
} from '../controllers/tarefasController.js';
import { validateData } from '../middlewares/validateData.js';

const router = express.Router();

router.get('/', (req, res) => res.send('Api tarefas ON!!!'));
router.get('/tarefas', getTarefas);
router.post('/tarefas', validateData, createTarefa);
router.get('/tarefas/:id', getTarefa);
router.put('/tarefas/:id', validateData, updateTarefa);
router.delete('/tarefas/:id', deleteTarefa);

export default router;
