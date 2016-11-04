var express = require('express');
var mfrRouter = express.Router();
//var mysql = require('mysql');
var conn = require('./dbConnection');

mfrRouter.route('/')
//gets all contacts
    .get(function(req, res) {
        conn.query('CALL sp_getManufacturers()',
            function(err,rows){
                if(err) throw err;

                res.json(rows[0]);
            }
        );
    });



module.exports = mfrRouter;

