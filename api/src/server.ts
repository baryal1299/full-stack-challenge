import App from './app';
import dotenv from 'dotenv';
import { cleanEnv, str, port } from "envalid";
import { initDb } from "./config/db";
import logger from './utils/logger';
import AccountController from './services/accounts/accounts.controller';


dotenv.config();

// Validate environment variables
cleanEnv(process.env, {
    PORT: port(),
    DB_HOST: str(),
    DB_PORT: port(),
    DB_USER: str(),
    DB_PASSWORD: str(),
    DB_NAME: str()
});

// Exit process for uncaught and unhandled exceptions
process.on("uncaughtException", e => {
    logger.error({
        message: `uncaughtException`,
        extra: e
    });
    process.exit(1);
});

process.on("unhandledRejection", e => {
    logger.error({
        message: `unhandledRejection`,
        extra: e
    });
    process.exit(1);
});



async function start(){
    await initDb();
    const app = new App(
        [
            new AccountController(),
        ],
        Number(process.env.PORT)
    );
    app.listen();
}

start();

