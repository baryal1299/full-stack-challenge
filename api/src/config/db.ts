import { createConnection } from 'typeorm';
import config from "./ormconfig";
import logger from "../utils/logger";

const initDb = async () => {
    try{
        await createConnection(config);
        logger.info({
            message: 'Database client connected'
        })
    } catch (error) {
        logger.error({
            message: "Error while connecting to database", extra: error
        } )
    }
};

export { initDb };