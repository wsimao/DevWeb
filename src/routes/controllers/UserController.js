const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { validationResult, matchedData } = require('express-validator');
const User = require("../../models/User");

module.exports = {
    info: async(req, res) => {
        //identificar usuario pelo token

        //query pq é uma requisao tipo get....
        let token = req.query.token;

        const user = await User.findOne({ token });

        res.json({
            name: user.name,
            username: user.username,
            email: user.email
                //implementar os anuncios
        });
    },
    editAction: async(req, res) => {
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

        if (data.username) {
            const usernameCheck = await User.findOne({ username: data.username });
            if (usernameCheck) {
                res.json({ error: 'Usuário ja existente' });
                return;
            }
            updates.username = data.username;

        }

        if (data.email) {
            const emailCheck = await User.findOne({ email: data.email });
            if (emailCheck) {
                res.json({ error: 'Email ja existente' });
                return;
            }
            updates.email = data.email;

        }
        if (data.password) {
            updates.passwordHash = await bcrypt.hash(data.password, 10);

        }

        await User.findOneAndUpdate({ token: data.token }, { $set: updates });

        res.json({});

    }

};