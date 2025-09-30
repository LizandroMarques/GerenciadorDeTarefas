import fs from 'fs';
import path from 'path';

const caminho = path.resolve('src/json/tarefas.json');

export function lerTarefas() {
	const data = fs.readFileSync(caminho, 'utf-8');

	if (!data) {
		console.log('Não possui tarefas no momento.');
		return null;
	}
	return JSON.parse(data);
}

export function lerTarefa(id) {
	const data = fs.readFileSync(caminho, 'utf-8');

	if (!data) {
		console.log(`Não possui tarefa com esse id. ID: ${id}`);
		return null;
	}

	let tarefas = JSON.parse(data);

	for (let tarefa of tarefas) {
		if (tarefa.id == id) return tarefa;
	}
}

export function editarTarefa(idTarefa, tarefa) {
	let tarefas = lerTarefas();
	let tarefasAlteradas = [];

	let tarefaAlt = {
		id: Number(idTarefa),
		titulo: tarefa.titulo,
		descricao: tarefa.descricao,
		status: tarefa.status,
		dataCriacao: tarefa.dataCriacao,
	};

	//procura a tarefa no json e atualiza
	for (let tarefaElemento of tarefas) {
		if (idTarefa == tarefaElemento.id) {
			tarefasAlteradas.push(tarefaAlt);
		} else tarefasAlteradas.push(tarefaElemento);
	}

	salvarTarefas(tarefasAlteradas);
}

export function deletarTarefa(idTarefa) {
	let tarefas = lerTarefas();
	let tarefasAlteradas = [];

	for (let tarefaElemento of tarefas) {
		if (idTarefa != tarefaElemento.id) {
			tarefasAlteradas.push(tarefaElemento);
		}
	}
	salvarTarefas(tarefasAlteradas);
}

export function salvarTarefas(tarefas) {
	fs.writeFileSync(caminho, JSON.stringify(tarefas, null, 2));
}
