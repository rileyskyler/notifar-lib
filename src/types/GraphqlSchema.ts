import * as Mongoose from 'mongoose'
const Schema = Mongoose.Schema;


export interface Location {
    _id: Mongoose.Types.ObjectId;
    longitude: string;
    latitude: string;
    device: Device
}

export interface Device {
    _id: Mongoose.Types.ObjectId;
    tel: string;
    key: string;
    locations: Location[]
}

export interface User {
    _id: Mongoose.Types.ObjectId;
    name: string;
    email: string;
    password: string;
    devices: Device[]
}

export interface CreateUser {
    userInput: UserInput
}

export interface UserInput {
    name: string;
    email: string;
    password: string;
}

export interface CreateDevice {
    deviceInput: DeviceInput
}

interface DeviceInput {
    tel: string;
}

export interface CreateLocation {
    locationInput: LocationInput
}

interface LocationInput {
    longitude: string;
    latitude: string;
}

export interface Login {
    loginInput: LoginInput;
}
interface LoginInput {
    email: string;
    password: string;
}
