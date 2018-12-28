import * as DB from './controllers/DB'

export const rootValue = {
    createUser: (args: any) => {
        console.log(args)
        DB.createUser(args)
    }
}