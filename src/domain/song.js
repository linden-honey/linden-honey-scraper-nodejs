module.exports = class Song {
    constructor({ title, author, album, verses = [] }) {
        this.title = title
        this.author = author
        this.album = album
        this.verses = verses
    }
}
