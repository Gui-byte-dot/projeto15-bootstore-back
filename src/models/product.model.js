import joi from 'joi';

export const productSchema=joi.object({
  id: joi.string().required(),
});

export const cartSchema=joi.object({
  id: joi.string().required(),
  name: joi.string().required(),
  description: joi.string().required(),
  price: joi.number().required(),
  img: joi.string().required(),
});

export const purchaseSchema=joi.object({
  products: joi.array().items(cartSchema).required(),
});
