import * as Mongoose from 'mongoose'
const Schema = Mongoose.Schema;

const deviceSchema = new Schema({
    tel: {
        type: String,
        required: true
    },
    key: {
        type: String,
        required: true
    },
    locations: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Location'
        }
    ]
})

export default Mongoose.model('Device', deviceSchema)