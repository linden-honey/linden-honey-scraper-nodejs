const axios = require('axios')
const retry = require('async-retry')
const iconv = require('iconv-lite')

const { parsePreviews, parseSong } = require('../utils/parser')
const { createValidator } = require('../utils/validation')

const validateSong = createValidator(
    (song) => song && song.verses && song.verses.length,
    () => new Error('Song validation failed'),
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
        const songs = await Promise.all(previews.map(({ id }) => this.fetchSong(id)))
        console.debug('Songs fetching successfully finished')
        return songs
    }

    fetchSong = async (id) => {
        console.debug(`Fetching song with id ${id}`)
        const song = await retry(
            async (_, attempt) => {
                console.debug(`Fetching song with id ${id} - attempt ${attempt}`)
                const { data } = await this.client.get(`text_print.php?area=go_texts&id=${id}`)
                return validateSong(parseSong(data))
            },
            {
                ...this.retryConfig,
                onRetry: (error) => {
                    console.debug(`Fetching attempt for song with id ${id} is failed`)
                    console.debug('Retry is caused by:', error.message)
                },
            },
        )
        console.debug(`Successfully fetched song with id ${id} and title "${song.title}"`)
        return song
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
