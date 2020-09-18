export default {
    API: process.env.REACT_APP_API || '',
    LOG_LEVEL: process.env.LOG_LEVEL || process.env.REACT_APP_LOG_LEVEL || '',
    LOGGING: {
        'components/HelloWorld': 'DEBUG'
    }
}
