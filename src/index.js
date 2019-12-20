const express = require('express')

const { config } = require('./utils/config')
const { Scraper } = require('./services')
const { SongController } = require('./controllers')

const app = express()

const songController = new SongController({
    scraper: new Scraper({
        baseUrl: config.application.scraper.baseUrl,
        retryConfig: config.application.scraper.retry,
    }),
})
const { Router } = express

const apiRouter = Router({
    caseSensitive: false,
})
apiRouter.get('/songs', [
    songController.getPreviews,
    songController.getSongs,
])
apiRouter.get('/songs/:id', songController.getSong)

app.use(config.application.rest.basePath, apiRouter)

app.listen(config.server.port, () => {
    console.log(`Application is started on ${config.server.port} port!`)
})
