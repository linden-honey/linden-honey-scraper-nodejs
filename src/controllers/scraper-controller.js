class ScraperController {
    constructor({ scraper }) {
        this.scraper = scraper
    }

    getSongs = async (req, res) => {
        const songs = await this.scraper.fetchSongs()
        res.json(songs)
    }

    getSong = async (req, res) => {
        const { id } = req.params
        const songs = await this.scraper.fetchSong(id)
        res.json(songs)
    }

    getPreviews = async (req, res) => {
        const songs = await this.scraper.fetchPreviews()
        res.json(songs)
    }
}

module.exports = ScraperController
