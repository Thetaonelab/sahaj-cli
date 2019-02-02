#!/usr/bin/env node

/* eslint-disable no-console */
/**
 * NOTE:
 * disabling no-console rule
 * because we do want to console.log some outputs
 */
const shell = require('shelljs');
const fs = require('fs');
const chalk = require('chalk');
const inquirer = require('inquirer');
const { esLintConfig } = require('./eslintConfig');
const { prettyOptions } = require('./prettierConfig');

// show a initial message
const init = () =>
  console.log(chalk.bold.green(`Running sahaj on ${process.cwd()} directory.`));

// check if package.json file exists otherwise exit
const checkPageJSON = () => {
  const cOut = shell.ls('package.json');
  if (cOut.code !== 0) {
    console.log(chalk.bold.red("FATAL: Couldn't find package.json file!!"));
    shell.exit(1);
  }
  return true;
};

// ask questions
const askQuestions = () => {
  const questions = [
    {
      name: 'sourceFolder',
      type: 'input',
      default: 'src',
      message:
        'Which folder contains all source codes? This folder should not contain node_modules folder:'
    },
    {
      name: 'packager',
      type: 'list',
      choices: ['yarn', 'npm'],
      default: 'yarn',
      message: 'Which packager do you want to use?'
    }
  ];

  return inquirer.prompt(questions);
};

// generate install dependecy command
const installPackages = packager => {
  // list of packages to install as dev dependency
  const packages = [
    'eslint',
    'babel-eslint',
    'eslint-config-airbnb',
    'eslint-plugin-import',
    'eslint-plugin-jsx-a11y',
    'eslint-plugin-react',
    'husky',
    'lint-staged',
    'prettier'
  ];

  const list = packages.join(' ');
  const command =
    packager === 'yarn'
      ? `yarn add --dev ${list}`
      : `npm install --save-dev ${list}`;

  // execute the install command
  shell.exec(command);
};

// prettify a file
const prettify = fileName => {
  const command = `./node_modules/.bin/prettier --print-width 80 --single-quote --write ${fileName}`;
  shell.exec(command);
};

// generate .eslintrc.json
const createESLintConfig = () => {
  const fileName = '.eslintrc.json';
  const json = JSON.stringify(esLintConfig);
  fs.writeFileSync(fileName, json, 'utf8');
  prettify(fileName);
};

// generate .prettierrc
const createPrettierrc = () => {
  const fileName = '.prettierrc';
  const json = JSON.stringify(prettyOptions);
  fs.writeFileSync(fileName, json, 'utf8');
  prettify(fileName);
};

// modify package.json content
const modifyPackageJson = sourceFolder => {
  /**
   * NOTE: sourceFolder is taken dynamically here
   * because not all projects have "src" folder as the
   * source code container. Some projects may have "js"
   * this is really upto the developer.
   * folder as the container folder.
   */

  const fileName = 'package.json';
  const lintCmd = `eslint '${sourceFolder}/**/*.js'`;
  const formatCmd = `prettier --single-quote --jsx-bracket-same-line --write '${sourceFolder}/**/*.{css,js}'`;
  const lintStaged = {
    '*.js': [
      'prettier --single-quote --jsx-bracket-same-line --write',
      'eslint',
      'git add'
    ]
  };

  const husky = {
    hooks: {
      'pre-commit': 'lint-staged'
    }
  };

  // read package.json content
  const content = fs.readFileSync(fileName);
  // parse JSON content
  const json = JSON.parse(content);
  // make all modifications
  json.scripts.lint = lintCmd;
  json.scripts.format = formatCmd;
  json['lint-staged'] = lintStaged;
  json.husky = husky;
  fs.writeFileSync(fileName, JSON.stringify(json), 'utf8');
  prettify(fileName);
};

// run function for this script
const run = async () => {
  // show init message
  init();
  // check package.json file
  checkPageJSON();
  // ask questions
  const answers = await askQuestions();
  const { sourceFolder, packager } = answers;

  // exit if choice of packager is yarn and yarn is not installed
  if (packager === 'yarn' && !shell.which('yarn')) {
    console.log(chalk.bold.red("FATAL: Couldn't find yarn"));
    shell.exit(1);
  }

  // install dev dependencies
  installPackages(packager);
  // create eslintrc.json file
  createESLintConfig();
  // create .prettierrc
  createPrettierrc();
  // modify package.json file
  modifyPackageJson(sourceFolder);

  // success message
  console.log(chalk.bold.green('Successfully updated!!'));
};

// execute this script
run();
