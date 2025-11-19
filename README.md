# fish-buget

A simple budgeting app.

# Project Setup

I would recomend installing [nvm](https://github.com/nvm-sh/nvm) ([For Windows](https://github.com/coreybutler/nvm-windows)). This is a suggestion in the below requiremnts, however I want to emphesize it's usefulness.

## Requirements

Follow the [React Native Setup Guide](https://reactnative.dev/docs/0.82/set-up-your-environment)

Follow the [Supabase Local CLI Setup Guide](https://supabase.com/docs/guides/local-development/cli/getting-started?queryGroups=platform&platform=windows)

## Setup

Clone the repository & install dependencies:
```
git clone https://github.com/Harrison-Blair/fish-budget.git

cd ./fish-budget

npm i
```

## Run

Run the project with turbo:
`npm turbo dev`

To run only a segment of the project:
```
npm turbo mobile#dev

npm turbo web#dev
```

# Quick Help

> [!IMPORTANT]
> Read all terminal output first before coming here. Odds are your problem is well documented, however I have compiled a list of problems I have run into during the development of this app. Prodomiantly contains things I would forget when changing dev machines.

## Mobile

If `web` is working but `mobile` crashes almost immediately, you may need to set your `Android Sdk` path inside of `\fish-budget\apps\mobile\android\local.properties` by adding the following to that file (or creating one if there isn't one):

```
sdk.dir="PATH/TO/ANDROID/SDK"
```

On **Linux** this is most likely something like: `/home/$USER/Android/Sdk`

On **Windows** this is most likely something like: `C:\Users\$USER\AppData\Local\Android\Sdk`

# Contact
Head to my website @ [harrison-blair.dev](https://www.harrison-blair.dev) for my information
