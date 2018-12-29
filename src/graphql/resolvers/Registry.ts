import Location from '../../models/Location'
import User from '../../models/User'
import Device from '../../models/Device'

import { GraphqlType } from '../../types/GraphQlSchema'

const registry = {
    
    locations: async () => {
        return Location.find({longitude: 'testLong'})
    },
    
    createUser: async (args: GraphqlType.ICreateUserOnRootMutationArguments) => {
        
        const user = new User({
            name: args.userInput.name
        })
        const res : any = await user.save()
        return {name: res.name, _id: res._id.toString()}
    },
    
    createDevice: async (args: GraphqlType.ICreateDeviceOnRootMutationArguments) => {
    
        const device = new Device({
            tel: args.deviceInput.tel
        })
        const res : any = await device.save()
        return {_id: res._id.toString(), tel: res.tel}
    }
}

export default registry