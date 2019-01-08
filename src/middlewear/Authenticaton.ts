import * as jwt from 'jsonwebtoken'

export const verify = (req: any, res: any, next: any) => {
    const resp = req.get('Authorization')

    return next()
}