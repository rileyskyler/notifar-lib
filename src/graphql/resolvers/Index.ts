import Registry from './Registry'
import { Configuration } from '../../types/Configuration';

export class RootResolver {
    
    conf : Configuration
    methods: any
    
    constructor(configuration : Configuration) {
        this.conf = configuration
        this.methods = {
            ... new Registry(this.conf).methods
        }
    }

}

export default RootResolver