var express = require('express');
var quoteRouter = express.Router();
var conn = require('./dbConnection');
var _ = require('lodash');

quoteRouter.route('/')
//gets all quotes
    .get(function(req, res) {
        conn.query('CALL sp_getQuotes(null, null)',
            function(err,rows){
                if(err) throw err;

                res.json(rows[0]);
            }
        );
    })

    .post(function(req, res) {
        var compile = _.template("<%= product_id %>, <%= contact_id %>, '<%= condition %>', <%= quantity %>, <%= price %>, '<%= type %>'");
        query = 'INSERT into quotes (product_id, contact_id, `condition`, quantity, price, `type`) values (' +
            compile({'product_id': req.body['product_id'],
                'contact_id': req.body['contact_id'],
                'condition': req.body['condition'],
                'quantity': req.body['quantity'] != null ? req.body['quantity'] : 0,
                'price': req.body['price'] != null ? req.body['price'] : 0,
                'type': req.body['type']}) + ");";

        conn.query(query,
            function(err, rows) {
                if (err) throw err;

                res.json(rows);
            });


    });

quoteRouter.route('/product/:id')
//gets all products
    .get(function(req, res) {
        conn.query('CALL sp_getQuotes(null, ' + req.params.id + ");",
            function(err,rows){
                if(err) throw err;

                res.json(rows[0]);
            }
        );
    });

quoteRouter.route('/comments/:id')
//gets all products
    .get(function(req, res) {
        conn.query('CALL sp_getQuoteComments(' + req.params.id + ');',
            function(err,rows){
                if(err) throw err;

                res.json(rows[0]);
            }
        );
    });

quoteRouter.route('/comments/')
//gets all products
    .post(function(req, res) {
        var compile = _.template("<%= quote_id %>, '<%= comment %>'");
        var query = 'CALL sp_addQuoteComment(' + compile({'quote_id': req.body['quote_id'],
                'comment': req.body['comment']}) + ");";

        conn.query(query,
            function(err, rows) {
                if (err) throw err;

                res.json(rows);
            }
        );
    });

module.exports = quoteRouter;