import Joi from 'joi';


export const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const refreshTokenSchema = Joi.object({
  token: Joi.string().required(),
});

// Optioneel: voeg een schema toe voor wachtwoord reset als je die functionaliteit wilt implementeren
export const resetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

// Optioneel: voeg een schema toe voor het wijzigen van wachtwoord
export const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().min(6).required(),
});

