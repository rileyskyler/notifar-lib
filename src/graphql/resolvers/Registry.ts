import Location from '../../models/Location'
import User from '../../models/User'
import Device from '../../models/Device'

import { Configuration } from '../../types/Configuration' 

const fileName = require('../../helpers/File').getFileName(__filename, __dirname)

class Registry {

    conf : Configuration; 
    methods: any

    constructor(configuration : Configuration) {

        this.conf = configuration
        
        this.methods = {

            locations: async ()  => {
                
                this.conf.logger.info(`[${fileName}] Get locations`);
        
                return Location.find({longitude: 'testLong'})
            },

            user: async (userId : string) => {
                try {
                    return User.findById(userId);
                } catch (err) {
                    throw err;
                }
            },
            
            createUser: async (args: any) => {
                
                this.conf.logger.info(`[${fileName}] Create User`);
                
                const user = new User({
                    name: args.userInput.name
                })
                
                const res : any = await user.save()
                
                return {name: res.name, _id: res._id.toString()}
            },
            
            createDevice: async (args: any) => {
                
                this.conf.logger.info(`[${fileName}] Create Device`);
                
                const device = new Device({
                    tel: args.deviceInput.tel
                })
                const res : any = await device.save();
                const user : any = await User.findById('5c2867bc701eb61942924b7b');
                user.devices.push(device);
                user.save()
                return {_id: res._id.toString(), tel: res.tel};
            }
        }

    }
        
}

export default Registry;