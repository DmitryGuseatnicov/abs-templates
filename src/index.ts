#!/usr/bin/env node

import chalk from 'chalk';
import figlet from 'figlet';
import gradient from 'gradient-string';
import { createSpinner } from 'nanospinner';

import path from 'path';
import fs from 'fs';

import {
    COMMAND_DESCRIPTION,
    CURR_DIR,
    DIRECTORY_CONTENT_AVAILABLE_TO_KEEP,
    SupportedCommand,
    SUPPORTED_COMMANDS,
} from './constants';

import { welcome, handleError, askTemplate, askGit } from './utils/cli';

import {
    createProjectFolder,
    createDirectoryContents,
    installDeps,
    checkAppName,
    preparePackageJSON,
    prepareGitIgnore,
} from './utils/fs';
import { initialCommit, initRepoIfNotAlready } from './utils/git';

const main = async () => {
    const command = process.argv[2];

    if (!SUPPORTED_COMMANDS.includes(command as SupportedCommand)) {
        throw new Error(
            `Invalid command. List of supported commands: \n${Object.entries(
                COMMAND_DESCRIPTION,
            )
                .map(
                    ([command, description]) =>
                        `\t- ${command}: ${description}`,
                )
                .join('\n')}`,
        );
    }

    const appNameOrPath = process.argv[3];

    const targetPath = path.join(CURR_DIR, appNameOrPath);

    const appName = fs.existsSync(targetPath)
        ? path.basename(targetPath)
        : appNameOrPath;

    if (!appName) {
        throw new Error(`Application name wasn't provided`);
    }

    if (!checkAppName(appName)) {
        throw new Error(`Application name can only contain words and minuses`);
    }

    if (!createProjectFolder(targetPath)) {
        throw new Error(
            `Folder ${targetPath} already exists.
        Leave only valid files in the directory or use another name.
        List of files and directories available to keep:\n
        ${DIRECTORY_CONTENT_AVAILABLE_TO_KEEP.join('\n\t')}`,
        );
    }

    await welcome();

    console.log(
        `${chalk.cyan(`
        This utility provides React projects templates.
        All necessary configuration files are already set up
        `)}`,
    );

    const template = await askTemplate();

    const gitShouldBeInited = await askGit();

    const repoCreated = gitShouldBeInited && initRepoIfNotAlready(targetPath);

    if (gitShouldBeInited && !repoCreated) {
        console.log(
            chalk.yellow("Git error. Repository initialization can't be done"),
        );
    }

    const templatePath = path.join(__dirname, 'templates', template);

    const filesSpinner = createSpinner(
        `Creating source files for ${template}...`,
    ).start();

    await createDirectoryContents(templatePath, appName);

    await prepareGitIgnore(targetPath, appName);

    await preparePackageJSON(targetPath, appName);

    filesSpinner.success({ text: 'Files successfully created' });

    if (repoCreated && !initialCommit(targetPath)) {
        chalk.yellow('Git error. Commit cant be done');
    }

    const depsSpinner = createSpinner(`Installing dependencies...`).start();

    if (installDeps(targetPath)) {
        depsSpinner.success({ text: 'Dependencies successfully installed' });
    } else {
        depsSpinner.error({ text: 'Installation error' });
        throw new Error('Installation error');
    }

    figlet('Hello ABS unit, Nice to hack', (error, data) =>
        console.log(gradient.cristal.multiline(data)),
    );
};

main().catch(handleError);
