import * as Joi from 'joi';

export default Joi.object({
  DEBUG: Joi.boolean(),
  CUSTOMER_REFRESH_COOKIE_PATH: Joi.string().required(),
  SNAPTAG_REFRESH_COOKIE_PATH: Joi.string().required(),
  PROGRAM_REFRESH_COOKIE_PATH: Joi.string().required(),
  REFRESH_COOKIE_DOMAIN: Joi.string().required(),
  REFRESH_COOKIE_MAX_AGE: Joi.number().required(),
  REFRESH_COOKIE_SECURE: Joi.boolean().required(),
  DATABASE_URL: Joi.string().required(),
  TEAM_JWT_SECRET: Joi.string().required(),
  TEAM_JWT_REFRESH_SECRET: Joi.string().required(),
  SNAPTAG_JWT_SECRET: Joi.string().required(),
  SNAPTAG_JWT_REFRESH_SECRET: Joi.string().required(),
  CUSTOMER_JWT_SECRET: Joi.string().required(),
  CUSTOMER_JWT_REFRESH_SECRET: Joi.string().required(),
  PROGRAM_JWT_SECRET: Joi.string().required(),
  PROGRAM_JWT_REFRESH_SECRET: Joi.string().required(),
  JWT_ACCESS_TOKEN_EXPIRESIN: Joi.string().required(),
  JWT_REFRESH_TOKEN_EXPIRESIN: Joi.string().required(),
  LABCODE_WORKDER_URL: Joi.string().required(),
  AWS_S3_BUCKET_NAME: Joi.string().required(),
  AWS_ACCESS_KEY_ID: Joi.string().required(),
  AWS_SECRET_ACCESS_KEY: Joi.string().required(),
  AWS_REGION: Joi.string().required(),
  AWS_S3_URL: Joi.string().required(),
  SENTRY_DSN: Joi.string().required(),
  SLACK_WEBHOOK: Joi.string().optional(),
});
