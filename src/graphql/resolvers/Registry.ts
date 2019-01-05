import Location from '../../models/Location'
import User from '../../models/User'
import Device from '../../models/Device'

import { Configuration } from '../../types/Configuration' 
import { ICreateLocationOnRootMutationArguments, ILocation } from '../../types/GraphQlSchema';

const fileName = require('../../helpers/File').getFileName(__filename, __dirname)

class Registry {

    conf : Configuration; 
    methods: any

    constructor(configuration : Configuration) {

        this.conf = configuration
        
        this.methods = {
            
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
                
                this.conf.logger.info(`[${fileName}] Locations`);
                
                try {
                    return (await Location.find({ _id: {$in: locationIds} })).map((location: any) => {
                        return {
                            ...location._doc,
                            _id: location.id,
                        }
                    })
                }
                catch (err) {
                    throw err
                }
            },
            
            createUser: async (args: any) => {
                
                this.conf.logger.info(`[${fileName}] Create User`);
                
                try {
                    const user = new User({
                        name: args.userInput.name
                    })
                    const res : any = await user.save()
                    return {name: res.name, _id: res._id.toString()}
                }
                catch (err) {
                    throw err
                }
            },
            
            createDevice: async (args : any) => {
                
                this.conf.logger.info(`[${fileName}] Create Device`);

                try {
                    const device = new Device({
                        tel: args.deviceInput.tel
                    })
                    const res : any = await device.save();
                    const user : any = await User.findById('5c2929c0b676ce274162efa9');
                    user.devices.push(device);
                    await user.save()
                    //fix
                    return {_id: res._id.toString(), tel: res.tel};
                }
                catch (err) {
                    throw err
                }
            },
    
            // NOT FOR PRODUCTION!!!

            createLocation: async (args : any) => {

                this.conf.logger.info(`[${fileName}] Create Location`);
                
                try {
                    const location = new Location({
                        longitude: args.locationInput.longitude,
                        latitude: args.locationInput.latitude
                    })
                    const res : any = await location.save()
                    const device : any = await Device.findById('5c30212bb669670d95f229ce')
                    device.locations.push(location)
                    device.save()
                    return {...res._doc, _id: res.id}
                }
                catch (err) {
                    throw err
                }
            }
        }

    }
        
}

export default Registry;