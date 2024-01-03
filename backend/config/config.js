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
};
