import * as Mongoose from 'mongoose'
const Schema = Mongoose.Schema;

const locationSchema = new Schema({
    longitude: {
        type: String,
        required: true
    },
    latitude: {
        type: String,
        required: true
    },
    device: {
        type: Schema.Types.ObjectId,
        ref: 'Device'
    }
})

export default Mongoose.model('Location', locationSchema)