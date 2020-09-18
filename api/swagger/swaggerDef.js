module.exports = {
	info: {
		title: 'Generated API', // Title (required)
		version: '1.0.0', // Version (required)
		description: 'Generated API description', // Description (optional)
	},
	host: 'localhost:3000', // Host (optional)
	basePath: `/${process.env.STAGE || 'dev'}`, // Base path (optional)
	apis: ['./src/models/**/*.js', './src/routes/*.js']
};
