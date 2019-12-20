const cheerio = require('cheerio')

const { Preview, Quote, Song, Verse } = require('../domain')

const parseHtml = (html) => cheerio.load(html)
const isNotBlank = (string) => string && string.trim().length > 0

const parseQuote = (html) => {
    const $ = parseHtml(html)
    const phrase = $.text().trim().replace(/\s+/g, ' ')
    return new Quote(phrase)
}

const parseVerse = (html) => {
    const quotes = html
        .split('<br>')
        .map(parseQuote)
        .filter(({ phrase }) => isNotBlank(phrase))
    return new Verse(quotes)
}

const parseLyrics = (html) => isNotBlank(html) ? html.split(/(?:<br\>\s*){2,}/g).map(parseVerse) : []

const parseSong = (html) => {
    const $ = parseHtml(html)
    const unknown = 'неизвестен'
    const title = $('h2').text() || unknown
    const author = $('p:has(strong:contains(Автор))').text().split(': ')[1] || unknown
    const album = $('p:has(strong:contains(Альбом))').text().split(': ')[1] || unknown
    const lyricsHtml = $('p:last-of-type').html()
    const verses = parseLyrics(lyricsHtml)
    return new Song({ title, author, album, verses })
}

const parsePreviews = (html) => {
    const $ = parseHtml(html)
    return $('#abc_list a')
        .toArray()
        .map((link) => {
            const $link = $(link)
            const path = $link.attr('href')
            const id = isNotBlank(path) ? path.substring(path.lastIndexOf('/') + 1, path.indexOf('.')) : undefined
            const title = $link.text()
            return new Preview({ id, title })
        })
        .filter(({ id }) => isNotBlank(id))
}

module.exports = {
    parseQuote,
    parseVerse,
    parseLyrics,
    parseSong,
    parsePreviews
}
