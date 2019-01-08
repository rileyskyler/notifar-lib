import * as Mongoose from 'mongoose'
const Schema = Mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    devices: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Device'
        }
    ]
})

export default Mongoose.model('User', userSchema)