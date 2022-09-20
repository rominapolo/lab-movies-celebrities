const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const CelebritySchema = new mongoose.Schema ({
    name: {
        type: String,
    },
    occupation: {
        type: String,
    },
    catchPhrase: {
        type: String,
    }
})

const Celebrity = model('Celebrity', CelebritySchema);
module.exports = Celebrity;
