let express = require('express');
let app = express();
const port = 8091;
let mysql = require('mysql');
let bodyParser = require('body-parser');

app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));

let con = mysql.createConnection({
    host: '192.168.10.10',
    user: 'samkan',
    password: 'samkan',
    database: 'shopping',
});

let server = app.listen(port, function() {
    let host = server.address().address;
    let port = server.address().port;
    console.log('NODE SERVER RUNNING on localhost:' + port);
});

con.connect(function(error) {
    if (error) console.log('unexpected error');
    else console.log('connected');
});

app.get('/get-items', function(req, res) {
    con.query('select * from items', function(error, row, fields) {
        if (error) console.log(error);
        else {
            res.send(row);
        }
    });
});

app.post('/add-item', function(req, res) {
    // console.log(req);
    con.query(
        "insert into items (name) values('" + req.body.name + "')",
        function(error, row, fields) {
            if (error) console.log(error);
            else {
                res.send('Item added successfully');
            }
        },
    );
});

app.delete('/delete-item', function(req, res) {
    //console.log(req.query);
    let id = req.query.id;
    con.query("delete from items where id='" + id + "'", function(
        error,
        row,
        fields,
    ) {
        if (error) console.log(error);
        else {
            res.send('Item deleted successfully');
        }
    });
});