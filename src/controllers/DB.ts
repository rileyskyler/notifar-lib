const mongoose = require('mongoose');

const Location = require('../models/Location')
const User = require('../models/User')
const Device = require('../models/Device')

import { GraphqlType } from '../types/GraphqlSchema'
 
export const locations = async () => {
    return Location.find({longitude: 'testLong'})
}

export const createLocation = async (tel: string, message: string) => {

    const coordinates = message.replace(/\s/g, '').split(',')

    const location = new Location({
        longitude: coordinates[0],
        latitude: coordinates[1]
    })

    console.log(await location.save())
}


export const createUser : Function = async (args: GraphqlType.ICreateUserOnRootMutationArguments) => {
    
    const user = new User({
        name: args.userInput.name
    })
    const res = await user.save()
    return {name: res.name, _id: res._id.toString()}
}

export const createDevice : Function = async (args: GraphqlType.ICreateDeviceOnRootMutationArguments) => {
    console.log(args)
    const device = new Device({
        tel: args.deviceInput.tel
    })
    const res = await device.save()
    return {_id: res._id.toString(), tel: res.tel}
}

export const connect : Function = () : any => {
    mongoose.connect(
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-beat6.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`,
        { useNewUrlParser: true }
    )
}