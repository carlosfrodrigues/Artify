const conn = require('../database/connection');
//const crypto = require('crypto');

module.exports = {
    async index(req, res){
        const creators = await conn('creators').select('*');
        return res.json(creators);
    },

    async create(req, res){

        const {name, email, pwd, whatsapp, city, uf} = req.body;
        await conn('creators').insert({
            name,
            email,
            pwd,
            whatsapp,
            city,
            uf,
        });
        return res.status(204).send();
        //return res.json({ id });
    }
};