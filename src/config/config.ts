import Joi from 'joi';
import path from 'path';
import dotenv from 'dotenv';

const nodeEnv = process.env.NODE_ENV || 'development';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
    .keys({
        PORT: Joi.number().default(5000),
        PORT_TESTING: Joi.number().default(5001),

        JWT_SECRET: Joi.string().required().description('JWT secret key'),
        JWT_ACCESS_EXPIRATION: Joi.string().default('1d').description('jwt expiration'),

        CORS_WHITELIST: Joi.string().default('*')
    })
    .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env, { stripUnknown: true });

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

type EnvConfig = {
  env: string,
  corsWhitelist: string,
  port: {
    normal: string,
    test: string,
  },
  jwt: {
    secret: string,
    accessExpiration: string,
  }
}

const config: EnvConfig = {
    env: nodeEnv,
    corsWhitelist: envVars?.CORS_WHITELIST,
    port: {
        normal: envVars?.PORT,
        test: envVars?.PORT_TESTING,
    },
    jwt: {
        secret: envVars?.JWT_SECRET,
        accessExpiration: envVars?.JWT_ACCESS_EXPIRATION,
    }
}

export default config;