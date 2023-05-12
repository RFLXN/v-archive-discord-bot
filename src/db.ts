import { DataSource, ObjectLiteral } from "typeorm";
import { access } from "fs/promises";
import { PROJECT_ROOT, resolve } from "./util/path";
import entities from "./db/entities";

const DB_PATH = resolve(PROJECT_ROOT, "database.sqlite");

let db: DataSource;

const connectDB = async () => {
    console.log("Connecting DB");

    try {
        db = await new DataSource({
            type: "sqlite",
            database: DB_PATH,
            entities
        }).initialize();
    } catch (e) {
        console.error(e);
        process.exit(1);
    }

    console.log("DB Connected.");
};

const closeDB = async () => {
    if (db && db.isInitialized) {
        console.log("Closing DB");
        await db.destroy();
        console.log("DB Closed");
    }
};

const isDbExist = async () => {
    try {
        await access(DB_PATH);
        return true;
    } catch (e) {
        return false;
    }
};

const getRepository = <T extends ObjectLiteral>(entity: { new(): T }) => db.getRepository<T>(entity);

export {
    connectDB, closeDB, getRepository, isDbExist, DB_PATH
};
