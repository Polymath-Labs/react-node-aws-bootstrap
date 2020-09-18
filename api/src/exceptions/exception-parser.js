import Exception from './exception';

const GenericError = (exception) => {
	const error = {
		code: 500,
		message: 'Internal server error',
		timestamp: new Date().getTime()
	};

	if (process.env.LOG_LEVEL && process.env.LOG_LEVEL === 'DEBUG') {
		error.trace = (exception.stack || exception);
	}

	return error;
};

class ExceptionParser {
	static toJson(error) {
		if (error instanceof Exception) {
			return error.toJson();
		}
		return GenericError(error);
	}
}

export default ExceptionParser;
