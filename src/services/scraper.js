const axios = require('axios')
const retry = require('async-retry')
const iconv = require('iconv-lite')

const { parsePreviews, parseSong } = require('../utils/parser')
const { createValidator } = require('../utils/validation')

const validateSong = createValidator(
    (song) => song && song.title && song.verses && song.verses.length,
    () => new Error('song validation failed'),
)

const responseDecoderInterceptor = (encoding) => (response) => {
    response.data = iconv.decode(response.data, encoding)
    return response
}

class Scraper {
    constructor({ baseUrl, retryConfig }) {
        this.client = axios.create({
            baseURL: baseUrl,
            responseType: 'arraybuffer',
        })
        this.retryConfig = retryConfig
        this.client.interceptors.response.use(responseDecoderInterceptor('cp1251'))
    }

    fetchSongs = async () => {
        console.debug('Songs fetching started')
        const previews = await this.fetchPreviews()
        const promises = await Promise.allSettled(previews.map(({ id }) => this.fetchSong(id)))
        const songs = promises
            .filter(({ status }) => status === 'fulfilled')
            .filter(({ value }) => value)
            .map(({ value }) => value)
        console.debug('Songs fetching successfully finished')
        return songs
    }

    fetchSong = async (id) => {
        console.debug(`Fetching song with id ${id}`)
        const html = await retry(
            async (_, attempt) => {
                console.debug(`Fetching song with id ${id} - attempt ${attempt}`)
                const { data } = await this.client.get(`text_print.php?area=go_texts&id=${id}`)
                return data
            },
            {
                ...this.retryConfig,
                onRetry: (error) => {
                    console.debug(`Fetching attempt for song with id ${id} is failed`)
                    console.debug('Retry is caused by:', error.message)
                },
            },
        )
        try {
            const song = validateSong(parseSong(html))
            console.debug(`Successfully fetched song with id ${id} and title "${song.title}"`)
            return song
        } catch (error) {
            const message = `Fetching song with id ${id} is failed due to: ${error.message}`
            console.warn(message)
            throw new Error(message);
        }
    }

    fetchPreviews = async () => {
        console.debug('Previews fetching started')
        const { data } = await this.client.get('/texts')
        const previews = parsePreviews(data)
        console.debug('Previews fetching successfully finished')
        return previews
    }
}

module.exports = Scraper
