export const SKIP_FILES = [
    'node_modules',
    '.next',
    'build',
    'dist',
    'yarn.lock',
    'package-lock.json',
];

export const CURR_DIR = process.cwd();

export const TEMPLATES_LIST = [
    'vue3-ts-sass',
];

export const DIRECTORY_CONTENT_AVAILABLE_TO_KEEP = [
    '.git',
    'README.md',
    '.DS_Store',
];

export const PACKAGE_JSON = 'package.json';

export const TEMPLATE_PACKAGE_JSON_FILENAME = 'template.json';

export const PACKAGE_JSON_CONTENT_FILENAME =
    process.env.NODE_ENV === 'development'
        ? PACKAGE_JSON
        : TEMPLATE_PACKAGE_JSON_FILENAME;

export const GIT_IGNORE = '.gitignore';

export const TEMPLATE_GIT_IGNORE_FILENAME = '.gitignore-template';

export const GIT_IGNORE_CONTENT_FILENAME =
    process.env.NODE_ENV === 'development'
        ? GIT_IGNORE
        : TEMPLATE_GIT_IGNORE_FILENAME;

export const SUPPORTED_COMMANDS = ['gen'] as const;

export type SupportedCommand = typeof SUPPORTED_COMMANDS[number];

export const COMMAND_DESCRIPTION: Record<SupportedCommand, string> = {
    gen: 'Command for init preconfigured project by template',
};
