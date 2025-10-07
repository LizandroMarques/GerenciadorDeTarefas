import app from './app.js';
import dotenv from 'dotenv';

dotenv.config();

const URL = process.env.URL;
const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.log(`Servidor rodando em ${URL}:${PORT}/`);
});
