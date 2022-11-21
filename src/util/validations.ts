import * as Joi from 'joi'

export const statSchema = Joi.string().valid('Strength', 'Dexterity', 'Constitution', 'Wisdom', 'Intelligence', 'Charisma')

export const dieSchema = Joi.number().valid(4,6,8,10,12,20,100)
