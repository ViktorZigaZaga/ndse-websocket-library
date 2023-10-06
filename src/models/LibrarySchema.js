const { Schema, model } = require('mongoose');

const LibrarySchema = new Schema({
    title: {
        type: string,
        require: true,
    },
    description: {
        type: string,
        default: "",
    },
    authors: {
        type: string,
        default: "",
    },
    favorite: {
        type: string,
        default: "",
    },
    fileCover: {
        type: string,
        default: "",
    },
    fileName: {
        type: string,
        default: "",
    },
    fileBook: {
        type: string,
        default: "",
    }
});

module.exports = model('Library', LibrarySchema);