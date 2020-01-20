var express = require('express');
var router = express.Router();

// mongodb connectie
var MongoClient = require('mongodb').MongoClient;
var db;
MongoClient.connect('mongodb://localhost:27017', (err, database) => {
    if (err) return console.log(err);
    db = database.db('exam');
})

function dynamicSort(property) {
    var sortOrder = 1;

    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function (a,b) {
        if(sortOrder == -1){
            return b[property].localeCompare(a[property]);
        }else{
            return a[property].localeCompare(b[property]);
        }        
    }
}

// studenten tonen
router.get('/', (req, res) => {
    db.collection('students').find().toArray((err, result) => {
        if (err) return console.log(err);
        
        result.sort(dynamicSort("naam"));
        res.render('list.ejs', { students: result});
    })
})

// student toevoegen
router.get('/add/', (req, res) => {
    res.render('add.ejs');
})

router.post('/add', (req, res) => {
    db.collection('students').findOne({ naam: req.body.naam }, (err, result) => {
        if (err) return console.log(err);
        if (result != null) {
            res.render('add_exists.ejs');
        }
        else {
            db.collection('students').insertOne(req.body);
            res.redirect('/students');
        }

    })
})
module.exports = router;