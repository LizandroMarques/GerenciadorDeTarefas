export function validateData(req, res, next) {
	if (!req.body) {
		return res.status(400).json({
			error: 'Favor informar o json da tarefa no corpo da requisição.',
		});
	} else {
		const { titulo, descricao, status, dataCriacao } = req.body;

		if (!titulo || !descricao || !status || !dataCriacao)
			return res.status(400).json({
				error: 'Informaçoes incompletas, favor preencher os campos titulo, descricao, status e dataCriacao corretamente.',
			});
		if (titulo.length > 50 || titulo.length < 5)
			return res.status(400).json({
				error: 'Título incorreto. O campo deverá ter no mínimo 5 e no máximo 50 caracteres.',
			});
		if (descricao.length > 300 || descricao.length < 5)
			return res.status(400).json({
				error: 'Descricao incorreta. O campo deverá ter no mínimo 5 e no máximo 300 caracteres.',
			});
	}
	next();
}
