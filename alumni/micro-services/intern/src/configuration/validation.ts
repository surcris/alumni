// import * as Joi from 'joi';

// export const validationSchema = Joi.object({
//   NODE_ENV: Joi.string()
//     .valid('development', 'production', 'test', 'provision')
//     .default('development'),
//   TYPE: Joi.any().required(),
//   PORT: Joi.number().port().default(3306),
//   HOST: Joi.string().hostname().required(),
//   USERDB: Joi.string().required(),
//   PWDDB: Joi.string()
//     .min(4)
//     // .regex(/[A-Z]/, 'upper-case')
//     // .regex(/[a-z]/, 'lower-case')
//     // .regex(/[^\w]/, 'special character')
//     // .regex(/[0-9]/, 'number')
//     .required(),
//   DB: Joi.string().required()
// });
