var express = require('express');
var productRouter = express.Router();
var conn = require('./dbConnection');
var _ = require('lodash');

productRouter.route('/')

    //gets all products
    .get(function(req, res) {
        conn.query('CALL sp_getProducts()',
            function(err,rows){
                if(err) throw err;

                res.json(rows[0]);
            }
        );
    })

    //creates a product
    .post(function(req, res) {
        var compile = _.template("'<%= name %>', <%= type_id %>, <%= a_id %>, <%= m_id %>, <%= price %>," +
            "'<%= pin_length %>', '<%= nha %>', '<%= description %>', <%= overhaul_limit %>, <%= list_year %>, <%= life_limit %>");
        var query = 'CALL sp_addProduct(' + compile({'name': req.body['part_number'],
                'type_id': req.body['part_type_id'] != null ? req.body['part_type_id'] : 1,
                'a_id': req.body['aircraft_id'] != null ? req.body['aircraft_id'] : 1,
                'm_id': req.body['manufacturer_id'] != null ? req.body['manufacturer_id'] : 1,
                'price': req.body['price'] != null ? req.body['price'] : 0,
                'pin_length': req.body['pin_length'],
                'nha': req.body['nha'],
                'description': req.body['description'],
                'overhaul_limit': req.body['ohl'] != null ? req.body['ohl'] : 0,
                'list_year': req.body['year'] != null ? req.body['year'] : 0,
                'life_limit': req.body['lifeLimit'] != null ? req.body['lifeLimit'] : 0}) + ");";

        conn.query(query,
            function(err, rows) {
                if (err) throw err;

                res.json(rows);
            }
        );
    });

productRouter.route('/:id')

    //updates a product
    .put(function(req, res) {
        var compile = _.template("<%= id %>, '<%= name %>', <%= type_id %>, <%= a_id %>, <%= m_id %>, <%= price %>," +
            "'<%= pin_length %>', '<%= nha %>', '<%= description %>', <%= overhaul_limit %>, " +
            "<%= list_year %>, <%= life_limit %>");
        var query = 'CALL sp_editProduct(' + compile({'name': req.body['part_number'],
                'id': req.body['id'],
                'type_id': req.body['part_type_id'],
                'a_id': req.body['aircraft_id'],
                'm_id': req.body['manufacturer_id'],
                'price': req.body['price'] != null ? req.body['price'] : 0,
                'pin_length': req.body['pin_length'],
                'nha': req.body['nha'],
                'description': req.body['description'],
                'overhaul_limit': req.body['ohl'] != null ? req.body['ohl'] : 0,
                'list_year': req.body['year'] != null ? req.body['year'] : 0,
                'life_limit': req.body['lifeLimit'] != null ? req.body['lifeLimit'] : 0}) + ");";

        conn.query(query,
            function(err,rows) {
                if(err) throw err;

                res.json(rows);
            }
        );
    });


module.exports = productRouter;