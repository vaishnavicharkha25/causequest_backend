// import { Sequelize } from 'sequelize';
// import database from './database';
// import { applicationModeConstants } from '../../constants/applicationModeConstants';

// const env = process.env.NODE_ENV ? process.env.NODE_ENV : applicationModeConstants.DEVELOPMENT;
// const dbPort = process?.env?.DATABASE_PORT ? +process.env.DATABASE_PORT : 3306;

// export default new Sequelize({
//     ...database[env as keyof typeof database],
//     port: dbPort,
//     dialect: 'postgres',
//     logging: false,

//     pool: {
//         max: 50,
//         min: 5,
//         acquire: 30000,
//         idle: 30000
//     }
// });

// supabase code

// import dotenv from 'dotenv';
// dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

// import { Sequelize } from 'sequelize';

// const databaseUrl = process.env.DATABASE_URL;

// if (!databaseUrl) {
//     throw new Error('DATABASE_URL is not defined in environment variables');
// }

// export default new Sequelize(databaseUrl, {
//     dialect: 'postgres',
//     protocol: 'postgres',
//     logging: false,
//     pool: {
//         max: 50,
//         min: 5,
//         acquire: 30000,
//         idle: 30000
//     }
// });

import dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });
 
import { Sequelize } from 'sequelize';
 
const databaseUrl = process.env.DATABASE_URL;
 
if (!databaseUrl) {
    throw new Error('DATABASE_URL is not defined in environment variables');
}
 
export default new Sequelize(databaseUrl, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false,
    pool: {
        max: 50,
        min: 5,
        acquire: 30000,
        idle: 30000
    }
});
 