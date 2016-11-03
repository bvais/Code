var express = require('express');
var productRouter = express.Router();
var conn = require('./dbConnection');
var _ = require('lodash');

productRouter
    .route('/')
//gets all products
    .get(function(req, res) {
        conn.query('CALL sp_getProducts()',
            function(err,rows){
                if(err) throw err;

                res.json(rows[0]);
            }
        );
    })

    .post(function(req, res) {
        var compile = _.template("'<%= name %>', <%= type_id %>, <%= a_id %>, <%= m_id %>, <%= price %>," +
            "'<%= pin_length %>', '<%= nha %>', '<%= description %>', <%= overhaul_limit %>, <%= list_year %>, <%= life_limit %>");
        var query = 'CALL sp_addProduct(' + compile({'name': req.body['part_number'],
                'type_id': req.body['part_type'],
                'a_id': req.body['aircraft'],
                'm_id': req.body['manufacturer'],
                'price': req.body['price'],
                'pin_length': req.body['pin_length'],
                'nha': req.body['nha'],
                'description': req.body['description'],
                'overhaul_limit': req.body['ohl'],
                'list_year': req.body['year'],
                'life_limit': req.body['lifeLimit']}) + ");";

        conn.query(query,
            function(err, rows) {
                if (err) throw err;

                res.json(rows);
            }
        );
    });



module.exports = productRouter;