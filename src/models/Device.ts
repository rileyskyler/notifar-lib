import * as Mongoose from 'mongoose'
const Schema = Mongoose.Schema;

const deviceSchema = new Schema({
    tel : {
        type: String,
        required: true
    },
    owner : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

export default Mongoose.model('Device', deviceSchema)