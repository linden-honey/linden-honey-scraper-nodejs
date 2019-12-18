const express = require('express')

const { config } = require('./utils')

const app = express()

app.listen(config.server.port, () => {
    console.log(`Application is started on ${config.server.port} port!`)
})
