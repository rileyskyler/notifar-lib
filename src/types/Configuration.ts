import * as Winston from 'winston';

export interface Configuration {
    port?: number;
    mongo?: MongoDb;
    logger?: Winston.Logger;
}

interface MongoDb {
    user: string;
    password: string;
    database: string;
    graphiql: boolean;
}
