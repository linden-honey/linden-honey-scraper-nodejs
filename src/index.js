const express = require('express')
require('express-async-errors')// patch to support promise rejection

const { config } = require('./utils/config')
const { Scraper } = require('./services')
const { SongController, DocsController } = require('./controllers')

const { oas } = require('./docs')

const app = express()

const { Router } = express

/**
 * Declare song routes
 */
const songController = new SongController({
    scraper: new Scraper({
        baseUrl: config.application.scraper.baseUrl,
        retryConfig: config.application.scraper.retry,
    }),
})
const songRouter = new Router()
    .get('/', [
        songController.getPreviews,
        songController.getSongs,
    ])
    .get('/:id', songController.getSong)

/**
 * Declare documentation routes
 */
const docsController = new DocsController({
    spec: oas,
})
const docsRouter = new Router()
    .use('/', docsController.swaggerUiStatic)
    .get('/api-docs', docsController.getSpec)
    .get('/', docsController.getSwaggerUi)

/**
 * Declare API routes
 */
const apiRouter = new Router()
    .use('/songs', songRouter)

/**
 * Apply routes
 */
app.use('/', docsRouter)
app.use(config.application.rest.basePath, apiRouter)

app.listen(config.server.port, () => {
    console.log(`Application is started on ${config.server.port} port!`)
})
