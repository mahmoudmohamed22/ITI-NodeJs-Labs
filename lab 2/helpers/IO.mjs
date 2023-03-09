import fs from "fs";
import { promisify } from "util";

const readFilePromise = promisify(fs.readFile);

async function readUsersFromFile(filename, cp) {
    return await readFilePromise(filename, "utf-8");
}

function writeUserIntoFile(filename, users) {
    fs.writeFileSync(filename, users);
}

export {readUsersFromFile,writeUserIntoFile};