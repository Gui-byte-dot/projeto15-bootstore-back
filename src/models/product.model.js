import joi from 'joi';

export const productSchema=joi.object({
  id: joi.string().required(),
});

export const cartSchema=joi.object({
  product: joi.object().required(),
});