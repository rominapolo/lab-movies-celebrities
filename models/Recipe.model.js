const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const RecipeSchema = new mongoose.Schema ({
    name: {
        type: String,
    },
    occupation: {
        type: String,
    },
    catchPhrase: {
        type: String,
    },
    WinePairing: {
        type: [{type: Schema.Types.ObjectId, ref: 'Wine'}]
    }
})

const Recipe = model('Celebrity', CelebritySchema);
module.exports = Celebrity;
