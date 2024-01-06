const path = require("path");
const dotenv = require("dotenv");
const Joi = require("joi");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = Joi.object()
  .keys({
    PORT: Joi.string().default(3000),
    NODE_ENV: Joi.string()
      .valid("development", "production", "test")
      .required(),
    MONGODB_URL: Joi.string().required().description("MongoDB connection URL"),
    JWT_SECRET: Joi.string().required(),
    JWT_EXPIRESIN: Joi.string()
      .default("1d")
      .description("Days after which the Token Expires"),
    COOKIE_EXPIRESIN: Joi.number().required().default(1),
    SMPT_SERVICE: Joi.string().default("gmail"),
    SMPT_EMAIL: Joi.string().description(
      "Email address from which a mail would be sent"
    ),
    SMPT_PASSWORD: Joi.string().description("Password to the above SMPT_EMAIL"),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Configuration validation Error: ${error.message}`);
}

module.exports = {
  port: envVars.PORT,
  env: envVars.NODE_ENV,
  mongoose: {
    url: envVars.MONGODB_URL,
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    expiresIn: envVars.JWT_EXPIRESIN,
  },
  cookieExpiresIn: envVars.COOKIE_EXPIRESIN,
  smpt: {
    mailService: envVars.SMPT_SERVICE,
    mailId: envVars.SMPT_EMAIL,
    mailPassword: envVars.SMPT_PASSWORD,
  },
};
