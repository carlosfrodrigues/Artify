const conn = require('../database/connection');
const jwt = require('jsonwebtoken');
module.exports = {
    async create(req, res){
        const {email, pwd} = req.body;
        try{
            const {id, name} = await conn('creators')
            .where('email', email).
            andWhere('pwd', pwd)
            .select(['id', 'name'])
            .first();
            var token = jwt.sign({ id }, "thx948jfks");
            res.status(200).send({ auth: true, token: token, name:  name});
        }catch{
            return res.status(400).json({error: 'No creator found with this ID'});
        }

    }
}