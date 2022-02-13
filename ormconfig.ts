const fs = require('fs');
const dotenv = require('dotenv');
const parse = require('pg-connection-string').parse;

dotenv.config({ path: '.env' });

const env = process.env.NODE_ENV || 'development';
const connString = process.env.PG_CONN_STRING;
const envRootCA = process.env.PG_ROOT_CA;
const ca = envRootCA || fs.readFileSync('root.crt').toString();
const dbConfig = parse(connString);
const dbName = dbConfig.database || process.env.PG_DBNAME || 'habith';

const cliConfig = {
  entitiesDir: "src/data/entities",
  migrationsDir: "src/data/migrations",
  subscribersDir: "src/data/subscribers",
};

const defaultConfig = {
  type: "postgres",
  host: dbConfig.host || process.env.PG_HOST,
  port: parseInt(dbConfig.port) || process.env.PG_PORT,
  username: dbConfig.user || process.env.PG_USERNAME,
  password: dbConfig.password || process.env.PG_PASSWORD,
  database: process.env.COCKROACH_CLUSTER_NAME + '.' + dbName,
  ssl: true,
  ca,
  logging: true,
};

const devLocation = {
  entities: ["src/data/entities/**/*.ts"],
  subscribers: ["src/data/subscribers/**/*.ts"],
  migrations: ["src/data/migrations/**/*.ts"],
};

const distLocation = {
  entities: ["dist/data/entities/**/*.js"],
  subscribers: ["dist/data/subscribers/**/*.js"],
  migrations: ["dist/data/migrations/**/*.js"],
};

const ormConfig: Record<string, any> = {
  production: {
    ...defaultConfig,
    ...distLocation,
    cli: cliConfig,
    name: "production",
  },
  posttesting: {
    ...defaultConfig,
    ...distLocation,
    cli: cliConfig,
    name: "posttesting",
  },
  testing: {
    ...defaultConfig,
    ...devLocation,
    cli: cliConfig,
    name: "testing",
  },
  development: {
    ...defaultConfig,
    ...devLocation,
    cli: cliConfig,
    name: "development",
  },
};

const exportedConfig = {
  ...(ormConfig?.[env] || ormConfig.development),
  name: "default",
};


module.exports = exportedConfig;
