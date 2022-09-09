import joi from 'joi';

const dataLoginSchema = joi.object({
    email: joi.string().required().empty().email(),
    password: joi.string().required().empty()
})

const userDataSchema = joi.object({
    name: joi.string().required().empty(),
    email: joi.string().required().empty().email(),
    password: joi.string().required().empty()
})

function validateSignupData(data) {
    return userDataSchema.validate(data)
}

function validateLogin(data) {
    return dataLoginSchema.validate(data)
}

export { validateSignupData, validateLogin }