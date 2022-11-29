import * as Joi from 'joi';

const REQUIRED = 'All fields must be filled';

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': REQUIRED,
    'string.email': 'Incorrect email or password',
    'any.required': REQUIRED,
  }),
  password: Joi.string().required().messages({
    'string.empty': REQUIRED,
    'any.required': REQUIRED,
  }),
});

export const matchSchema = Joi.object({
  homeTeam: Joi.number().required(),
  awayTeam: Joi.number().required(),
  homeTeamGoals: Joi.number().required(),
  awayTeamGoals: Joi.number().required(),
});

export default loginSchema;
