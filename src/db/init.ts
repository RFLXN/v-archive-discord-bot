import sqlite3 from "sqlite3";
import { readdir, readFile } from "fs/promises";
import { DB_PATH } from "../db";
import { PROJECT_ROOT, resolve as resolvePath } from "../util/path";

const sqlite = sqlite3.verbose();
type Database = sqlite3.Database;

const SQL_PATH = resolvePath(PROJECT_ROOT, "sql");

const loadSQLs = async () => {
    console.log("Loading SQL files");

    const fileNames = (await readdir(SQL_PATH)).filter((n) => n.endsWith(".sql"));

    const sql: string[] = [];
    for (const fileName of fileNames) {
        const raw = await readFile(resolvePath(SQL_PATH, fileName));
        console.log(`SQL loaded: ${fileName}`);
        sql.push(raw.toString("utf8"));
    }

    console.log("SQL files loaded.");
    return sql;
};

const connectDB = async () => new Promise<Database>((resolve, reject) => {
    const db = new sqlite.Database(DB_PATH, (err) => {
        if (err) {
            reject(err);
            return;
        }
        resolve(db);
    });
});

const closeDB = async (db: Database) => new Promise((resolve, reject) => {
    db.close((err) => {
        if (err) {
            reject(err);
            return;
        }
        resolve(null);
    });
});

const initDB = async () => {
    console.log("Initializing DB");
    const db = await connectDB();
    const run = async (sql: string): Promise<Database> => new Promise((resolve, reject) => {
        db.run(sql, (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(db);
        });
    });
    const begin = () => run("BEGIN TRANSACTION");
    const commit = () => run("COMMIT");

    const sqlList = await loadSQLs();

    console.log("Running DB init SQLs");

    db.serialize(async () => {
        await run("PRAGMA foreign_keys = 1;");

        for (const sql of sqlList) {
            await begin();
            await run(sql);
            await commit();
        }

        await closeDB(db);
    });

    console.log("DB initialized");
};

export { initDB };
