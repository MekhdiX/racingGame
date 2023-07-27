# Casablanca Racing 🏁

> Race style game

## Установка и запуск

To work, use the following commands:

- `npm start` — run the developer version
- `npm lint` — linter error checking
- `npm lint-fix` — fix linter and prettier bugs
- `npm test` - test run
- `npm run build` - project build

## Game

### Description

The game is an obstacle race. The goal of the game is to complete as many levels as you can by driving a car 🚙 using the arrows on your keyboard and avoiding oncoming cars 🚗. With each new level, the speed of the car increases.

### Control

Movement up/right/left/down - using the keyboard arrows, pause using the `Esc`.

## Project

The following technologies (libraries) were used in the project:

- React
- Redux
- TypeScript
- Canvas
- PostCSS
- Webpack
- Docker
- ESLint
- Prettier
- Jest
- Service Worker
- Fullscreen API

## How to deploy

1. Create .env file as in .env.example
2. Be sure to register MAIN_HOST (you can localhost)
3. For local development (will follow changes and update):
   `- docker-compose -f docker-compose.dev.yml up`
   For production:
   `- docker-compose -f docker-compose.yml up`
