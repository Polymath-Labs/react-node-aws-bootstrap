import config from '@constants/config';

const LOG_LEVELS = {
    OFF: 0,
    FATAL: 100,
    ERROR: 200,
    WARN: 300,
    INFO: 400,
    DEBUG: 500,
    TRACE: 600,
};

const BROWSER_LOGGER = {
    info: 'log',
    debug: 'log',
    fatal: 'error',
};

const isBrowser = function() {
    try {return typeof window === 'object';}catch(e){ return false;}
};

// Pick up configured log level, or assume warn, which is a production level configuration
const LOG_LEVEL = LOG_LEVELS[(config.LOG_LEVEL).toUpperCase()] || LOG_LEVELS.WARN;

class Logger {
    context;
    level;

    constructor(context, level) {
        if (!context) {
            throw Error('Logger cannot be used without providing context');
        }

        this.context = context;
        if (level) {
            const logLevel = LOG_LEVELS[level];
            if (logLevel || logLevel === 0) {
                this.level = logLevel;
            }
        } else {
            this.level = LOG_LEVEL;
        }
    }

    /**
     * Log a debug statement, works only if LOG_LEVEL is at DEBUG level or higher
     *
     * @param exceptionCode
     * @param message
     * @param args
     */
    debug(exceptionCode, message, ...args) {
        this._log('debug', exceptionCode, message, args);
    }

    /**
     * Log an error statement, works only if LOG_LEVEL is at ERROR level or higher
     *
     * @param exceptionCode
     * @param message
     * @param args
     */
    error(exceptionCode, message, ...args) {
        this._log('error', exceptionCode, message, args);
    }

    /**
     * Log a fatal error statement, works only if LOG_LEVEL is at FATAL level or higher
     *
     * @param exceptionCode
     * @param message
     * @param args
     */
    fatal(exceptionCode, message, ...args) {
        this._log('fatal', exceptionCode, message, args);
    }

    /**
     * Log an info statement, works only if LOG_LEVEL is at INFO level or higher
     *
     * @param exceptionCode
     * @param message
     * @param args
     */
    info(exceptionCode, message, ...args) {
        this._log('info', exceptionCode, message, args);
    }

    /**
     * Log a warning statement, works only if LOG_LEVEL is at WARN level or higher
     *
     * @param exceptionCode
     * @param message
     * @param args
     */
    warn(exceptionCode, message, ...args) {
        this._log('warn', exceptionCode, message, args);
    }

    /**
     * Log a trace, works only if LOG_LEVEL is at TRACE level or higher
     *
     * @param exceptionCode
     * @param message
     * @param args
     */
    trace(exceptionCode, message, ...args) {
        this._log('trace', exceptionCode, message, args);
    }

    _log(level, exceptionCode, message, args) {
        if (LOG_LEVELS[level.toUpperCase()] > this.level) {
            // prevent logging for higher level logging
            return;
        }

        message = `(${this.context}: ${level.toUpperCase()}): [${exceptionCode}] ${message || ''}`;

        if (isBrowser()) {
            // eslint-disable-next-line no-console
            return args.length > 0 ? console[BROWSER_LOGGER[level] || level](message, ...args) : console[BROWSER_LOGGER[level] || level](message);
        } else {
            console.log('not browser');
            // eslint-disable-next-line no-console
            return args.length > 0 ? console[level](message, ...args) : console[level](message);
        }
    }
}

export default Logger;
