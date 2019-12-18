const getEnv = (key, defaultValue) => process.env[key] === undefined ? JSON.parse(process.env[key]) : defaultValue

const config = {
    application: {
        rest: {
            basePath: getEnv('APPLICATION_REST_BASE_PATH', '/api'),
        },
        scraper: {
            baseUrl: getEnv('APPLICATION_SCRAPER_BASE_URL', 'http://www.gr-oborona.ru/'),
            retry: {
                retries: getEnv('APPLICATION_SCRAPER_RETRY_RETRIES', 5),
                factor: getEnv('APPLICATION_SCRAPER_RETRY_FACTOR', 3),
                minTimeout: getEnv('APPLICATION_SCRAPER_RETRY_MIX_TIMEOUT', 1000),
                maxTimeout: getEnv('APPLICATION_SCRAPER_RETRY_MAX_TIMEOUT', 60000),
                randomize: getEnv('APPLICATION_SCRAPER_RETRY_MAX_TIMEOUT', true),
            },
        },
    },
    server: {
        port: getEnv('SERVER_PORT', 8080),
    },
}

module.exports = config
