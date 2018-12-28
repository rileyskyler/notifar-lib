const Location = require('../models/Location')
const User = require('../models/User')
const mongoose = require('mongoose');

import * as GraphqlType from '../types/Test'

export const createLocation = async (tel: string, message: string) => {

    const coordinates = message.replace(/\s/g, '').split(',')

    const location = new Location({
        longitude: coordinates[0],
        latitude: coordinates[1]
    })

    console.log(await location.save())
}

export const createUser : Function = async (args: GraphqlType.GQL.ICreateUserOnRootMutationArguments) => {
    
    const user = new User({
        name: args.userInput.name
    })
     
    return user.save()
}

export const connect : Function = () : any => {
    mongoose.connect(
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-beat6.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`,
        { useNewUrlParser: true }
    )
}