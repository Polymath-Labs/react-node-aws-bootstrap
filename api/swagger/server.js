const express = require('express');
const app = express();
const port = 4000;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./public/swagger.json');

const options = {
	explorer: true
};

// configure swagger ui
app.use('', swaggerUi.serve);
app.get('', swaggerUi.setup(swaggerDocument, options));
app.use(express.static('public'));
app.listen(port, () => console.log(`Swagger docs listening at http://localhost:${port}`));

