class ScraperController {
    constructor({ scraper }) {
        this.scraper = scraper
    }

    getSongs = async (req, res) => {
        const songs = await this.scraper.fetchSongs()
        res.json(songs)
    }
}

module.exports = ScraperController
