import Joi from 'joi';

const userSchema = (data: object) => {
  const schema = Joi.object({
    username: Joi.string().min(5).max(30).required(),
    password: Joi.string().min(8).required()
  });

  const { error, value } = schema.validate(data);
  if (error) throw new Error(error.message);
  return value;
};

const transactionSchema = (data: object) => {
  const schema = Joi.object({
    base: Joi.string().length(3).uppercase().valid('EUR').required(),
    originalValue: Joi.number().positive().precision(2).required(),
    exchangeCoin: Joi.string().length(3).uppercase().required(),
  });

  const { error, value } = schema.validate(data);
  if (error) throw new Error(error.message);
  return value;
};

export { userSchema, transactionSchema };
