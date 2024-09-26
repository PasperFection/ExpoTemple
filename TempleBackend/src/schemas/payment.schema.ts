import Joi from 'joi';

export const initiatePaymentSchema = Joi.object({
  amount: Joi.number().positive().required().messages({
    'number.base': `Amount should be a number`,
    'number.positive': `Amount should be a positive number`,
    'any.required': `Amount is required`
  }),
});

export const syncOfflinePaymentsSchema = Joi.object({
  offlinePayments: Joi.array().items(
    Joi.object({
      amount: Joi.number().positive().required().messages({
        'number.base': `Amount should be a number`,
        'number.positive': `Amount should be a positive number`,
        'any.required': `Amount is required`
      }),
      date: Joi.date().iso().required().messages({
        'date.base': `Date should be a valid date`,
        'date.format': `Date should be in ISO format`,
        'any.required': `Date is required`
      }),
    })
  ).required().messages({
    'array.base': `Offline payments should be an array`,
    'any.required': `Offline payments are required`
  }),
});
