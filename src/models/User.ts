import * as Mongoose from 'mongoose'
const Schema = Mongoose.Schema;

const userSchema = new Schema({
    name : {
        type: String,
        required: true
    }
})

export default Mongoose.model('User', userSchema)