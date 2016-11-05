var express = require('express');
var pTypeRouter = express.Router();
var conn = require('./dbConnection');

pTypeRouter.route('/')
    //gets all part types
    .get(function(req, res) {
        conn.query('CALL sp_getTypes()',
            function(err,rows){
                if(err) throw err;

                res.json(rows[0]);
            }
        );
    });

module.exports = pTypeRouter;

