# fish-buget

A simple budgeting app

# Project Setup

I would recomend installing [nvm](https://github.com/nvm-sh/nvm) ([For Windows](https://github.com/coreybutler/nvm-windows)). This is a suggestion in the below requiremnts, however I want to emphesize it's usefulness.

## Requirements

Follow the [React Native Setup Guide](https://reactnative.dev/docs/0.82/set-up-your-environment)

Follow the [Supabase Local CLI Setup Guide](https://supabase.com/docs/guides/local-development/cli/getting-started?queryGroups=platform&platform=windows)

## Post-Requirements

Clone the repository & install dependencies:
```
git clone https://github.com/Harrison-Blair/fish-budget.git

cd ./fish-budget

npm i
```

Run the project with turbo:
`npm turbo dev`

To run only a segment of the project:
```
npm turbo mobile#dev

npm turbo web#dev
```
