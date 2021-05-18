const connection = require('../database/connection');
const multer = require('multer');
const upload = multer ({dest:'uploads/'});

module.exports = {
    async index (request, response) {
        const products = await connection('products').select('*');
        return response.json(products);
    },

    async create(request, response){
        const {id, productName, category ,price, productDiscount, description} = request.body;

        await connection('products').insert({
            id,
            productName,
            category,
            price,
            productDiscount,
            description
        });
        
        return response.json({id});
    },

    /*filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const fileName = `${fileHash}-${file.originalname}`;
        return callback(null, fileName);
    },*/

    async delete(request, response){
        const {id} = request.params;

        await connection('products').where('id', id).first();
        
        await connection('products').where('id',id).delete();

        return response.status(204).send();
    },

    async update(request, response){
        const {id} = request.params;
        const {productName, category ,price, productDiscount, description, image} = request.body;

        await connection('products').where('id', id).first();

        await connection('products').where('id',id).update({productName: productName, category: category, price: price, productDiscount: productDiscount, description: description, image: image});
        
        return response.status(204).send();
    }
}
