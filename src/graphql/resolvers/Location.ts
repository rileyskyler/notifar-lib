import Location from '../../models/Location'
import Message from '../../types/Message'

const fileName = require('../../helpers/File').getFileName(__filename, __dirname)

export const create = async (from: string, message: string) => {

    this.conf.logger.info(`[${fileName}] Create Location`);

    const coordinates = message.replace(/\s/g, '').split(',')

    const location = new Location({
        latitude: coordinates[0],
        longitude: coordinates[1]
    })

    await location.save()
}
