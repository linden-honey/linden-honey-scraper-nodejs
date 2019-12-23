const express = require('express')

const { config } = require('./utils/config')
const { Scraper } = require('./services')
const { SongController, DocsController } = require('./controllers')

const { oas } = require('./docs')

const app = express()

const { Router } = express

const docsRouter = new Router()
const docsController = new DocsController({
    spec: oas,
})
docsRouter.use('/', docsController.swaggerUiStatic)
docsRouter.get('/api-docs', docsController.getSpec)
docsRouter.get('/', docsController.getSwaggerUi)

const apiRouter = new Router()
const songController = new SongController({
    scraper: new Scraper({
        baseUrl: config.application.scraper.baseUrl,
        retryConfig: config.application.scraper.retry,
    }),
})
apiRouter.get('/songs', [
    songController.getPreviews,
    songController.getSongs,
])
apiRouter.get('/songs/:id', songController.getSong)

app.use('/', docsRouter)
app.use(config.application.rest.basePath, apiRouter)

app.listen(config.server.port, () => {
    console.log(`Application is started on ${config.server.port} port!`)
})
