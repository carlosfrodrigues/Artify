const conn = require('../database/connection');
const formidable = require('formidable');
const fs = require('fs');
const process = require('process'); 

module.exports = {
    async index(req, res){
        const {page = 1} = req.query;

        const [count] = await conn('arts').count();

        const arts = await conn('arts')
        .join('creators', 'creators.id', '=', 'arts.creator_id')
        .limit(5)
        .offset((page-1)*5)
        .select(['arts.*', 'creators.name', 'creators.email', 'creators.whatsapp', 'creators.city', 'creators.uf']);

        res.header('X-Total-Count', count['count(*)']);
        return res.json(arts);
    },
    create(req, res){
        console.log(req.body);
        var form = new formidable.IncomingForm();
        form.parse(req, 
            async function(erros, fields, file) {

              console.log(file.image.name);
              console.log(fields);
              const {title, description, value} = fields;

              const oldpath = file.image.path;
              const imgpath = Date.now() +'-' + file.image.name;
              const newpath = process.cwd() + '/src/Images/' + imgpath;

              const creator_id = req.userId;
              const [id] = await conn('arts').insert({
                  title,
                  description,
                  imgpath,
                  value,
                  creator_id,
              });

              fs.rename(oldpath, newpath, function (err) {
                if (err) throw err;
              });
              return res.json({id});
            });
    },
    async delete(req, res){
        const {id} = req.params;
        const creator_id = req.userId;
        const art = await conn('arts').where('id', id).select('creator_id' , 'imgpath').first();
        if(art.creator_id != creator_id){
            return res.status(401).json({error: 'Operation not permited.'});
        }
        
        fs.unlink(process.cwd() + '/src/Images/' + art.imgpath, function (err) {
            if (err) throw err;
            console.log('File deleted!');
        });

        await conn('arts').where('id', id).delete();

        return res.status(204).send();
    },
    async update(req, res){
        const {id} = req.params;
        const creator_id = req.userId;
        const art = await conn('arts').where('id', id).select('creator_id').first();
        if(art.creator_id != creator_id){
            return res.status(401).json({error: 'Operation not permited.'});
        }
        const {title, description, value} = req.body;
        await conn('arts').where('id', id).update({title, description, value});

        return res.status(204).send();
    }
}