var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 2,
    host: 'fullstackdb.cteclwn50rvh.ap-south-1.rds.amazonaws.com',
    user: 'admin',
    password: 'Jargon1$',
    database: 'full_stack_db'
});

// const connection = mysql.createConnection({
//     host: 'fullstackdb.cteclwn50rvh.ap-south-1.rds.amazonaws.com',
//     user: 'admin',
//     password: 'Jargon1$',
//     database: 'full_stack_db'
//   });



router.post('/addPerson', function (req, res, next) {
    // console.log("req is " , req);
    addPerson(req, res);
});

router.get('/getPersons', function (req, res, next) {
    listCustomer(req, res);
});

addPerson = function (req, res) {

/*
    connection.connect((err) => {
        if (err) {
            let successMsg = {
                success: false,
                message: 'error connecting ' + err
            }
            res.send(successMsg);
            return;
        }
        console.log('Connected!');

        let person = {
            name: req.body.name,
            country: req.body.country
        }
        var sql = "INSERT INTO persons (name, country) VALUES ('" + person.name + "', '" + person.country + "')";
        console.log("person is : ", person);

        let successMsg = {
            success: true,
            message: person,
            error: null
        }

        connection.query(sql, function (err, result) {
            if (err) {
                successMsg.success = false;
                successMsg.error = 'Error ' + err
            } else {
                successMsg.message = 'Records inserted ';
            }
            res.send(successMsg);
            console.log("1 record inserted");
        });

        connection.release();

    }); */


    pool.getConnection(function (err, connection) {
        if (err) {
            let successMsg = {
                success: false,
                message: 'error connecting ' + err
            }
            res.send(successMsg);
            connection.release();
            return;
        }
        console.log('Connected!');


        let person = {
            name: req.body.name,
            country: req.body.country
        }
        var sql = "INSERT INTO persons (name, country) VALUES ('" + person.name + "', '" + person.country + "')";
        console.log("person is : ", person);

        let successMsg = {
            success: true,
            message: person,
            error: null
        }

        connection.query(sql, function (err, result) {
            if (err) {
                successMsg.success = false;
                successMsg.error = 'Error ' + err
            } else {
                successMsg.message = 'Records inserted ';
            }
            res.send(successMsg);
            console.log("1 record inserted");
        });

        connection.release();


        // Don't use the connection here, it has been returned to the pool.
    });

}

listCustomer = function (req, res) {

   /* connection.connect((err) => {
        if (err) {
            let successMsg = {
                success: false,
                message: 'error connecting ' + err
            }
            res.send(successMsg);
            return;
        }
        console.log('Connected!');

        var sql = "SELECT * FROM persons";

        let successMsg = {
            success: true,
            message: '',
            list: [],
            error: null
        }

        connection.query(sql, function (err, result) {
            if (err) {
                successMsg.success = false;
                successMsg.error = 'Error ' + err
            } else {
                successMsg.message = 'Message received successfully';
                successMsg.list = result;
            }
            res.send(successMsg);

        });
    }); */
    pool.getConnection(function(err, connection) {
        if (err) {
            let successMsg = {
                success: false,
                message: 'error connecting ' + err
            }
            res.send(successMsg);
            return;
        }
        console.log('Connected!');

        var sql = "SELECT * FROM persons";

        let successMsg = {
            success: true,
            message: '',
            list: [],
            error: null
        }

        connection.query(sql, function (err, result) {
            if (err) {
                successMsg.success = false;
                successMsg.error = 'Error ' + err
            } else {
                successMsg.message = 'Message received successfully';
                successMsg.list = result;
            }
            res.send(successMsg);

        });
          connection.release();
      
      
          // Don't use the connection here, it has been returned to the pool.
        });
     
}



module.exports = router;