import logger from '../src/utils/logger';
import fs from 'fs-extra';
import readline from 'readline';
import { initDb } from "../src/config/db";
import { getRepository, getConnection } from "typeorm";
import Account from "../src/services/accounts/account.entity";

const hydrate = async () => {
    const fileStream = fs.createReadStream("./tools/accounts.jsonl", {encoding: "utf-8"});
    const readLine = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity // all instance of CR LF as singe line break
    });

    const accountRepository = getRepository(Account);
    for await (const line of readLine) {
        const lineItem = JSON.parse(line)
        lineItem.tags = lineItem.tags.map((item: string) => {
            return {"name": item}
        });
        logger.info(`Creating account ${lineItem.id}...`)
        const newAccount = accountRepository.create(lineItem);
        await accountRepository.save(newAccount);
    }
};

async function run(){
    try {
        await initDb();
        await hydrate();
        logger.info("Database hydrated successfully.")
        process.exit(0)
    } catch (err) {
        logger.error({
            message: "Database hydration failed.",
            extras: err
        });
    } finally {
        await getConnection().close();
    }
}

run();