const pluralize = require('pluralize');

module.exports = function (plop) {

	plop.addHelper('capitalize', (str) => {
		return str.charAt(0).toUpperCase() + str.slice(1);
	});

	plop.addHelper('pluralize', (str) => {
		return pluralize(str);
	});

	plop.setGenerator('routes', {
		description: 'App Function',
		prompts: [{
			type: 'input',
			name: 'name',
			message: 'What is the model name?'
		}],
		actions: function (data) {
			const actions = [
				{
					type: 'add',
					path: 'src/routes/{{name}}-routes.js',
					templateFile: 'generators/route.hbs',
					data: {
						openCurlyBrace: '{'
					}
				},
				{
					type: 'add',
					path: 'src/services/{{name}}-service.js',
					templateFile: 'generators/service.hbs',
					data: {
						openCurlyBrace: '{'
					}
				},
				{
					type: 'add',
					path: 'src/repositories/{{name}}-repository.js',
					templateFile: 'generators/repository.hbs',
					data: {
						openCurlyBrace: '{'
					}
				},
				{
					type: 'add',
					path: 'src/models/requests/{{capitalize name}}.requests.js',
					templateFile: 'generators/request.hbs',
					data: {
						openCurlyBrace: '{'
					}
				},
				{
					type: 'add',
					path: 'serverless/functions_{{pluralize name}}.yml',
					templateFile: 'generators/lambda-crud-function.hbs',
					data: {
						openCurlyBrace: '{'
					}
				},
				{
					type: 'modify',
					path: 'serverless.yml',
					pattern: '  # FUNCTIONS_PLACEHOLDER',
					// eslint-disable-next-line no-template-curly-in-string
					template: '  - ${file(./serverless/functions_{{pluralize name}}.yml)}\n  # FUNCTIONS_PLACEHOLDER',
					data: {
						openCurlyBrace: '{'
					}
				},
				{
					type: 'modify',
					path: 'src/index.js',
					pattern: '// ROUTE_IMPORT_PLACEHOLDER',
					// eslint-disable-next-line no-template-curly-in-string
					template: 'import {{name}}Routes from \'@routes/{{name}}-routes\';\n// ROUTE_IMPORT_PLACEHOLDER',
					data: {
						openCurlyBrace: '{'
					}
				},
				{
					type: 'modify',
					path: 'src/index.js',
					pattern: '// ROUTE_USE_PLACEHOLDER',
					// eslint-disable-next-line no-template-curly-in-string
					template: 'app.use(\'/{{pluralize name}}\', {{name}}Routes);\n// ROUTE_USE_PLACEHOLDER',
					data: {
						openCurlyBrace: '{'
					}
				},
				{
					type: 'add',
					path: 'src/models/{{capitalize name}}Model.js',
					templateFile: 'generators/model.hbs',
					data: {
						openCurlyBrace: '{'
					}
				}
			];

			return actions;
		}
	});
};
