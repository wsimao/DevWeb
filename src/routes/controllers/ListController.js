const mongoose = require('mongoose');
const List = require("../../models/List");
const { validationResult, matchedData } = require('express-validator');

module.exports = {
    createList: async (req, res) => {
        const erros = validationResult(req);
        if (!erros.isEmpty()) {
            res.json({
                error: erros.mapped()
            });
            return;
        }

        const data = matchedData(req);
        const list = await List.findOne({
            name: data.name
        });

        if (list) {
            res.json({
                error: { email: { msg: 'Já tem uma lista com esse nome cadastrado.' } }
            });
            return;
        }

        const newList = new List({
            name: data.name
        });

        await newList.save();
        res.json({ msg: 'Lista criada com sucesso!'});
    },
    editList: async (req, res) => {
        const erros = validationResult(req);
        if (!erros.isEmpty()) {
            res.json({
                error: erros.mapped()
            });
            return;
        }

        const data = matchedData(req);

        let updates = {};

        if (data.name) {
            updates.name = data.name;
        }

        if (data.name) {
            const listNameCheck = await List.findOne({ name: data.name });
            if (listNameCheck) {
                res.json({ error: 'Lista já existente' });
                return;
            }
            updates.name = data.name;

        }

        await List.findOneAndUpdate({ token: data.token }, { $set: updates });

        res.json({});

    }
};