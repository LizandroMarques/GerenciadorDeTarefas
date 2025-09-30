import request from 'supertest';
import * as tarefasService from '../src/services/tarefasServices.js'; // importa tudo como objeto

// 1️⃣ MOCAR O MÓDULO ANTES DE IMPORTAR APP
jest.mock('../src/services/tarefasServices.js');

import app from '../app.js'; // depois de mockar

// 2️⃣ Configurar os mocks
const mockTarefas = [
	{
		id: 1,
		titulo: 'titulo1',
		descricao: 'descricao1',
		status: 'Concluído',
		dataCriacao: '2025-09-29T10:00:00',
	},
	{
		id: 2,
		titulo: 'titulo2',
		descricao: 'descricao2',
		status: 'Aberto',
		dataCriacao: '2025-09-30T10:00:00',
	},
	{
		id: 3,
		titulo: 'titulo3',
		descricao: 'descricao3',
		status: 'Aberto',
		dataCriacao: '2025-09-30T10:00:00',
	},
];

tarefasService.lerTarefas.mockImplementation(() => mockTarefas);
tarefasService.lerTarefa.mockImplementation(
	(id) => mockTarefas.find((t) => t.id === Number(id)) || null
);
tarefasService.salvarTarefas.mockImplementation(() => {});
tarefasService.editarTarefa.mockImplementation(() => {});
tarefasService.deletarTarefa.mockImplementation(() => {});

// 3️⃣ Limpar mocks antes de cada teste
beforeEach(() => {
	jest.clearAllMocks();
});

// 4️⃣ Testes continuam iguais
describe('Testes do tarefasController', () => {
	it('GET /tarefas deve retornar lista de tarefas', async () => {
		const res = await request(app).get('/tarefas');
		expect(res.status).toBe(200);
		expect(res.body).toEqual(mockTarefas);
	});

	it('GET /tarefas/:id deve retornar uma tarefa existente', async () => {
		const res = await request(app).get('/tarefas/1');
		expect(res.status).toBe(200);
		expect(res.body).toEqual(mockTarefas[0]);
	});

	it('GET /tarefas/:id deve retornar 404 se não existir', async () => {
		const res = await request(app).get('/tarefas/99');
		expect(res.status).toBe(404);
		expect(res.body).toHaveProperty('erro', 'Tarefa não encontrada');
	});

	it('POST /tarefas deve criar nova tarefa', async () => {
		const res = await request(app).post('/tarefas').send({
			titulo: 'novaTarefa',
			descricao: 'novaDescricao',
			status: 'Aberto',
			dataCriacao: '2025-09-30T10:00:00',
		});
		expect(res.status).toBe(201);
		expect(res.body).toHaveProperty(
			'mensagem',
			'Tarefa adicionada com sucesso.'
		);
	});

	it('PUT /tarefas/:id deve atualizar uma tarefa', async () => {
		const res = await request(app).put('/tarefas/1').send(mockTarefas[0]);
		expect(res.status).toBe(200);
		expect(res.body).toHaveProperty(
			'mensagem',
			'Tarefa de id 1 alterada com sucesso.'
		);
	});

	it('DELETE /tarefas/:id deve excluir uma tarefa', async () => {
		const res = await request(app).delete('/tarefas/1');
		expect(res.status).toBe(200);
		expect(res.body).toHaveProperty(
			'mensagem',
			'Tarefa 1 excluída com sucesso.'
		);
	});
});
