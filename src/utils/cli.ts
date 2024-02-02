import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
import inquirer from 'inquirer';

import { TEMPLATES_LIST } from '@/constants';

export const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

export const handleError = (error: Error) =>
    console.log(`
${chalk.red(`ERROR!: ${error.message}`)}
`);

export const welcome = async () => {
    const title = chalkAnimation.neon(`
    🛞 🏎️ 🛞 🏎️ 🛞 🏎️ 🛞 🏎️ 🛞 🏎️ 🛞 🏎️ 🛞 🏎️ 🛞 🏎️
    
    ABS TEMPLATES
    
    🏎️ 🛞 🏎️ 🛞 🏎️ 🛞 🏎️ 🛞 🏎️ 🛞 🏎️ 🛞 🏎️ 🛞 🏎️ 🛞
    `);

    await sleep(2000);

    title.stop();
};

export const askTemplate = async (): Promise<string> => {
    const { template } = await inquirer.prompt({
        name: 'template',
        type: 'list',
        message: 'What application do you want to create?',
        choices: TEMPLATES_LIST,
    });

    return template;
};

export const askGit = async () => {
    const { git } = await inquirer.prompt({
        name: 'git',
        type: 'list',
        message: 'Do you want to create a git repo in this folder?',
        choices: ['yes', 'no'],
        default: 'yes',
    });

    return git === 'yes';
};
