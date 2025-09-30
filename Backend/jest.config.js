/** @type {import('jest').Config} */
export default {
	testEnvironment: 'node',
	verbose: true,
	transform: {
		'^.+\\.m?js$': 'babel-jest', // transforma arquivos JS/MJS com Babel
	},
};
