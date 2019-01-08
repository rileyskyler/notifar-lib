import Location from '../../models/Location'
import * as bcrypt from 'bcryptjs'

import * as Misc from '../../types/Misc'
import Device from '../../models/Device';

export const create = async (from: string, body: string) => {

    this.conf.logger.info(`[Location] Create Location`);

    try {

        const ping: Misc.Ping = JSON.parse(body)
        
        if(ping.key && ping.latitude && ping.longitude) {

            const device : any = await Device.findOne({tel: from})

            if(device && device.key === ping.key) {

                const location = new Location({
                    latitude: ping.latitude,
                    longitude: ping.longitude,
                    device
                })

                await location.save()
            }


        }
        
    }
    catch (err) {
        throw err
    }


}
