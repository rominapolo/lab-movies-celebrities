const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const MovieSchema = new mongoose.Schema ({
    title: {
        type: String,
    },
    genre: {
        type: String,
    },
    plot: {
        type: String,
    },
    cast: {type: [{type: Schema.Types.ObjectId, ref: 'Celebrity'}]}
})

const Movie = model('Movie', MovieSchema);
module.exports = Movie;
