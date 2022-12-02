const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const WineSchema = new mongoose.Schema ({
    Name: {
        type: String
    },
    Type: {
        type: String,
    },
    Year: {
        type: Number,
    },
    Description: {
        type: String,
    },
    Region: {
        type: [{type: Schema.Types.ObjectId, ref: 'User'}]
    }
})

const Wine = model('Wine', CommentSchema);
module.exports = Wine;
