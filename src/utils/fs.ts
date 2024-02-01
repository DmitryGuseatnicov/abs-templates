import shell from 'shelljs';

import path from 'path';
import fs from 'fs';

import {
    CURR_DIR,
    SKIP_FILES,
    PACKAGE_JSON_CONTENT_FILENAME,
    TEMPLATE_PACKAGE_JSON_FILENAME,
    PACKAGE_JSON,
    DIRECTORY_CONTENT_AVAILABLE_TO_KEEP,
    GIT_IGNORE_CONTENT_FILENAME,
    GIT_IGNORE,
    TEMPLATE_GIT_IGNORE_FILENAME,
} from '@/constants';

export const createProjectFolder = (projectPath: string) => {
    if (fs.existsSync(projectPath)) {
        return !fs
            .readdirSync(projectPath)
            .some(
                (content) =>
                    !DIRECTORY_CONTENT_AVAILABLE_TO_KEEP.includes(content),
            );
    }

    fs.mkdirSync(projectPath);

    return true;
};

export const createDirectoryContents = (
    templatePath: string,
    projectName: string,
) =>
    new Promise((resolve) => {
        const filesToCreate = fs.readdirSync(templatePath);
        filesToCreate.forEach((file) => {
            const origFilePath = path.join(templatePath, file);

            const stats = fs.statSync(origFilePath);

            if (SKIP_FILES.indexOf(file) > -1) return;

            if (stats.isFile()) {
                const contents = fs.readFileSync(origFilePath, 'utf8');
                const writePath = path.join(CURR_DIR, projectName, file);
                fs.writeFileSync(writePath, contents, 'utf8');
            } else if (stats.isDirectory()) {
                fs.mkdirSync(path.join(CURR_DIR, projectName, file));
                createDirectoryContents(
                    path.join(templatePath, file),
                    path.join(projectName, file),
                );
            }
        });

        resolve(true);
    });

export const installDeps = (targetPath: string) => {
    const isUsingYarn = () =>
        (process.env.npm_config_user_agent || '').indexOf('yarn') === 0;

    const isNode = fs.existsSync(path.join(targetPath, PACKAGE_JSON));
    const packageManager = isUsingYarn() ? 'yarn' : 'npm';

    if (isNode) {
        shell.cd(targetPath);
        const result = shell.exec(`${packageManager} install`);
        return result.code === 0;
    }

    return false;
};

export const preparePackageJSON = (targetPath: string, projectName: string) =>
    new Promise<string>((resolve, reject) =>
        fs.readFile(
            path.resolve(targetPath, PACKAGE_JSON_CONTENT_FILENAME),
            { encoding: 'utf-8' },
            (error, oldFile) => {
                if (error) {
                    reject(error.message);
                }

                resolve(
                    JSON.stringify(
                        Object.assign(JSON.parse(oldFile), {
                            name: projectName,
                            version: '0.1.0',
                            private: true,
                        }),
                        null,
                        4,
                    ),
                );
            },
        ),
    )
        .then((data) =>
            fs.writeFileSync(path.resolve(targetPath, PACKAGE_JSON), data, {
                encoding: 'utf-8',
            }),
        )
        .then(() => {
            const packageJsonTemplatePath = path.resolve(
                targetPath,
                TEMPLATE_PACKAGE_JSON_FILENAME,
            );
            if (fs.existsSync(packageJsonTemplatePath)) {
                fs.unlinkSync(packageJsonTemplatePath);
            }
        });

export const prepareGitIgnore = (targetPath: string, projectName: string) =>
    new Promise<string>((resolve, reject) =>
        fs.readFile(
            path.resolve(targetPath, GIT_IGNORE_CONTENT_FILENAME),
            { encoding: 'utf-8' },
            (error, oldFile) => {
                if (error) {
                    reject(error.message);
                }

                resolve(oldFile);
            },
        ),
    )
        .then((data) =>
            fs.writeFileSync(path.resolve(targetPath, GIT_IGNORE), data, {
                encoding: 'utf-8',
            }),
        )
        .then(() => {
            const gitignoreTemplatePath = path.resolve(
                targetPath,
                TEMPLATE_GIT_IGNORE_FILENAME,
            );
            if (fs.existsSync(gitignoreTemplatePath)) {
                fs.unlinkSync(gitignoreTemplatePath);
            }
        });

const APP_NAME_REGEX = /[^a-z-]+/gi;

export const checkAppName = (appName: string) =>
    !appName.trim().match(APP_NAME_REGEX);
