const LOG_LEVELS = {
    OFF: 0,
    FATAL: 100,
    ERROR: 200,
    WARN: 300,
    INFO: 400,
    DEBUG: 500,
    TRACE: 600
};

// Pick up configured log level, or assume warn, which is a production level configuration
let LOG_LEVEL = LOG_LEVELS[(process.env.LOG_LEVEL || '').toUpperCase()] || LOG_LEVELS.WARN;

class Logger {

    constructor(context) {
        if (!context) {
            throw Error('Logger cannot be used without providing context');
        }

        this.context = context;
    }

    /**
     * Configure logging
     * @param {object} config Log configuration
     * @param {*object} config.exceptionCodes Exception codes for well known exceptions (appended to existing, overriding similar codes)
     * @param {*object} config.logLevel Log level, if not specified, will look for LOG_LEVEL environment variable, or assume "warn" level
     */
    static configure(config) {
        if (config.logLevel) {
            LOG_LEVEL = LOG_LEVELS[(config.logLevel || '').toUpperCase()] || LOG_LEVEL;
        }
    }

    /**
     * Log a debug statement, works only if LOG_LEVEL is at DEBUG level or higher
     *
     * @param message
     * @param args
     */
    debug(message, ...args) {
        this._log('debug', message, args);
    }

    /**
     * Log an error statement, works only if LOG_LEVEL is at ERROR level or higher
     *
     * @param message
     * @param args
     */
    error(message, ...args) {
        this._log('error', message, args);
    }

    /**
     * Log a fatal error statement, works only if LOG_LEVEL is at FATAL level or higher
     *
     * @param message
     * @param args
     */
    fatal(message, ...args) {
        this._log('fatal', message, args);
    }

    /**
     * Log an info statement, works only if LOG_LEVEL is at INFO level or higher
     *
     * @param message
     * @param args
     */
    info(message, ...args) {
        this._log('info', message, args);
    }

    /**
     * Log a warning statement, works only if LOG_LEVEL is at WARN level or higher
     *
     * @param message
     * @param args
     */
    warn(message, ...args) {
        this._log('warn', message, args);
    }

    /**
     * Log a trace, works only if LOG_LEVEL is at TRACE level or higher
     *
     * @param message
     * @param args
     */
    trace(message, ...args) {
        this._log('trace', message, args);
    }

    /**
     * Get calling function name reference
     */
    _callerName() {
        try {
            const callerName = (new Error()).stack.split('\n')[4].trim().split(' ')[1].replace(this.context + '.', '');
            return callerName.indexOf('<anonymous>') > -1? '' : '.' + callerName;
        } catch (e) {
            return '';
        }
    }

    _log(level, message, args) {
        if (LOG_LEVELS[level.toUpperCase()] > LOG_LEVEL) {
            // prevent logging for higher level logging
            return;
        }

        message = `(${this.context}${this._callerName()} ${level.toUpperCase()}): ${message}`;
        return args.length > 0 ? console[level](message, ...args) : console[level](message);
    }
}

module.exports = Logger;
