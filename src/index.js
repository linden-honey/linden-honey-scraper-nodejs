const express = require('express')
const { Router } = express

const { config } = require('./utils')
const { Scraper } = require('./services')
const { ScraperController } = require('./controllers')

const app = express()

const scraperController = new ScraperController({
    scraper: new Scraper(),
})
const apiRouter = Router({
    caseSensitive: false,
})

apiRouter.get('/songs', scraperController.getSongs)

app.use(config.application.rest.basePath, apiRouter)

app.listen(config.server.port, () => {
    console.log(`Application is started on ${config.server.port} port!`)
})
