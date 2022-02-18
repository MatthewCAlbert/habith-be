# Habit App Backend

Monolithic Backend for Rapid Development Only

## Built Using

- Express
- Typescript
- TypeORM
- JWT
- Joi
- Winston 🐒
- Jest 🤡
- CockcroachDB ➡ pgSQL 🐘

## TODO

- [x] Main function finish
- [ ] Add Refresh Token
- [ ] Working Swagger Autogenerate
- [x] Fix CI test
- [ ] Add Continuous Deployment to Server
- [ ] Refactor Code + Standardization

## Development

### Requirements

- Node v14+
- Yarn

### Getting Started

- Pull this repo
- Setup `.env` (please refer to `.env.example`)
- Add CockroachDB Root CA into `./root.crt`
- Run `yarn migration:run:win` (for Windows) or `yarn migration:run` (for Linux) // if haven't migrate yet
- Run `yarn dev` to start developing

### E2E Testing (using Jest)

- Edit your test files at `src/tests/**/*.test.ts`
- Run `yarn test` for development (will test src/ts)
- Run `yarn test:build` for post-build (will test dist/js)

## Deployment

### Docker

- Don't forget to setup any required environment for CockroachDB
- You can use Dockerfile and docker-compose here
- Run `docker-compose -f ./docker-compose.prod.yml up -d` to start using default config
- Setup a reverse proxy for default port 5000

### Anything else

- Don't forget to setup any required environment for CockroachDB
- Run `yarn build` to get distributon js files
- Run `yarn start` to start dist server

## Additionals

- You can convert this project to fastify by following this guide https://www.fastify.io/docs/latest/Reference/Middleware/
