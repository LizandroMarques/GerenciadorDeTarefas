import {
	editarTarefa,
	deletarTarefa,
	lerTarefa,
	lerTarefas,
	salvarTarefas,
} from '../services/tarefasServices.js';

export function getTarefas(req, res) {
	const tarefas = lerTarefas();
	res.json(tarefas);
}

export function getTarefa(req, res) {
	const tarefa = lerTarefa(req.params.id);

	if (!tarefa) {
		return res.status(404).json({
			erro: 'Tarefa não encontrada',
		});
	}
	return res.json(tarefa);
}

export function updateTarefa(req, res) {
	const tarefa = req.body;
	const idTarefa = req.params.id;

	if (!tarefa) {
		return res.status(404).json({
			erro: 'Informar json contendo a Tarefa para atualizar.',
		});
	}

	editarTarefa(idTarefa, tarefa);

	return res.json({
		mensagem: `Tarefa de id ${idTarefa} alterada com sucesso.`,
	});
}

export function createTarefa(req, res) {
	const tarefas = lerTarefas();
	const { titulo, descricao, status, dataCriacao } = req.body;

	//id novo: pega o id do último item e acrescenta 1
	const ultimaTarefa = tarefas[tarefas.length - 1];
	const ultimoId = ultimaTarefa ? ultimaTarefa.id : 0;

	const novaTarefa = {
		id: ultimoId + 1,
		titulo,
		descricao,
		status,
		dataCriacao,
	};

	tarefas.push(novaTarefa);
	salvarTarefas(tarefas);

	res.status(201).json({ mensagem: 'Tarefa adicionada com sucesso.' });
}

export function deleteTarefa(req, res) {
	const id = req.params.id;

	deletarTarefa(id);

	res.status(200).json({ mensagem: `Tarefa ${id} excluída com sucesso.` });
}
