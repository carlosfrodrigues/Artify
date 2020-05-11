const conn = require('../database/connection');

module.exports = {
    async index(req, res){
        const {q} = req.query;
        
        const arts  = await conn("arts").where('title', 'like', '%'+q+'%')
        .join('creators', 'creators.id', '=', 'arts.creator_id')
        .orWhere('description', 'like', '%'+q+'%')
        .select(['arts.*', 'creators.name', 'creators.email', 'creators.whatsapp', 'creators.city', 'creators.uf']);
        return res.json(arts);
    }
}