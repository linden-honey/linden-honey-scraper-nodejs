# Linden Honey Scraper

> Lyrics scraper service powered by Express.js

[![build](https://img.shields.io/github/workflow/status/linden-honey/linden-honey-scraper-nodejs/CI)](https://github.com/linden-honey/linden-honey-scraper-nodejs/actions?query=workflow%3ACI)
[![version](https://img.shields.io/badge/node->=12-brightgreen.svg?style=flat-square)](https://nodejs.org/)
[![coverage](https://img.shields.io/codecov/c/github/linden-honey/linden-honey-scraper-nodejs)](https://codecov.io/github/linden-honey/linden-honey-scraper-nodejs)
[![tag](https://img.shields.io/github/tag/linden-honey/linden-honey-scraper-nodejs.svg)](https://github.com/linden-honey/linden-honey-scraper-nodejs/tags)

## Technologies

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)

## Usage

### Local

Run application:

```bash
npm run start
```

Run application in debug mode:

```bash
npm run debug
```

Run tests:

```bash
npm run test
```

### Docker

Bootstrap full project using docker-compose:

```bash
docker-compose up
```

Bootstrap project excluding some services using docker-compose:

```bash
docker-compose up --scale [SERVICE=0...]
```

Stop and remove containers, networks, images:

```bash
docker-compose down
```

## Application instance

[https://linden-honey-scraper-nodejs.herokuapp.com](https://linden-honey-scraper-nodejs.herokuapp.com)
