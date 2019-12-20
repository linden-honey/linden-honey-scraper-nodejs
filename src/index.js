const express = require('express')

const { config } = require('./utils/config')
const { Scraper } = require('./services')
const { ScraperController } = require('./controllers')

const app = express()

const scraperController = new ScraperController({
    scraper: new Scraper({
        baseUrl: config.application.scraper.baseUrl,
        retry: config.application.scraper.retry,
    }),
})
const { Router } = express
const apiRouter = Router({
    caseSensitive: false,
})

apiRouter.get('/songs', scraperController.getSongs)
apiRouter.get('/songs/:id', scraperController.getSong)
apiRouter.get('/previews', scraperController.getPreviews)

app.use(config.application.rest.basePath, apiRouter)

app.listen(config.server.port, () => {
    console.log(`Application is started on ${config.server.port} port!`)
})
