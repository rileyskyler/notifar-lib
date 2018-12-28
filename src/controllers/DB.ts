const Location = require('../models/Location')
const mongoose = require('mongoose');

export const createLocation = async (tel: string, message: string) => {

    const coordinates = message.replace(/\s/g, '').split(',')

    const location = new Location({
        longitude: coordinates[0],
        latitude: coordinates[1]
    })

    console.log(await location.save())
}
    

export const connect : Function = () : any => {
    mongoose.connect(
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-beat6.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`,
        { useNewUrlParser: true }
    )
}