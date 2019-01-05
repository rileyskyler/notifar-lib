import Location from '../../models/Location'

export const create = async (from: string, message: string) => {

    this.conf.logger.info(`[Location] Create Location`);

    const coordinates = message.replace(/\s/g, '').split(',')

    const location = new Location({
        latitude: coordinates[0],
        longitude: coordinates[1]
    })

    await location.save()
}
