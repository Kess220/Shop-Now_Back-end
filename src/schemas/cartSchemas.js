import Joi from "joi"

export const cartItemSchema = Joi.object({
    // id_usuario: Joi.string().required(),
    // id_item: Joi.string().required(),
    modelo: Joi.string().required(),
    marca: Joi.string().required(),
    descricao: Joi.string().required(),
    preco: Joi.number().min(0).required(),
    quantidade: Joi.number().min(1).required()
  });
