const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.string().default(3000),
    TIMEZONE: Joi.string().required().default('Asia/Jakarta'),
    PG_URL: Joi.string().required(),

    // Mailer configs
    MAILER_SERVICE: Joi.string().required(),
    MAILER_HOST: Joi.string().optional().default('HOST'),
    MAILER_PORT: Joi.number().integer().optional().default(1),
    MAILER_USER: Joi.string().lowercase().email().required(),
    MAILER_PASS: Joi.string().min(5).required(),
    MAILER_RECIPIENT: Joi.string().lowercase().email().required(),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  timeZone: envVars.TIMEZONE,
  pg_url: envVars.PG_ULR,
  mailer: {
    service: envVars.MAILER_SERVICE,
    host: envVars.MAILER_HOST,
    port: envVars.MAILER_PORT,
    user: envVars.MAILER_USER,
    pass: envVars.MAILER_PASS,
    recipient: envVars.MAILER_RECIPIENT,
  },
};
