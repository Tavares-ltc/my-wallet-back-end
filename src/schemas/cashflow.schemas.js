import joi from 'joi';

const cashflowSchema = joi.object({
    value: joi.string().required().empty(),
    description: joi.string().required().empty()
})

async function validateCashflowData(data) {
    return cashflowSchema.validate(data)
}

export {
    validateCashflowData
}