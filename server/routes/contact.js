var express = require('express');
var contactRouter = express.Router();
//var mysql = require('mysql');
var conn = require('./dbConnection');
var _ = require('lodash');

contactRouter.route('/')
    //gets all contacts
    .get(function(req, res) {
        conn.query('CALL sp_getContacts()',
            function(err,rows){
                if(err) throw err;

                res.json(rows[0]);
            }
        );
    })

    //creates a contact
    .post(function(req, res) {
        var compile = _.template("'<%= name %>', '<%= email %>', '<%= phone %>', '<%= social %>', '<%= company %>'");
        var query = 'CALL sp_addContact(' + compile({'name': req.body['name'],
                'email': req.body['email'],
                'phone': req.body['phone'],
                'social': req.body['social'],
                'company': req.body.company}) + ");";

        conn.query(query,
            function(err, rows) {
                if (err) throw err;

                res.json(rows);
            }
        );
    });

contactRouter.route('/:id')

    .get(function(req, res) {
        var query = 'SELECT * FROM contact where id = ' + req.params.id;

        conn.query(query,
            function(err,rows){
                if(err) throw err;

                res.json(rows);
            }
        );
    })

    //updates a contact
    .put(function(req, res) {
        var compile = _.template("CALL sp_editContact(<%= id %>, '<%= name %>', '<%= email %>', '<%= phone %>', '<%= social %>')");

        var query = compile({
            'id': req.params.id,
            'name': req.body['name'],
            'email': req.body['email'],
            'phone': req.body['phone'],
            'social': req.body['social']
        });

        conn.query(query,
            function(err,rows) {
                if(err) throw err;

                res.json(rows);
            }
        );
    });

module.exports = contactRouter;
