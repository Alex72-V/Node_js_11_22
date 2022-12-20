import readline from "readline";
import fps from 'fs/promises';
import colors from 'colors';
import inquirer from "inquirer";
import path, { dirname } from "path";
//import choices from "inquirer/lib/objects/choices";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const root = process.cwd();

const findFiles = (dirName) => {
    return fps
    .readdir(dirName)
    .then((choices) => {
        return inquirer.prompt([
            {
                name: 'fileName',
                type: 'list',
                message: 'Select file',
                choices,
            },
            {
                name: 'findString',
                type: 'input',
                message: 'Enter for search',
            },
        ]);
    })
    .then(async ({ fileName, findString }) => {
        const fullPath = path.join(dirName, fileName);
        const stat = await fps.stat(fullPath);
        if (!stat.isFile()) {
            return findFiles(fullPath);
        }
        return Promise.all([
            fps.readFile(path.join(dirName, fileName), 'utf-8'),
            Promise.resolve(findString),
        ]);
    })
    .then((result) => {
        if (result) {
            const [text, findString] = result;
            const pattern = new RegExp(findString, 'g');
            let count = 0;
            const out = text.replace(pattern, () => {
                count++;
                return colors.red(findString);
            });


            console.log(out, '\n', colors.green(`Found ${count} values`));
        }
    });
};

rl.question(
    `You are in ${root} \n Enter the path to directory: `,
    (dirPath) => {
        const dirName = path.join(root, dirPath);
        findFiles(dirName);
    }
);

rl.on('close', () => process.exit(0));