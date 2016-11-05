var express = require('express');
var airRouter = express.Router();
var conn = require('./dbConnection');

airRouter.route('/')
    //gets all aircrafts
    .get(function(req, res) {
        conn.query('CALL sp_getAircrafts()',
            function(err,rows){
                if(err) throw err;

                res.json(rows[0]);
            }
        );
    });

module.exports = airRouter;

