import fs from 'fs';
import path from 'path';
import shell from 'shelljs';

export const initRepoIfNotAlready = (targetPath: string) => {
    if (fs.existsSync(path.resolve(targetPath, '.git'))) {
        return true;
    }

    const result = shell.exec(`git init ${targetPath}`);

    return result.code === 0;
};

export const initialCommit = (targetPath: string) => {
    shell.cd(targetPath);
    const addResult = shell.exec(`git add ${targetPath}`);
    const commitResult = shell.exec('git commit -m "initial"');

    return addResult.code === 0 && commitResult.code === 0;
};
