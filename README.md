# sahaj-CLI

Easily setup React or React Native project workspace with `eslint`, `prettier`, `lint-staged` and `husky`. It will created a eslint configuration with recommended settings. `lint-staged` and `husky` will prevent `git commit` unless codebase is formatted with `prettier` and all linting errors are fixed.

> To bypass the pre-commit hook run `run git commit --no-verify`

## Usage

- create a project with `create-react-app` or `react-native-cli`.
- cd into the project directory.
- run the below command

```
npx sahaj-cli
```

It will ask two questions.

1. Which folder contains all source codes? This folder should not contain node_modules folder.

The answer is usually `src`. If you are putting all your code in different folder then name the folder here.

> **NOTE: This folder should not contain the node_modules folder.**

2. Which packager do you want to use?

Answer `yarn` or `npm` as the choice of your package manager.
