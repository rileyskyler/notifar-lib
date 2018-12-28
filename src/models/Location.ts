import * as Mongoose from 'mongoose'
const Schema = Mongoose.Schema;

const locationSchema = new Schema({
    longitude : {
        type: String,
        required: true
    },
    latitude : {
        type: String,
        required: true
    }
})

module.exports = Mongoose.model('Location', locationSchema)