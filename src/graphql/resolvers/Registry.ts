import Location from '../../models/Location'
import User from '../../models/User'
import Device from '../../models/Device'

import * as bcrypt from 'bcryptjs'

import * as GraphQlType from '../../types/GraphQlSchema'

import * as Misc from '../../types/Misc'

import { Configuration } from '../../types/Configuration' 

require('dotenv').load();

class Registry {

    conf : Configuration; 
    methods: any

    constructor(configuration : Configuration) {

        this.conf = configuration
        
        this.methods = {

            login: async (args: any) => {
                try {
                    User.findOne({email: 'test'})
                    
                }
                catch (err) {
                    throw err
                }
            },
            
            users: async () => {
                try {
                    return (await User.find()).map((user : any) => {
                        return {
                            ...user._doc,
                            _id: user.id,
                            devices: this.methods.devices.bind(this, user._doc.devices)
                        }                        
                    })
                }
                catch (err) {
                    throw err
                }
            },
            
            devices: async (deviceIds : any) => {
                try {
                    return (await Device.find({ _id: { $in: deviceIds } })).map((device : any) => {
                        return {
                            ...device._doc, 
                            _id: device.id,
                            locations: this.methods.locations.bind(this, device._doc.locations)
                        }
                    })
                }
                catch (err) {
                    throw err
                }
            },
            
            locations: async (locationIds : any) => {
                
                this.conf.logger.info(`[Registry] Locations`);
                
                try {
                    return (await Location.find({ _id: {$in: locationIds} })).map((location: any) => {
                        return {
                            ...location._doc,
                            _id: location.id
                        }
                    })
                }
                catch (err) {
                    throw err
                }
            },
            
            createUser: async (args: any) => {
                
                this.conf.logger.info(`[Registry] Create User`);
                
                try {

                    const hashedPassword = await bcrypt.hash(args.userInput.password, 12)

                    const user = new User({
                        name: args.userInput.name,
                        email: args.userInput.email,
                        password: hashedPassword
                    })

                    const res : any = await user.save()

                    return {name: res.name, _id: res._id.toString()}
                }
                catch (err) {
                    throw err
                }
            },
            
            createDevice: async (args : GraphQlType.CreateDevice) => {
                
                this.conf.logger.info(`[Registry] Create Device`);

                try {

                    const deviceKey: Misc.DeviceKey = {
                        tel: args.deviceInput.tel,
                        key: process.env.AUTH_KEY
                    }

                    const device = new Device({
                        tel: args.deviceInput.tel,
                        privateKey: bcrypt.hash(JSON.stringify(deviceKey), 12),
                    })

                    const res : any = await device.save();
                    
                    const user : any = await User.findById('5c2929c0b676ce274162efa9'); 
                    user.devices.push(device);
                    await user.save()
                    
                    return {...res._doc, _id: res.id};
                }
                catch (err) {
                    throw err
                }
            }

        }

    }
        
}

export default Registry;