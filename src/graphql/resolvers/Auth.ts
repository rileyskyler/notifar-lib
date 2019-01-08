import Location from '../../models/Location'
import User from '../../models/User'
import Device from '../../models/Device'

import * as bcrypt from 'bcryptjs'

import * as jwt from 'jsonwebtoken'

import { Configuration } from '../../types/Configuration' 

import * as GraphQlSchema from '../../types/GraphQlSchema';

import * as Misc from '../../types/Misc'

require('dotenv').load();

class Auth {

    conf : Configuration; 
    methods: any

    constructor(configuration : Configuration) {


        this.conf = configuration
        
        this.methods = {

            login: async (args: GraphQlSchema.Login) => {
       
                try {
                    
                    const userToLogin : any = await User.findOne({email: args.loginInput.email})
                    
                    if(!userToLogin) {
                        throw new Error('User not found!')
                    }
                    else {
                        this.conf.logger.info(`[Auth] User found`)
                        
                        const authenticated = await bcrypt.compare(args.loginInput.password, userToLogin.password)
                        if(!authenticated) {
                            throw new Error('Password is incorrect!')
                        }
                        else {
                            this.conf.logger.info(`[Auth] Login successful`);

                            const token = jwt.sign({userId: userToLogin.id, email: userToLogin.email}, process.env.AUTH_KEY, {
                                expiresIn: '1h'
                            })

                            return { userId: userToLogin.id, token, tokenExpiration: 1}
                        }
                    }
                }
                catch (err) {
                    throw err
                }
            },
                 
            createUser: async (args: GraphQlSchema.CreateUser) => {
                
                this.conf.logger.info(`[Auth] Create User`);
                
                try {

                    const userToCreate = await User.findOne({email: args.userInput.email})

                    if(userToCreate) {
                        throw new Error('User already exists!')
                    }
                    else {
                        
                        const hashedPassword = await bcrypt.hash(args.userInput.password, 12)
    
                        const user = new User({
                            name: args.userInput.name,
                            email: args.userInput.email,
                            password: hashedPassword
                        })
    
                        const res : any = await user.save()
    
                        return {...res._doc, _id: res.id, password: ''}
                    }
                }
                catch (err) {
                    throw err
                }
            },
            
            createDevice: async (args : GraphQlSchema.CreateDevice, req: any) => {

                this.conf.logger.info(`[Registry] Create Device`);
                
                if(!req.authorized) {
                    throw new Error('Unauthorized!')
                }

                try {

                    const deviceKey: Misc.DeviceKey = {
                        tel: args.deviceInput.tel,
                        key: process.env.AUTH_KEY
                    }

                    const device = new Device({
                        tel: args.deviceInput.tel,
                        key: await bcrypt.hash(JSON.stringify(deviceKey), 12),
                    })

                    const res : any = await device.save();
                    
                    const user : any = await User.findById(req.userId); 
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

export default Auth;