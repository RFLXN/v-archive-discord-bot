import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const DIRNAME = dirname(fileURLToPath(import.meta.url));

const SRC_ROOT = resolve(DIRNAME, "..");
const PROJECT_ROOT = resolve(SRC_ROOT, "..");

export { SRC_ROOT, PROJECT_ROOT, resolve };
