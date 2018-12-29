import * as Mongoose from 'mongoose'
const Schema = Mongoose.Schema;

const deviceSchema = new Schema({
    tel : {
        type: String,
        required: true
    }
})

export default Mongoose.model('Device', deviceSchema)