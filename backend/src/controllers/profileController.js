const conn = require('../database/connection');

module.exports = {
    async index(req, res) {
        const creator_id = req.userId;
        const arts  = await conn("arts").where('creator_id', creator_id).select('*');
        return res.json(arts);
    }
}