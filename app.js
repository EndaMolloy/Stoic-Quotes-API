const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const Quote = require('./models/quotes');

const app = express();

mongoose.promise = global.Promise;
const mongoDB = process.env.MONGODB_URI || 'mongodb://localhost/stoicquotes';
mongoose.connect(mongoDB);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//serve static files
app.use(express.static(__dirname));

app.get('/',(req,res)=> {
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/quotes/:id', (req,res)=> {
  const dayNum = req.params.id;

  Quote.find({},(err,quotes)=> {
    res.send(quotes[dayNum]);
  });

})


const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server started listening on port ${port}!`));
