class Exception extends Error {
	constructor(code: number, message: string) {
		super(message);
		this.code = code || 500;
		this.timestamp = new Date().getTime();
		Error.captureStackTrace(this, Exception);
	}

	toString() {
		return `${this.timestamp} - ${this.code}: ${this.message}`;
	}

	toJson() {
		return {
			code: this.code,
			message: this.message,
			timestamp: this.timestamp
		};
	}
}

export default Exception;
