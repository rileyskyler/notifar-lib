import Registry from './Registry'
import Auth from './Auth'

import { Configuration } from '../../types/Configuration';

export class RootResolver {
    
    conf : Configuration
    methods: any
    
    constructor(configuration : Configuration) {
        this.conf = configuration
        this.methods = {
            ... new Registry(this.conf).methods,
            ... new Auth(this.conf).methods
        }
    }

}

export default RootResolver