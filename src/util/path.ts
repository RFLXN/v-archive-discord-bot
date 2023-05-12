import { resolve } from "path";

const CURRENT_PATH = __dirname;

const SRC_ROOT = resolve(CURRENT_PATH, "..");
const PROJECT_ROOT = resolve(SRC_ROOT, "..");

export { SRC_ROOT, PROJECT_ROOT, resolve };
