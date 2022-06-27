const { checkSchema } = require('express-validator');

module.exports = {
    nameList: checkSchema({
        name: {
            notEmpty: true,
            trim: true,
            isLength: {
                options: { min: 1 }
            },
            errorMessage: 'Nome da lista não pode ser vazio.'
        }
    }),
    editList: checkSchema({

        token: {
            notEmpty: true
        },
    
        name: {
            notEmpty: true,
            trim: true,
            isLength: {
                options: { min: 1 }
                },
                errorMessage: 'Nome da lista não pode ser vazio.'
            }
    })
};