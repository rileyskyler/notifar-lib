// const Location = require('../models/Location')
import Location from '../../models/Location'

export const createLocation = async (tel: string, message: string) => {

    const coordinates = message.replace(/\s/g, '').split(',')

    const location = new Location({
        latitude: coordinates[0],
        longitude: coordinates[1]
    })

    await location.save()
}
