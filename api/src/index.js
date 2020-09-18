// @flow
import serverless from 'serverless-http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import blogRoutes from '@routes/blog-routes';
// ROUTE_IMPORT_PLACEHOLDER

export const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/blogs', blogRoutes);
// ROUTE_USE_PLACEHOLDER

// catch 404 and forward to error handler
app.use((req, _, next) => {
	console.error('Path not found:', req.originalUrl);
	next(new Error('Not Found'));
});

// error handler
app.use((err, _, res) => {
	console.error(err);
	const errorStatus = 500;
	res.status(err.statusCode || errorStatus).json(err);
});

export const handler = serverless(app);
