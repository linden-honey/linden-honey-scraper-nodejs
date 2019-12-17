# Linden Honey Scraper

> Lyrics scraper service powered by Koa.js

[![node version][node-image]][node-url]
[![build status][ci-image]][ci-url]
[![release][release-image]][release-url]
[![license][license-image]][license-url]

[node-image]: https://img.shields.io/badge/node->=12-brightgreen.svg?style=flat-square
[node-url]: https://nodejs.org/en/download/
[release-image]: https://img.shields.io/github/release/linden-honey/linden-honey-scraper.svg?style=flat-square
[release-url]: https://github.com/linden-honey/linden-honey-scraper/releases
[ci-image]: https://img.shields.io/github/workflow/status/linden-honey/linden-honey-scraper/CI
[ci-url]: https://github.com/linden-honey/linden-honey-scraper/actions
[license-image]: https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square
[license-url]: https://github.com/linden-honey/linden-honey-scraper/blob/master/LICENSE

## Technologies

- [Node](https://nodejs.org/)
- [Koa.js](https://koajs.com/)

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
docker-compose up  --scale [SERVICE=0...]
```

Stop and remove containers, networks, images:

```bash
docker-compose down
```

## Application instance

[https://linden-honey-scraper.herokuapp.com](https://linden-honey-scraper.herokuapp.com)
